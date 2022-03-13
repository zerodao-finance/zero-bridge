import { ethers } from 'ethers'
import { deployments, deploymentsFromSigner } from './zero'
import { UnderwriterTransferRequest } from 'zero-protocol/dist/lib/zero';
import { TEST_KEEPER_ADDRESS } from 'zero-protocol/dist/lib/mock';
import { TransferEventEmitter } from '../event/transfer.events';

export class sdkTransfer {
    constructor (
        zeroUser,
        value,
        ratio,
        signer,
        to,
        isFast,
        TransferEventEmitter,
        dispatch,        
        _data
    ) {
        this.isFast = isFast;
        this.ratio = ratio;
        this.zeroUser = zeroUser;
        this.signer = signer;
        this.Emitter = TransferEventEmitter
        this.dispatch = dispatch
        
        // initialize Transfer Request Object

        this.transferRequest = (async function() {
            var asset = "0xDBf31dF14B66535aF65AaC99C32e9eA844e14501"
            const contracts = await deploymentsFromSigner(signer)   
            const amount = ethers.utils.parseUnits(String(value), 8)
            const data = String(_data)

            console.log(amount)
            return new UnderwriterTransferRequest({
                amount,
                asset,
                to,
                data,
                pNonce: ethers.utils.hexlify(ethers.utils.randomBytes(32)),
                nonce: ethers.utils.hexlify(ethers.utils.randomBytes(32)),
                underwriter: contracts.DelegateUnderwriter.address,
                module: contracts.Convert.address,
                contractAddress: contracts.ZeroController.address
        })
        
        
        })();
    }


    async submitTX() {
        
        // set correct module based on past in speed
        const transferRequest = await this.transferRequest
        transferRequest.module = this.isFast ? deployments.arbitrum.Convert.address : deployments.localhost.ArbitrumConvertQuick.address

        try {
            await transferRequest.sign(this.signer)
            this.dispatch({ type: "SUCCEED_REQUEST", effect: "transfer", payload: {effect: "page", data: "confirm"}})
            // this.dispatch({type: ""})  reset transfer input state
            // this.dispatch({type: "SUCCEED_REQUEST", effect: "transfer", payload: { effect: "request", data: transferRequest}})            
        } catch (err) {
            // handle signing error
            console.log("error", err)
            return new Error("Failed to sign request")
        }   

        try {
            await transferRequest.dry(this.signer.provider, { from: TEST_KEEPER_ADDRESS})
        } catch ( err ) {
            console.log(err)
            return new Error("Transaction will fail")
        }


        //handle publish transfer request
        // emit transfer request        
        try { 
            await this.zeroUser.publishTransferRequest(transferRequest)
            const mint = await transferRequest.submitToRenVM()
            console.log(this.Emitter)
            this.Emitter.emit("transfer", mint, transferRequest)
            return
        } catch (error) {
            console.log(error)
        }

        // handle publish transfer request 
        // try {
        //     await this.zeroUser.publishTransferRequest(transferRequest)
        //     const mint = await transferRequest.submitToRenVM()
        //     if ( process.env.REACT_APP_TEST) {
        //         this.dispatch({ type: "SUCCEED_REQUEST", effect: "event_card_queue", payload: { effect: "event", data: {mint: mint, transferRequest: transferRequest}}})
        //     } else {
        //         // production code
        //         var _gatewayAddress = await transferRequest.toGatewayAddress()
        //         this.dispatch({ type: "SUCCEED_REQUEST", effect: "transfer", payload: { effect: "request", data: { 
        //             ...transferRequest, gateway: _gatewayAddress
        //         }}})

        //         let deposit = mint.on("deposit", async (deposit) => {
        //             let confirmed = deposit.confirmed()
        //             let signed = deposit.signed()
        //             signed.on("status", (status) => {
        //                 // if status is completed update transfer request object
        //             })
        //         })

        //         //end production workflow
        //     }
        // } catch (err) {
        //     //handle errors
        //     console.log(err)
        //     return false
        // }

    }

    
}