import { storeContext } from '../global'
import { useContext, useEffect, useState, useMemo } from 'react'
import { ethers } from 'ethers'
import wallet_modal from '../../utils/walletModal'
import {NETWORK_ROUTER} from '../../utils/network'
import { CHAINS } from '../../utils/chains'
import _ from 'lodash'



export const useWalletConnection = () => {
    const { state, dispatch } = useContext( storeContext )
    const { wallet } = state
    const { isLoading } = wallet
    const { web3Loading, getweb3 } = wallet_modal()
    const getSigner = useMemo(async () => {
        try {
            await wallet.provider.send("eth_requestAccounts", [])
            const signer = await wallet.provider.getSigner()
            return signer
        } catch (err) {
            dispatch({type: "RESET_REQUEST", effect: 'wallet'})
            return new Error("Cannot get Provider | Reconnect Wallet")
        }
    }, [wallet.provider])

    useEffect(async () => {
        const provider = localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER");
        if (provider) {
            await connect()
        }
    }, [])

    useEffect(() => {
        const call = async () => {
            try {
                // TODO: Make getweb3 dynamic and allow the app to define what chain we're on
                const web3Modal = await getweb3();
                await web3Modal.currentProvider.sendAsync({ method: "wallet_addEthereumChain", params: (Object.values(CHAINS).reverse())});
                let chainId = await web3Modal.eth.getChainId()
                await dispatch({type: "SUCCEED_BATCH_REQUEST", effect: 'wallet', payload: { address: (await web3Modal.eth.getAccounts())[0], chainId: chainId, network: NETWORK_ROUTER[chainId], provider: new ethers.providers.Web3Provider(await web3Modal.currentProvider) }})
                return
            }
            catch (err) {
                console.error(err)
                dispatch({ type: "RESET_REQUEST", effect: "wallet"})
            }
        }

        if (isLoading) {
            call()
        }
        
    }, [isLoading])

    const connect = async () => {
        dispatch({type: "START_REQUEST", effect: 'wallet'})
    }

    const disconnect = async () => {
        dispatch({type: "RESET_REQUEST", effect: 'wallet'})
        localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER")
    }

    return { connect, disconnect, wallet, isLoading}
}


export const useCheckWalletConnected = () => {
    const { state, dispatch } = useContext(storeContext)
    const { address } = state.wallet
    const [ walletConnected, toggle ] = useState(true)
    
    useEffect(() => {
        if (!address) {
            toggle(true)
        } else {
            toggle(false)
        }
    }, [address])

    const getWalletConnectionProps = ({...otherProps} = {}) => ({
        wallet: walletConnected
    })

    return {
        getWalletConnectionProps
    }
}
