import { ethers } from 'ethers'
import { deployments, deploymentsFromSigner } from './zero'
import { UnderwriterTransferRequest, UnderwriterBurnRequest } from '@zero-protocol/dist/lib/zero';
import { TEST_KEEPER_ADDRESS } from '@zero-protocol/dist/lib/mock';

export class sdkTransfer {
    constructor (
        zeroUser,
        value,
        ratio,
        signer,
        to,
        isFast,
        TransferEventEmitter,
        StateHelper,        
        _data
    ) {
        this.isFast = isFast;
        this.ratio = ratio;
        this.zeroUser = zeroUser;
        this.signer = signer;
        this.Emitter = TransferEventEmitter
        this.StateHelper = StateHelper
        
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
        transferRequest.module = this.isFast ? deployments.arbitrum.ArbitrumConvertQuick.address : deployments.arbitrum.Convert.address;

        try {
            await transferRequest.sign(this.signer)
            this.StateHelper.update("transfer", "mode", { mode: "waitingDry" })
            
            
            
        } catch (err) {
            // handle signing error
            console.log("submit tx error", err)
            throw new Error("Failed to sign request")
        }   

        try {
            await transferRequest.dry(this.signer, { from: TEST_KEEPER_ADDRESS})
        } catch ( err ) {
            console.log(err)
            return new Error("Transaction will fail")
        }


        //handle publish transfer request
        // emit transfer request        
        try { 
            await this.zeroUser.publishTransferRequest(transferRequest)
            const mint = await transferRequest.submitToRenVM()
            var gatewayAddress = await transferRequest.toGatewayAddress()
            this.StateHelper.update("transfer", "mode", { mode: "showGateway", gatewayData: { address: gatewayAddress, requestData: transferRequest} })
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


export class sdkBurn {
    constructor ( 
        zeroUser,
        amount, 
        to,
        deadline,
        signer,
        destination,
        StateHelper
        ) {
           this.StateHelper = StateHelper
           this.BurnRequest = ( async function(){

               const contracts = await deploymentsFromSigner(signer)  
               const value = ethers.utils.parseUnits(String(amount), 8)
               const asset = '0xDBf31dF14B66535aF65AaC99C32e9eA844e14501'


               return new UnderwriterBurnRequest({
                   owner: to,
                   underwriter: contracts.DelegateUnderwriter.address,
                   asset: asset,
                   amount: value,
                   deadline: deadline,
                   destination: destination,
                   contractAddress: contracts.ZeroController.address,
               })
           })()
           //TODO: finish this
        }

        async call () {
            this.BurnRequest
        }
}