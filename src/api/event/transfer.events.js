import EventEmitter from 'events'

export const TransferEvents = new EventEmitter()

export const throwTransferRequest = (event, emitter) => {
    ErrorEvents.emit(event, emitter)
}