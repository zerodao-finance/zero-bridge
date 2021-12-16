import { useEffect, createContext, useState } from 'react'
import wallet_model from '../WalletModal'
import Contract from 'web3-eth-contract'; 

/**
 * Wallet Provider Context
 */

export const WalletProviderContext = createContext(null)
export const ConversionToolContext = createContext(null)
export const KeeperContext = createContext(null)


/**
 * Wallet connection function
 */

// const { web3Loading, getweb3 } = wallet_model();

// export async function connectWallet(chainData, curveABI, curveArbitrum){
//     let data = await getweb3().then(async (response) => {
//         //set web3 with web3 response
//         const chainId = await response.eth.getChainId();
//         if (chainId !== chainData.chainId) {
//             await response.currentProvider.sendAsync({ method: 'wallet_addEthereumChain', params: chainData });
//         }

//         Contract.setProvider(response);
//         const curveContract = new Contract(curveABI, curveArbitrum)
//         //set contract state

//         return { web3: response, contract: curveContract }
//     })

//     console.log(data || "error")
//     return data
// }




