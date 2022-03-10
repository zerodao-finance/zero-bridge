import EventEmitter from 'events'

export const TransferEvents = new EventEmitter()

export const throwTransferRequest = (event, emitter) => {
    ErrorEvents.emit(event, emitter)
}



class TransferEvent {
    constructor (transferRequest) { 
        this.transferRequest = transferRequest
    }

    getMintStatusListener ( ) {
        const mint = this.transferRequest.submitToRenVM()
        const deposit = await new Promise(async (resolve) => mint.on("deposit", resolve))
        return deposit
    }

    
}