

import { useState, useEffect } from 'react'
import Contract from 'web3-eth-contract'
import tools from '../../../utils/_utils'
import wallet_model from './walletModal';
import {ethers} from 'ethers'
import { CHAINS, chainFromHexString } from './chains'
import _ from 'lodash'



export function useWallet(props) {
    const { web3Loading, getweb3 } = wallet_model()
    const [connection, setConnection] = useState(null)
    const connectWallet = async () => {
        await getweb3().then(async (response) => {
            setConnection(response)
            const chainId = await response.eth.getChainId();
            if (chainId !== tools.chainData.chainId) {
                await response.currentProvider.sendAsync({method: "wallet_addEthereumChain", params: (Object.values(CHAINS).reverse())})
            }
            Contract.setProvider(response)
        })
    }

    return {connection, connectWallet}
}

export function useNetwork(props) {
    const {connection, connectWallet} = global.wallet
    const [network, changeNetwork] = useState(null)
    // const networks = Object.values(_.mapValues(CHAINS, 'chainId'))
    const networks = Object.values(_.mapValues(CHAINS, function (o) { return [o.chainId, o.chainName]}))

    const switchNetwork = (_chainId) => {
        try {
            connection.currentProvider.sendAsync({ method: "wallet_switchEthereumChain", params: [{chainId: _chainId }]})
        } catch (error) {
            connection.currentProvider.sendAsync({method: "wallet_addEthereumChain", params: [chainFromHexString(_chainId)]})
        }
    }

    useEffect(() => {
        
        if (connection) connection.currentProvider.on("chainChanged", chainid => {
            console.log("switching to ", chainid)
            changeNetwork(chainFromHexString(chainid).chainName)
        })

        if (connection) changeNetwork(chainFromHexString(connection.currentProvider.chainId).chainName)

    }, [connection])

    return [network, networks, switchNetwork]
}

// export function switcher(chainId) {
//     global.wallet.connection.currentProvider.sendAsync({method: "wallet_switchEthereumChain", params: })
// }

export function useSigner(props){
    const getSigner = async () => {
        try {
            const ethProvider = new ethers.providers.Web3Provider(await global.wallet.connection.currentProvider);
            await ethProvider.send("eth_requestAccounts", []);
            const signer = await ethProvider.getSigner();
            return signer
        } catch ( error ) {
            return new Error("Cannot get Provider, |Connect Wallet")
        }
    }
    const retrieveSigner = _.once(getSigner)

    return retrieveSigner
    
}

export { chainFromHexString }