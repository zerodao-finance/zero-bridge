import { storeContext } from '../global'
import { useContext, useEffect } from 'react'
import { handleTransferEvent } from '../../event/callbacks/callbacks.transfer.event'
import { TransferEventEmitter } from '../../event/transfer.events'
import async from 'async'


export const useEvents = () => {
    const { state, dispatch } = useContext( storeContext )

    const queue = async.queue(function(task, callback) {
        callback(null, task, dispatch);
    }, 1);

    useEffect(() => {
        TransferEventEmitter.on("transfer", (mint, transferRequest) => {
            console.log("event recieved")
            //store transfer request
            // dispatch({type: "SUCCEED_REQUEST", effect: "transactions", payload: { effect: "transfer", data: { transfer: transferRequest, status: "pending"}}})
            queue.push(mint, handleTransferEvent)
        })

        return () => {
            TransferEventEmitter.off("transfer", (mint) => {
                queue.push(mint, handleTransferEvent)
            })
        }

    }, [])
}
