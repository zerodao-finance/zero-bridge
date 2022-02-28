import { storeContext } from './global'
import { useContext, useEffect } from 'react'
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
    const ln = (v) => (v);

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

export const useWalletConnection = () => {
    const { state, dispatch } = useContext( storeContext )
    const { isLoading } = state
    const { web3Loading, getweb3 } = wallet_modal()
    const connectWallet = async () => {
        try {
            return await getweb3().then(async (response) => {
                console.log(await response)
                console.log(await response.eth.getAccounts())
                await response.currentProvider.sendAsync({ method: "wallet_addEthereumChain", params: (Object.values(CHAINS).reverse())})
                await dispatch({type: "SUCCEED_CONNECTION_REQUEST", payload: { data: { wallet: response, address: (await response.eth.getAccounts())[0], network: await response.eth.getChainId()}}})
            })
        }
        catch (err) {
            dispatch({ type: "FAIL_CONNECTION_REQUEST"})
        }
    }
    var wallet = state.wallet
    var address = state.address
    var network = state.network
    return { connectWallet, wallet, address, network }


}


