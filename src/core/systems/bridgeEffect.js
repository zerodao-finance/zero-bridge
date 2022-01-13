import {_BridgeMonitor, _ErrorNotifications, _TransactionNotifications, _BridgeObserver} from '../instance'
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
    _BridgeObserver.dispatch = dispatch


    useEffect(() => {
        _BridgeMonitor.attach(_ErrorNotifications)
        _BridgeMonitor.attach(_TransactionNotifications)
        _BridgeMonitor.attach(_BridgeObserver)
        
        return function cleanup(){
            _BridgeMonitor.detach(_ErrorNotifications)
            _BridgeMonitor.attach(_TransactionNotifications)
            _BridgeMonitor.detach(_BridgeObserver)
        }
    }, [])

    return state
}

