import { storeContext } from '../global'
import { useContext, useEffect } from 'react'
import { handleTransferEvent } from '../../event/callbacks/callbacks.transfer.event'
import { TransferEventEmitter } from '../../event/transfer.events'
import async from 'async'
import hash from 'object-hash'
import { storeObjectLocally } from '../callback/callbacks.request'


export const useEvents = () => {
    const { state, dispatch } = useContext( storeContext )
    const { requests } = state
    const { transfer } = requests    
    const queue = async.queue(function(task, callback) {
        callback(null, task, dispatch);
     }, 1);


    //  const transferCallback = (mint, transferRequest) => {
    //      console.log("Event Received")
    //      let key = storeObjectLocally(dispatch, { date: Date.now(), mint: mint, transferRequest: transferRequest, satus: "pending"})
    //      queue.push(mint, handleTransferEvent)
    //  }

    //testing
    useEffect(() => {
        console.log(transfer)
    }, [transfer])

    const transferCallback = ( mint, transferRequest ) => {
        let TransferObject = new MintQueueObject(mint, queue, dispatch)
        TransferObject.storeObjectLocally({ mint: mint, transferRequest: transferRequest, status: TransferObject.status, date: Date.now()})
    }

    useEffect(() => {
        TransferEventEmitter.on("transfer", transferCallback)

        return () => {
            TransferEventEmitter.off("transfer", transferCallback)
        }

    }, [])
}


class MintQueueObject {
    constructor (mint, queue, dispatch) {
        this.status = "pending"
        this.mint = mint
        this.queue = queue
        this.dispatch = dispatch
    }

    storeObjectLocally (data) {
        this.key = hash(data)
        this.data = data
        this.dispatch({type: "ADD_DATA", module: "requests", effect: "transfer", payload: {key: this.key, data: data}})
        this.queue.push(this, handleTransferEvent)
    }

    updateObjectLocally (update) {
        this.status = update
        this.dispatch({ type: "UPDATE_DATA", module: "requests", effect: "transfer", payload: {reference: this.key, update: update}})
    }
}


