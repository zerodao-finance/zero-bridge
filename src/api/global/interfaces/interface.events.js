import { storeContext } from '../global'
import { useContext, useEffect } from 'react'
import { handleTransferEvent } from '../../event/callbacks/callbacks.transfer.event'
import { TransferEventEmitter } from '../../event/transfer.events'
import { PersistanceStore } from '../../storage/storage'
import async from 'async'
import hash from 'object-hash'



export const useEvents = () => {
    const { state, dispatch } = useContext( storeContext )
    const { requests } = state
    const { transfer } = requests    
    const queue = async.queue(function(task, callback) {
        callback(null, task, dispatch);
     }, 1);


    const transferCallback = ( mint, transferRequest ) => {
        return new MintQueueObject(mint, queue, transferRequest, dispatch)
    }

    useEffect(() => {
        TransferEventEmitter.on("transfer", transferCallback)

        return () => {
            TransferEventEmitter.off("transfer", transferCallback)
        }

    }, [])
}



class MintQueueObject {
    constructor (mint, queue, data, dispatch) {
        this.store = PersistanceStore
        this.status = "pending"
        this.mint = mint
        this.queue = queue
        this.dispatch = dispatch
        this.date = Date.now()
        this.key = hash(data)
        this.data = {data: data, date: this.date, status: this.status}
        this.storeObject()
    }
    
    async storeObject() {
        this.dispatch({ type: "ADD_DATA", module: "requests", effect: "transfer", payload: { key: this.key, data: this.data}})
        this.queue.push(this, handleTransferEvent)
        await this.store.put(this.key, this.data)
    }

    async updateObject(update) {
        this.status = update
        this.data = { ...this.data, status: this.status}
        this.dispatch({ type: "UPDATE_DATA", module: "requests", effect: "transfer", payload: { reference: this.key, update: this.data}})
        await this.store.put(this.key, this.data)
    }

    mint(){
        return this.mint
    }

    data(){
        return this.data
    }

}


