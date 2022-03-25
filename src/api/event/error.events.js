import EventEmitter from 'events'


export const ErrorEvents = new EventEmitter()

export const throwErrorMessage = (event, message) => {
    ErrorEvents.emit(event, message)
}
