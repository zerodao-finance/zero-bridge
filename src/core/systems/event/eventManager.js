import { EventEmitter } from 'events'

//Singleton EventManager class
class EventManager {
    constructor(){
        if ( !EventManager.instance ){
            this.dispatch = new EventEmitter()
            this.dispatch.setMaxListeners(25)
            EventManager.instance = this
        }

        return EventManager.instance
    }
}

export const eventManager = new EventManager()
Object.freeze(eventManager)

