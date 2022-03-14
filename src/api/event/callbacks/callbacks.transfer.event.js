import { TransferEventEmitter } from "../transfer.events"
/**
 * 
 * @param {*} error 
 * @param {*} mint 
 * @param {*} dispatch 
 * @returns (*) void
 * 
 * 
 * SPEC: this callback should empty event_card_queue state and dump contents
 * into an async processing queue that will update the ui, one event at a time
 * should also update the storage requiremnts by proxy by updating the status in a transfer request object
 * 
 * TODO: empty event_cardf_queue 
 * TODO: store in async queue
 * TODO: update the ui with transfer request
 * TODO: kill ui when complete
 * 
 * 
 */
export async function handleTransferEvent ( error, mint, dispatch ) {
    if ( error ) {
        //TODO handle error with transfer request
        console.log("An error occurred processing this task", error)
        return 
    } else {
        console.log("=".repeat(10), "handling task", "=".repeat(10), `\n`)
       //deposit listener 
        const deposit = await new Promise(async (resolve) => mint.on("deposit", async (deposit) => {
            // handles page reset when deposit is recieved
            dispatch({ type: "RESET_REQUEST", effect: "input"})
            dispatch({ type: "SUCCEED_REQUEST", effect: "transfer", payload: { effect: "page", data: "main"}})

            resolve(deposit)
        }))

        //confirmation listener for ui
        const confirmed = await deposit.confirmed()
        TransferEventEmitter.emit("display", confirmed)


        
        //signature status listener
        const signed = await deposit.signed()
        signed.on("status", (status) => {
            TransferEventEmitter.emit("clear")
            //kill card ui
            // resets event card queue state 
            // dispatch({ type: "RESET_REQUEST", effect: "event_card_queue"})
        })
    }
}
