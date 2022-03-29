import { storeContext } from '../global'
import { useContext, useEffect, useState, useMemo } from 'react'
import { ethers } from 'ethers'
import { TransferEventEmitter } from '../../event/transfer.events'
import { sdkTransfer } from '../../utils/sdk'
import async from 'async'
import _ from 'lodash'


//Bridge Result Hook
export const useBridgeDisplay = () => {
    const { state, dispatch } = useContext( storeContext )
    const { network, bridge } = state
    const { input, display } = bridge
    const [ ETHPrice, setETHPrice ] = useState('0')
    const [ eth_usd, set_eth_usd ] = useState(0)
    const [ btc_usd, set_btc_usd ] = useState(0) 
    const ln = (v) => (v);

    useEffect(() => {
        const listener = async () => {
            try {
                setETHPrice(
                    ( 
                        await network.priceFeedContract.get_dy(1, 2, ethers.utils.parseUnits("1", 8))
                    ).toString()
                )
            } catch ( e ) {
                console.error(e, "error setting ETH price")
            }
        };

        var invoke = _.throttle(listener, 4000)
        if ( network.priceFeedContract ) {
            network.priceFeedContract.provider.on("block", invoke)
        }

        return () => {
            if (network.priceFeedContract) {
                network.priceFeedContract.provider.removeListener( "block", invoke )
                invoke.cancel()

            }
        }
    }, [network.priceFeedContract])

    useEffect( () => {
        const listener = async () => {
            try {
                set_btc_usd(await network.priceFeedContract.get_dy(1, 0, 1e8))
                set_eth_usd(await network.priceFeedContract.get_dy(2, 0, ethers.constants.WeiPerEther))
            } catch (e) {
                console.log(e)
            }
        }
        var invoke = _.throttle(listener, 10000)

        if ( network.priceFeedContract ) {
            network.priceFeedContract.provider.on('block', invoke)
        }

        return () => {
            if (network.priceFeedContract) {
                network.priceFeedContract.provider.removeListener(  'block', invoke )
                invoke.cancel()
            }
        }
    }, [network.priceFeedContract])

    useEffect(() => {
        const call = () => {
            try {
                var valueRenBTC = ethers.utils.formatUnits(
                    ln (
                        ethers.utils
                            .parseEther("1")
                            .sub(
                                ethers.BigNumber.from(String(input.ratio)).mul(
                                    ethers.utils.parseEther("0.01")
                                )
                            )
                    )
                    .mul(ethers.utils.parseUnits(String(input.amount), 8))
                    .div(ethers.utils.parseEther("1")),
                    8
                )


                var valueETH = ethers.utils.formatEther(
                    ethers.BigNumber.from(String(input.ratio))
                    .mul(ethers.utils.parseEther("0.01"))
                    .mul(
                        ethers.utils
                        .parseUnits(String(input.amount), 8)
                        .mul(ETHPrice)
                    )
                    .div(ethers.utils.parseEther("1", 18))
                    .div(ethers.utils.parseUnits("1", 8))
                )


                dispatch({type: "UPDATE", module: "bridge", effect: "display", data: { ETH: valueETH, renBTC: valueRenBTC} })
            } catch (e) {
                console.log(e)
                dispatch({type: "FAIL_REQUEST", effect: 'display', payload: "Cannot set ETHPrice," })
            }
        }

        call()
    }, [input.amount, input.ratio])


    var ETH = display.ETH
    var renBTC = display.renBTC
    return { 
        ETH, 
        renBTC,
        btc_usd,
        eth_usd
    }

}

