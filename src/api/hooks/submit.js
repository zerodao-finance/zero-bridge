import { useMemo, useContext } from 'react'
import { ethers } from 'ethers'
import { storeContext } from "../global"
import { useNotificationContext } from "../notification"
import { TransactionContext } from '../transaction'
import { TransactionHelper } from '../transaction/helper'
import { NotificationHelper } from '../notification/helper'
import { GlobalStateHelper } from "../utils/global.utilities"
import { SDKHelperClass } from '../utils/sdkHelper'
import { useRequestHelper } from './helper'
import { sdkBurn } from '../utils/sdk'

export const useSDKTransactionSubmit = (module) => {
    const { dispatch } = useContext( storeContext )
    const { state, Helper } = useRequestHelper()
    const { wallet, zero } = state
    const { input } = state[module]

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
        var token = input.token
        var ratio = String(input.ratio)
        var signer = await getSigner
        var to = await signer.getAddress()
        var isFast = input.isFast
        var data = ethers.utils.defaultAbiCoder.encode(
            ['uint256'],
            [ethers.utils.parseEther(ratio).div(ethers.BigNumber.from('100'))]
        )
        let requestData = [
            zeroUser,
            amount,
            token,
            ratio,
            signer,
            to,
            isFast,
            data
        ]

        Helper.request("transfer", requestData)
        console.log(Helper)

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
        // var destination = ethers.utils.hexlify(ethers.utils.base58.decode('36c5pSLZ4J11EiyaXuYfJypNzrufYVJ5Qd'))

        let requestData = [
            zeroUser,
            amount,
            to,
            deadline,
            signer,
            destination,
            StateHelper
        ]

        Helper.request("burn", requestData)

        // const transfer = new sdkBurn(zeroUser, amount, to, deadline, signer, destination, StateHelper)
        // await transfer.call(input.token)

    }


    return {
        sendTransferRequest,
        sendBurnRequest    
    }
}
