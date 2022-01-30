import { EventEmitter } from 'events'

/**
 * singleton
 */
class EventManager {
    constructor(){
        if( ! EventManager.instance){
            this.dispatch = new EventEmitter()
            this.dispatch.setMaxListeners(25)
            EventManager.instance = this
        }

        return EventManager.instance
    }
}

export const _events = new EventManager()
Object.freeze(_events)

// export default _events

