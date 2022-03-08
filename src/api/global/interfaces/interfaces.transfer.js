import { storeContext } from '../global'
import { useContext, useEffect, useMemo } from 'react'
import _ from 'lodash'
import { ethers } from 'ethers'
import { sdkTransfer } from '../../utils/sdk'

export const useTransferSender = () => {
    const { state, dispatch } = useContext(storeContext)
    const { wallet, input, zero, transfer } = state
    const { isLoading } = transfer

    const getSigner = useMemo(async () => {
        try {
            await wallet.provider.send("eth_requestAccounts", [])
            const signer = await wallet.provider.getSigner()
            return signer
        } catch (err) {
            return new Error("Cannot get Provider | Reconnect Wallet")
        }
    }, [wallet.provider])
    
    async function sendTransferRequest() {
        if (_.isError(validateInputs(state))){
            /**
             * Send Error to error event handler
             */
        }
        
        dispatch({ type: "START_REQUEST", effect: "transfer"})
        var zeroUser = zero.zeroUser
        var amount = input.amount
        var ratio = String(input.ratio)
        var signer = await getSigner
        var to = await signer.getAddress()
        var isFast = input.isFast
        var data = ethers.utils.defaultAbiCoder.encode(
            ['uint256'],
            [ethers.utils.parseEther(ratio).div(ethers.BigNumber.from('100'))]
        )

        console.log(amount)
        const transfer = new sdkTransfer(zeroUser, amount, ratio, signer, to, isFast, dispatch, data)
        const response = await transfer.submitTX()


        /**
         * DONE: send transaction to sdk async
         * DONE: send a start that will trigger loading screen 
         * TODO: return to input screen on failure and send error message
         * DONE: go to confirm screen on success
         * TODO: only save transfer requests when gateway address recieves a payment
         * FUTURE: save transfer request and based on time saved delete if gatway status remains unchanged (requires completed refresh module)
         */


        /**
         * TODO: create transfer request for sdk
         */
    }

    return { 
        sendTransferRequest,
        isLoading
    }
}

const validateInputs = (state) => {
    const { wallet, zero, input, network } = state
    if (!wallet.address) {
        return new Error("Oops! ensure wallet is connected")
    }

    if (!wallet.provider) {
        return new Error('Oops! cannot get web3 provider')
    }

    if (!network.provider){
        return new Error("Oops! network error, unable to send transaction")
    }

    if (_.isEmpty(zero.keeper)){
        return new Error("Oops! were unable to connect to keeper, try again later")
    }

    if (!zero.zeroUser) {
        return new Error("Oops! unable to connect to the Zero Network, try again later")
    }

    if(!zero.signer) {
        return new Error("Oops! were unable to sign this transaction, please try again later")
    }

    if(input.amount == 0) { 
        return new Error("Oops! we cant send nothing! send a valid amount")
    }

    return true
}