// Bridge Input Hook
export const useBridgeInput = () => {
    const { state, dispatch } = useContext( storeContext )
    const { input } = state.bridge
    const updateRatio = (e) => {
        dispatch({type: "UPDATE", module: "bridge", effect: "input", data: { ratio: e.target.value}})
        // dispatch({type: 'SUCCEED_REQUEST', effect: 'input', payload: {effect: "ratio", data: e.target.value}})
    }
    
    const updateAmount = (e) => {
        dispatch({type: "UPDATE", module: "bridge", effect: "input", data: { amount: e.target.value}})
        // dispatch({type: 'SUCCEED_REQUEST', effect: 'input', payload: { effect: "amount", data: e.target.value}})
    }
    
    const updateModule = (e) => {
        dispatch({type: "UPDATE", module: "bridge", effect: "input", data: { isFast: !!e.target.checked}})
        // dispatch({type: 'SUCCEED_REQUEST', effect: 'input', payload: { effect: 'isFast', data: !!e.target.checked}})
    }

    var { ratio, amount, isFast } = input
    
    return {
        ratio,
        amount,
        isFast,
        updateRatio,
        updateAmount,
        updateModule
    }    
}

//Bridge Transfer Request Hook
export const useTransferSender = () => {
    const { state, dispatch } = useContext(storeContext)
    const { wallet, zero, transfer, bridge } = state
    const { input } = bridge
    
    const { isLoading } = transfer

    const getSigner = useMemo(async () => {
        try {
            await wallet.provider.send("eth_requestAccounts", [])
            const signer = await wallet.provider.getSigner()
            return signer
        } catch (err) {
            return new Error("Cannot get Provider | Reconnect Wallet")
        }
    }, [wallet.provider])
    
    async function sendTransferRequest() {
        if (_.isError(validateInputs(state))){
            /**
             * Send Error to error event handler
             */
        }
        
        dispatch({ type: "UPDATE", module: "bridge", effect: "mode", data: { processing: true }})

        // dispatch({ type: "START_REQUEST", effect: "transfer"})
        console.log(zeroUser)
        var zeroUser = zero.zeroUser
        var amount = input.amount
        var ratio = String(input.ratio)
        var signer = await getSigner
        var to = await signer.getAddress()
        var isFast = input.isFast
        var data = ethers.utils.defaultAbiCoder.encode(
            ['uint256'],
            [ethers.utils.parseEther(ratio).div(ethers.BigNumber.from('100'))]
        )

        console.log(amount)
        const transfer = new sdkTransfer(zeroUser, amount, ratio, signer, to, isFast, TransferEventEmitter, dispatch, data)
        try {
            await transfer.submitTX()
        } catch (e) {
            dispatch({type: "RESET_REQUEST", effect: 'bridge'})
        }
        
    }

    return { 
        sendTransferRequest,
        isLoading
    }
}


const validateInputs = (state) => {
    const { wallet, zero, input, network } = state
    if (!wallet.address) {
        return new Error("Oops! ensure wallet is connected")
    }

    if (!wallet.provider) {
        return new Error('Oops! cannot get web3 provider')
    }

    if (!network.provider){
        return new Error("Oops! network error, unable to send transaction")
    }

    if (_.isEmpty(zero.keeper)){
        return new Error("Oops! were unable to connect to keeper, try again later")
    }

    if (!zero.zeroUser) {
        return new Error("Oops! unable to connect to the Zero Network, try again later")
    }

    if(!zero.signer) {
        return new Error("Oops! were unable to sign this transaction, please try again later")
    }

    if(input.amount == 0) { 
        return new Error("Oops! we cant send nothing! send a valid amount")
    }

    return true
}


export const useBridgeMode = () => {
    const { state, dispatch } = useContext(storeContext)
    const { bridge } = state
    const { mode } = bridge
    
    useEffect(() => {
        if (mode === "processing") {
            switch ( processing.signature ) {
                case false: 
                    //dispatch mode "signature"
                case true:
                    //dispatch mode "gateway"
            }
        }
    }, [mode])
    return {
        mode
    }
}


export const useBridgePage = () => {
    const [ component, setComponent ] = useState(null)
    const { state, dispatch } = useContext(storeContext)
    const { mode } = state.bridge

    const toggleMode = (newMode) => {
        dispatch({ type: "UPDATE", module: "bridge", effect: "mode", data: {mode: newMode}})
    }

    // reset mode and return to 'transfer' | 'release'
    const back = () => {
        dispatch({ type: "UPDATE", module: "bridge", effect: "mode", data: { processing: false }})
    }

    return {
        ...mode, back, toggleMode
    }
}

