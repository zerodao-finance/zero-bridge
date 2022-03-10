import { storeContext } from '../global'
import { useContext, useEffect } from 'react'
export const useEvents = () => {
    const { state, dispatch } = useContext( storeContext )
    const { event_card_queue } = state
    const { event } = event_card_queue
    useEffect(() => {
        if (event) {
            console.log(event.mint, event.transferRequest) 
            dispatch({ type: "RESET_REQUEST", effect: "event_card_queue"})
        }

    }, [ event ])
}