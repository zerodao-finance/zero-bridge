import { storeContext } from '../global'
import { useContext, useEffect } from 'react'
import async from 'async'


export const useEvents = () => {
    const { state, dispatch } = useContext( storeContext )
    const { event_card_queue } = state
    const { event } = event_card_queue

    const queue = async.queue(function(task, callback) {
        console.log("handling task")
        callback(null, task);
    }, 1);

    useEffect(() => {
        if (event) {
            var mint = event.mint
            var transferRequest = event.transferRequest
            queue.push(mint, async (error, mint) => {
                if ( error ) {
                    console.log("An error occurred while processing task", error)
                } else {
                    const deposit = await new Promise( async (resolve) => mint.on("deposit", async (deposit) => {
                                /**
                                 * Reset the bridge module back to input screen
                                 */
                                dispatch({ type: "RESET_REQUEST", effect: "input"})
                                dispatch({ type: "SUCCEED_REQUEST", effect: "transfer", payload: { effect: "page", data: "main"}})

                                resolve(deposit)
                            })
                    )
                    const confirmed = await deposit.confirmed()
                    confirmed.on("confirmation", (current_confs, total) => {
                        console.log(current_confs + "/" + total + "confirmations")
                    })
                    
                    const signed = await deposit.signed()
                    signed.on("status", (status) => {
                        if (status === "signed") {
                            dispatch({ type: "RESET_REQUEST", effect: "event_card_queue"})
                        }
                    })
                }   
            })
            // handle mint event with ui displays
            // store event transferRequest in global store & persitant storage
        }

    }, [ event ])
}