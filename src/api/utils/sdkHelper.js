import { sdkTransfer, sdkBurn } from "./sdk"
export class SDKHelperClass {
    
    constructor(
        request,
        notify,
        txHelper,
        state
        ) {
        this.request = request
        this.response = request.response
        this.notify = notify
        this.txHelper = txHelper
        this.state = state
    }

    
    static Request(type, notify, txHelper, state, ...args){
        switch ( type ) {
            case 'transfer':
                return new SDKHelperClass(new sdkTransfer(...args), notify, txHelper, state)
            case 'burn':
                return new SDKHelperClass(new sdkBurn(...args), notify, txHelper, state)
            }
    }
            
            
    call(){
        this.processTransfer()
        this.request.call()
        this.clean()
    }
    
    processTransfer() {
        this.response.on('signed', () => this.state.update('transfer', 'mode', { mode: "showSigning"}))
        this.response.on('dry', () => this.state.update('transfer', 'mode', { mode: 'waitingDry'}))
        this.response.on('published', (data) => {
            this.notify.createCard(5000, "message", { message: "Successfully created a transaction"})
            this.txHelper.createRequest('transfer', { request: data.request, gateway: data.gateway })
            this.state.update('transfer', 'mode', { mode: 'showGateway', gatewayData: { address: data.gateway, requestData: data.request}})

            }
        )
        this.response.on('error', () => console.log("error"))    
    }

    clean() {
        this.response.removeAllListeners(['signed', 'dry', 'published', 'error'])
        return
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