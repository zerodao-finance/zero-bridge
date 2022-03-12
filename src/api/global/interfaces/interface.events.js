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
            queue.push(mint, handleTransferEvent)
        })

        return () => {
            TransferEventEmitter.off("transfer", (mint) => {
                queue.push(mint, handleTransferEvent)
            })
        }

    }, [])
}