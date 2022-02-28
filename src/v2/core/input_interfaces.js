import { storeContext } from './global'
import { useContext, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import wallet_modal from './walletModal'
import { CHAINS } from './chains'


export const useData = () => {
    const {state, dispatch} = useContext(storeContext)
    const { isLoading } = state
    // useEffect(() => {
    //     const call = () => {
    //         try {
    //             dispatch({ type: 'SUCCEED_REQUEST', payload: { type: 'transaction', data: { stuff: 'new_data' } }})
    //         } catch (err){
    //             dispatch({ type: 'FAIL_REQUEST', payload: err.message })
    //         }
    //     }
        
    //     if ( isLoading ) {
    //         call()
    //         console.log(state)
    //     }

    // }, [isLoading])

    return [state.data, isLoading, dispatch]
}


export const useBridgeInput = () => {
    const { state, dispatch } = useContext( storeContext )

    const updateRatio = (e) => {
        dispatch({type: 'UPDATE_INPUT', payload: {type: "RATIO", data: e.target.value}})
    }

    const updateAmount = (e) => {
        dispatch({type: 'UPDATE_INPUT', payload: { type: "AMOUNT", data: e.target.value}})
    }

    var ratio = state.input.ratio
    var amount = state.input.amount


    return { ratio, amount, updateRatio, updateAmount }
}

export const useBridgeDisplay = () => {
    const { state, dispatch } = useContext( storeContext )
    const [ ETHPrice, setETHPrice ] = useState('0')
    const ln = (v) => (v);
    useEffect(async () => {
        const listener = async () => {
            try {
                setETHPrice(
                    ( 
                        await contract.get_dy(1, 2, ethers.utils.parseUnits("1", 8))
                    ).toString()
                )
            } catch ( e ) {
                console.error(e, "error setting ETH price")
            }
        };

        var invoke = _.throttle(listener, 2000)
        if ( state.wallet ) {
            contract.provider.on("block", invoke)
        }

        return () => {
            contract.provider.removeListener( "block", invoke)
            invoke.cancel()
        }
    }, [state.wallet])

    useEffect(() => {
        const call = () => {
            try {
                var valueRenBTC = ethers.utils.formatUnits(
                    ln (
                        ethers.utils
                            .parseEther("1")
                            .sub(
                                ethers.BigNumber.from(String(state.input.ratio)).mul(
                                    ethers.utils.parseEther("0.01")
                                )
                            )
                    )
                    .mul(ethers.utils.parseUnits(String(state.input.amount), 8))
                    .div(ethers.utils.parseEther("1")),
                    8
                )


                dispatch({type: "SUCCEED_DISPLAY_REQUEST", payload: { data: { renBTC: valueRenBTC, ETH: 0 }}})
            } catch (e) {
                dispatch({type: "FAIL_DISPLAY_REQUEST"})
            }
        }

        call()
    }, [state.input.amount, state.input.ratio])


    var ETH = state.display.ETH
    var renBTC = state.display.renBTC
    return { ETH, renBTC }
}

export const NETWORK_ROUTER = {
    137: {
        name: "Polygon",
        swap_address: '0x751B1e21756bDbc307CBcC5085c042a0e9AaEf36',
        // abi: curveABI,
        // get contract() {
        //     return new ethers.Contract(this.swap_address, [ 'function get_dy(uint256, uint256, uint256) view returns (uint256)' ], controller.provider)
        //  }
        },
    42161: {
        name: "Arbitrum",
        swap_address: '0x960ea3e3C7FB317332d990873d354E18d7645590',
        // curveABI: curveABI,
        // get contract() {
        //     return new ethers.Contract(this.swap_address, [ 'function get_dy(uint256, uint256, uint256) view returns (uint256)' ], controller.provider)
        //     }
    }
}

export const useInfura = () => {
    const { state, dispatch } = useContext( storeContext )
    var provider = process.env.REACT_APP_TESTING ? new ethers.providers.JsonRpcProvider('http://localhost:8545') : new ethers.providers.InfuraProvider('https://arbitrum-mainnet.infura.io/v3/' + process.env.infuraKey) 
    

}

export const useWalletConnection = () => {
    const { state, dispatch } = useContext( storeContext )
    const { isLoading } = state
    const { web3Loading, getweb3 } = wallet_modal()
    const connectWallet = async () => {
        try {
            return await getweb3().then(async (response) => {
                await response.currentProvider.sendAsync({ method: "wallet_addEthereumChain", params: (Object.values(CHAINS).reverse())})
                let chainId = await response.eth.getChainId()
                let net_config = NETWORK_ROUTER[chainId]
                await dispatch({type: "SUCCEED_CONNECTION_REQUEST", payload: { data: { wallet: response, address: (await response.eth.getAccounts())[0], network: await response.eth.getChainId(), network_config: net_config}}})
            })
        }
        catch (err) {
            console.log(err)
            dispatch({ type: "FAIL_CONNECTION_REQUEST"})
        }
    }
    var wallet = state.wallet
    var address = state.address
    var network = state.network
    return { connectWallet, wallet, address, network }


}


