import { sdkTransfer, sdkBurn } from "./sdk"
export class SDKHelperClass {
    
    constructor(request, notify, txHelper, process) {
        this.request = request,
        this.notify = notify.
        this.txHelper = txHelper
        this.process = process
    }

    call(){
        this.request.call()
        this.process(this.request)
    }

    static newTransfer(notify, txHelper, type, ...args){
        let transfer = new sdkTransfer(...args)
        return new SDKHelperClass(transfer, notify, txHelper, SDKHelperClass.processTransfer)
    }
    
    static processTransfer(transfer) {
        transfer.response.on('signed', () => console.log("signed"))
        transfer.response.on('dry', () => console.log("dry"))
        transfer.response.on('published', (data) => console.log(data) )    
    }

    static newBurn(...args){
        return new sdkBurn(...args)
    }
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