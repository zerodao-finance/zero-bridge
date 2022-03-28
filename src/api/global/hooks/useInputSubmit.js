import { useContext, useMemo } from 'react'
import { storeContext } from '../global'

import { TransferEventEmitter } from '../../event/transfer.events'
import { sdkTransfer } from '../../utils/sdk'


//Bridge Transfer Request Hook
export const useInputSubmit = (module) => {
    const { state, dispatch } = useContext(storeContext)
    const { wallet, zero, transfer, burn } = state
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
        
        
        dispatch({ type: "UPDATE", module: "transfer", effect: "mode", data: { processing: true }})
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
        const transfer = new sdkTransfer(zeroUser, amount, ratio, signer, to, isFast, TransferEventEmitter, dispatch, data)
        await transfer.submitTX()
    }

    return { 
        sendTransferRequest,
        isLoading
    }
}


