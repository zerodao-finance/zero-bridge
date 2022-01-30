import {IBridgeMonitor, IErrorNotifications, ITransactionNotifications, IBridgeObserver} from '../../instance'
import { useEffect, useState, useReducer } from 'react'

const initialState = { page: 1, min: 1, max: 2, data: {}, status: null }
function pageReducer(state, action){
    switch(action.type){
        case "next":
            return { page: 2, min: state.min, max: state.max, data: action.data, status: state.status }
        case "prev":
            return { page: 1, min: state.min, max: state.max, data: {}, status: state.status}
        case "waiting":
            return { page: state.page, min: state.min, max: state.max, data: state.data, status: "waiting for deposit"}
    }
}
export function useBridge(){
    const [ state, dispatch ] = useReducer(pageReducer, initialState)
    
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

