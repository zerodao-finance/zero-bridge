import { times } from "lodash";
import tools from './_utils'


/**
 * The Subject owns some important state and notifies observers when the state
 * changes.
 */
class TransactionMonitor {
    /**
     * @type {string} For the sake of simplicity, the Subject's state, essential
     * to all subscribers, is stored in this variable.
     */

     

    /**
     * @type {Observer[]} List of subscribers. In real life, the list of
     * subscribers can be stored more comprehensively (categorized by event
     * type, etc.).
     */
    transferRequest
    key
    confirmations
    observers = []

    constructor(){
    }

    /**
     * Attach a observer
     * #attach(observer: Observer): void
     */
    attach(observer){
        const isExist = this.observers.includes(observer);
        if (isExist) {
            return console.log('Subject: Observer has been attached already.');
        }

        console.log('Subject: Attached an observer.');
        this.observers.push(observer);
    }

    detach(observer) {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            return console.log('Subject: Nonexistent observer.');
        }

        this.observers.splice(observerIndex, 1);
        console.log('Subject: Detached an observer.');
    }

    /**
     * Trigger an update in each subscriber.
     */
    notify() {
        console.log('Subject: Notifying observers...');
        for (const observer of this.observers) {
            observer.update(this);
        }
    }

    /**
     * Usually, the subscription logic is only a fraction of what a Subject can
     * really do. Subjects commonly hold some important business logic, that
     * triggers a notification method whenever something important is about to
     * happen (or after it).
     */
     async _create(transferRequest) {
        console.log(`\nSubject: Transfer request being initiated in localStorage`)
        this.event = "SET"
        this.key = await tools.storage.set(transferRequest)
        console.log("KEY", this.key)
        this.notify()
        return
    }

    async _update(_status) {
        console.log(`\nSubject: Transaction ${this.key} status changed to ${_status}`)
        if ( await this.key ){
            this.event = "UPDATE"
            tools.storage.setStatus(this.key, _status)
            this.notify()
        }
        console.log("No new status to update")
    }

    _transact(_confirmations){
        this.event = "DISPATCH"
        this.confirmations = _confirmations
        this.notify()
    }

    _resolve(){
        this.event = "RESOLVE"
        this.confirmations = null
        this.notify()
    }


}



class TransactionObserver {

    refresh = () => {}
    dispatch = () => {}
    resolve = () => {}

    constructor(_refresh, _dispatch, _resolve){
        this.refresh = _refresh
        this.dispatch = _dispatch
        this.resolve = _resolve
    }

    update(subject){
        switch (subject.event){
            case "SET":
                this.refresh() 
                break;
            case "UPDATE":
                this.refresh()
                break;
            case "DISPATCH":
                this.dispatch(subject.confirmations)
                break;
            case "RESOLVE":
                this.resolve()
                break;
            default:
                break;
        }
    }
}



/**
 * The client code.
 */

export {TransactionMonitor, TransactionObserver}