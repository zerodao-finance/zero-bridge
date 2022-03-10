import { ErrorEvents, throwErrorMessage } from './error.events'
import { TransferEvents, throwTransferRequest } from './transfer.events'
import { storeContext } from '../global/global'
import { useContext } from 'react'
export const useEvents = () => {
    const { state, dispatch } = useContext(storeContext)
    const { event_card_queue } = state
    const { event } = event_card_queue
    useEffect(() => {
        if (event) {
            console.log(event.mint, event.transferRequest)
            dispatch({ type: "RESET_REQUEST", effect: "event_card_queue"})
        }
    }, [event])
    
}


