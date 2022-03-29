import { useContext, useMemo } from 'react'
import { storeContext } from '../global'
import { GlobalStateHelper } from '../../utils/global.utilities'
import { TransferEventEmitter } from '../../event/transfer.events'
import { sdkBurn, sdkTransfer } from '../../utils/sdk'
import { ethers } from 'ethers'



//Bridge Transfer Request Hook
export const useInputSubmit = (module) => {
    const { state, dispatch } = useContext(storeContext)
    const { wallet, zero, transfer } = state
    const { input } = state[module]

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
        
        const StateHelper = new GlobalStateHelper(state, dispatch)
        StateHelper.update('transfer', 'mode', { mode: "showSigning"})
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

        const transfer = new sdkTransfer(zeroUser, amount, ratio, signer, to, isFast, TransferEventEmitter, StateHelper, data)
        await transfer.submitTX()
    }


    async function sendBurnRequest() {
        const StateHelper = new GlobalStateHelper(state, dispatch)
        StateHelper.update("burn","mode",{mode: "showSigning"})
        var signer = await getSigner
        var to = await signer.getAddress()
        var zeroUser = zero.zeroUser
        var amount = input.amount
        var deadline = ethers.constants.MaxUint256
        var destination = ethers.utils.hexlify(ethers.utils.base58.decode('36c5pSLZ4J11EiyaXuYfJypNzrufYVJ5Qd'))

        console.log(amount, destination, deadline, to)

        const transfer = new sdkBurn(zeroUser, amount, to, deadline, destination)
        
    }

    return { 
        sendTransferRequest,
        sendBurnRequest
    }
}
