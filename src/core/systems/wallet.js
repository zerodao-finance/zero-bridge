import { useState, useEffect } from 'react'
import Contract from 'web3-eth-contract'
import tools from '../../utils/_utils'
import wallet_model from '../../WalletModal';
import {ethers} from 'ethers'

export function useWallet(props) {
    const { web3Loading, getweb3 } = wallet_model()
    const [connection, setConnection] = useState(null)
    const connectWallet = async () => {
        await getweb3().then(async (response) => {
            setConnection(response)
            const chainId = await response.eth.getChainId();
            if (chainId !== tools.chainData.chainId) await response.currentProvider.sendAsync({method: "wallet_addEthereumChain", params: tools.chainData})
            Contract.setProvider(response)
        })
    }

    return {connection, connectWallet}
}

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