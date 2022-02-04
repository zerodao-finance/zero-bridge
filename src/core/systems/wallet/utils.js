import wallet_modal from './walletModal'
import Contract from 'web3-eth-contract'
import { CHAINS, chainFromHexString } from './chains'
import { ethers } from 'ethers'
import { connectors } from 'web3modal'

export async function connectWallet (setConnection) {
    const { web3Loading, getweb3 } = wallet_modal()
    await getweb3().then(async (response) => {
        setConnection(response)
        const chainId = await response.eth.getChainId();
        if (chainId) {
            await response.currentProvider.sendAsync({ method: "wallet_addEthereumChain", params: (Object.values(CHAINS).reverse())})
        }
        Contract.setProvider(response)
    })
}


export function switchNetwork(_chainId){
    const { connection, connectWallet } = global.wallet
    try {
        connection.currentProvider.sendAsync({ method: "wallet_switchEthereumChain", params: [{chainId: chainFromHexString(_chainId) }]})
    } catch (error) {
        connection.currentProvider.sendAsync({ method: "wallet_switchEthereumChain", params: [{ chainId: chainFromHexString(_chainId)}]})
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
