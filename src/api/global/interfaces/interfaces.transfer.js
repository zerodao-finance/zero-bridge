import { storeContext } from '../global'
import { useContext, useEffect } from 'react'
import _ from 'lodash'
export const useTransferSender = () => {
    const { state, dispatch } = useContext(storeContext)

    function sendTransferRequest() {
        if (_.isError(validateInputs(state))){
            /**
             * Send Error to error event handler
             */
        }

        /**
         * TODO: cre
         */
    }

    return { 
        sendTransferRequest()
    }
}

const validateInputs = (state) => {
    const { wallet, zero, input, network } = state
    if (!wallet.address) {
        return new Error("Oops! ensure wallet is connected")
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

    /**
     * validate
     * wallet
     * keeper
     * zeroUser
     * signer
     * network
     * inputs
     */
}
