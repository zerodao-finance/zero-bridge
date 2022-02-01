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


// TODO: improvement WORK IN PROGRESS
class EventMothership {
    stack = new Set([])
    constructor(){

    }

    async createEventGroup() {

    }

    async hookFactory(group) {
        if (!this.stack.has(type)) return
        const emitter = this.stack.get(type)
        return function useHook(component, data, action) {
            useEffect(() => {

            })

            return 
        }
    }
}