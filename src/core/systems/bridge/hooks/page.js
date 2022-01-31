import { pageReducer, page_state } from '../reducers'
import { useReducer, useEffect } from 'react'
import { _events } from '../../event'
import { IBridgeObserver, IBridgeMonitor, IErrorNotifications, ITransactionNotifications } from '../../../instance'
export function useBridgePage(){
    const [ state, dispatch ] = useReducer(pageReducer, page_state)
    
    useEffect(() => {
        _events.dispatch.on("new_transaction_submited", (transferRequest, gatewayAddress) => {
            dispatch({type: "next", data: { transferRequest: {...transferRequest, gatewayAddress}, back: () => {dispatch({type: "prev"})}}})
        })

        _events.dispatch.on("new_transaction_confirmed", () => { dispatch({type: "prev"})})

        return () => {
            _events.dispatch.off("new_transaction_submited", (transferRequest, gatewayAddress) => {
                dispatch({type: "next", data: { transferRequest: {...transferRequest, gatewayAddress}, back: () => {dispatch("prev")}}})
            })
    
            _events.dispatch.off("new_transaction_confirmed", () => { dispatch({type: "prev"})})
        }
    }, [])


    useEffect(() => {
        IBridgeMonitor.attach(IErrorNotifications)
        IBridgeMonitor.attach(ITransactionNotifications)
        IBridgeMonitor.attach(IBridgeObserver)
        
        return function cleanup(){
            IBridgeMonitor.detach(IErrorNotifications)
            IBridgeMonitor.attach(ITransactionNotifications)
            IBridgeMonitor.detach(IBridgeObserver)
        }
    }, [])

    return state
}