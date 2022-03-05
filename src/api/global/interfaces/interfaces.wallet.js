import { storeContext } from '../global'
import { useContext, useEffect, iseState, useMemo } from 'react'
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
    useEffect(() => {
        const call = async () => {
            try {
                return await getweb3().then(async (response) => {
                    await response.currentProvider.sendAsync({ method: "wallet_addEthereumChain", params: (Object.values(CHAINS).reverse())})
                    let chainId = await response.eth.getChainId()
                    await dispatch({type: "SUCCEED_BATCH_REQUEST", effect: 'wallet', payload: { address: (await response.eth.getAccounts())[0], chainId: chainId, network: NETWORK_ROUTER[chainId], provider: response.currentProvider }})
                })
            }
            catch (err) {
                console.log(err)
                dispatch({ type: "FAIL_REQUEST", effect: 'wallet'})
            }
        }

        if (isLoading) {
            call()
        }

        console.log(wallet)
        
    }, [isLoading])

    const connect = async () => {
        await dispatch({type: "START_REQUEST", effect: 'wallet'})
    }

    const disconnect = async () => {
        await dispatch({type: "RESET_REQUEST", effect: 'wallet'})
    }

    return { connect, disconnect, wallet, isLoading}
}
