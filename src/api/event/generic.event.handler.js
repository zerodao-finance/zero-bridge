import { ErrorEvents, throwErrorMessage } from './error.events'
import { TransferEvents, throwTransferRequest } from './transfer.events'
import { storeContext } from '../global/global'
import { useContext } from 'react'
export const useEvents = () => {
    const { state, dispatch } = useContext(storeContext)
    const { event_card_queue } = state
    useEffect(() => {
        if (event_card_queue.length > 0){
            event_card_queue
        }
    }, [event_card_queue])
    
}


