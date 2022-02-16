import wallet_modal from './walletModal'
import Contract from 'web3-eth-contract'
import { CHAINS, chainFromHexString } from './chains'
import { ethers } from 'ethers'
import { connectors } from 'web3modal'

export async function connectWallet (getweb3) {
    return await getweb3().then(async (response) => {
        const chainId = await response.eth.getChainId();
        if (chainId) {
            await response.currentProvider.sendAsync({ method: "wallet_addEthereumChain", params: (Object.values(CHAINS).reverse())})
        }
        Contract.setProvider(response)
        return response 
    })
}


export function switchNetwork(_chainId){
    console.log(_chainId, typeof _chainId)
    const { connection, connectWallet } = global.wallet
    try {
        connection.currentProvider.sendAsync({ method: "wallet_switchEthereumChain", params: [{chainId: _chainId }]})
    } catch (error) {
        connection.currentProvider.sendAsync({ method: "wallet_switchEthereumChain", params: [{ chainId: _chainId}]}) //change to add network
    }
}


export function getNetworkCon(connection, changeNetwork) {
    if (connection) connection.currentProvider.on("chainChanged", chainid => {
        console.log("switching to", chainid)
        changeNetwork(chainFromHexString(chainid).chainName)
    })

    if (connection) connection.currentProvider.on("connect", ({chainId}) => {
        changeNetwork(chainFromHexString(chainId).chainName)
    })
}
