import { useMemo, useContext } from 'react'
import { ethers } from 'ethers'
import { storeContext } from "../global"
import { useNotificationContext } from "../notification"
import { TransactionContext } from '../transaction'
import { TransactionHelper } from '../transaction/helper'
import { NotificationHelper } from '../notification/helper'
import { GlobalStateHelper } from "../utils/global.utilities"
import { SDKHelperClass } from '../utils/sdkHelper'

export const useSDKTransactionSubmit = (module) => {
    const { state, dispatch } = useContext(storeContext)
    const { card, cardDispatch } = useNotificationContext()
    const { transactions, txDispatch } = useContext(TransactionContext)
    const { wallet, zero } = state
    const { input } = state[module]

    //helper classes
    const StateHelper = new GlobalStateHelper(state, dispatch)
    const Notification = new NotificationHelper(card, cardDispatch)
    const Transaction = new TransactionHelper(transactions, txDispatch)

    //getSigner function
    const getSigner = useMemo(async () => {
        try {
            await wallet.provider.send("eth_requestAccounts", [])
            const signer = await wallet.provider.getSigner()
            return signer
        } catch (err) {
            return new Error("Reconnect Wallet, Cannot get signer")
        }
    })

    async function sendTransferRequest() {
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

        const transfer = SDKHelperClass.newTransfer( 
            zeroUser,
            amount,
            ratio,
            signer,
            to,
            isFast,
            data,
            StateHelper,
            Notification,
            Transaction
        )

        try {
            transfer.submitTX()
        } catch (e) {
            dispatch({ type: "RESET_REQUEST", effect: "transfer"})
        }

    }   
    
    async function sendBurnRequest() {
        const StateHelper = new GlobalStateHelper(state, dispatch)
        StateHelper.update("burn","mode",{mode: "showSigning"})
        var signer = await getSigner
        var to = await signer.getAddress()
        var zeroUser = zero.zeroUser
        var amount = input.amount
        var destination = input.destination
        var deadline = ethers.constants.MaxUint256
        var destination = ethers.utils.hexlify(ethers.utils.base58.decode('36c5pSLZ4J11EiyaXuYfJypNzrufYVJ5Qd'))
        const transfer = new sdkBurn(zeroUser, amount, to, deadline, signer, destination)
        await transfer.call(input.token)

    }


    return {
        sendTransferRequest,
        sendBurnRequest    
    }
}
