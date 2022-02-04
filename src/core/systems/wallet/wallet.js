

import { useState, useEffect } from 'react'
import Contract from 'web3-eth-contract'
import wallet_model from './walletModal';
import {ethers} from 'ethers'
import { CHAINS, chainFromHexString } from './chains'
import _ from 'lodash'

import * as wallet from './utils'



export function useWallet(props) {
    const { web3Loading, getweb3 } = wallet_model()
    const [connection, setConnection] = useState(null)
    const { connectWallet } = wallet
    connectWallet(setConnection)

    return {connection, connectWallet}
}

export function useNetwork(props) {
    const {connection, connectWallet} = global.wallet
    const [network, changeNetwork] = useState(null)
    const networks = Object.values(_.mapValues(CHAINS, function (o) { return [o.chainId, o.chainName]}))
    const { switchNetwork, getNetworkCon } = wallet
    useEffect(getNetworkCon(connection, changeNetwork), [])

    return [network, networks, switchNetwork]
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
    return (async function (){
        if (_.isError(await retrieveSigner())) return getSigner 
        else return retrieveSigner
    })()
}

export function useAllNetwork() {
    useEffect(() => {
        try {
            global.wallet = useWallet()
            global.useNetwork()
            return true
        } catch (error) {
            return false
        }
    }, [])
    

}
