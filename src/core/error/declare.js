import { Observer, Monitor } from "../tools"

class ErrorMonitor extends Monitor {
    constructor(_type){
        super(_type)
    }

    async declare(_message, _cardType, _position, _timeout){

    }


}


export class ErrorObserver extends Observer {
    constructor(_group){
        super(_group)
        this.show
    }

    async update(monitor){
        this.show(monitor.error.message)
    }
}


