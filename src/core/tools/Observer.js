class Observer {
    constructor(_group){
        this.group = _group
    }

    async update (monitor) {

    }
}

class Monitor {

    constructor(_type){
        this.type = _type
        this.observers = new Map()
        this.state = new Map()
        this.error = null
    }

    async attach(_observer){
        console.log(`\n ${this.type} Subject: attaching an observer to ${_observer.group} group`)
        if (!this.observers.has(_observer.group)) this.observers.set(_observer.group, new Set([_observer]))
        else (this.observer.get(_observer.group)).add(_observer)
        return
        
    }

    async detach(_observer){
        console.log(`\n ${this.type} Subject: detaching an observer from ${_observer.group} group`)
        if (!this.observers.has(_observer.group)) return console.log(`\n ${this.type} Subject: no group: ${_observer.group} found`)
        else (this.observers.get(_observer.group)).delete(_observer)
        return
    }

    async notify(_group){
        console.log(`\n ${this.type} Subject: notifying observer in group: ${_group}`)
        if (!this.observers.has(_group)) return console.log(`\n ${this.type} Subject: no group: ${_group} found`)
        else {
            for (const observer of this.observers.get(_group)){
                observer.update(this)
            }
        }

    }

}

export {Observer, Monitor}