import _ from "lodash"
import { useState, useEffect } from 'react'
import { _BridgeMonitor } from '../instance'
/**
 * functions for refreshing transaction tables
 * 
 * getTransferRequests -> get transferRequests sorted by pending & successful
 */

/**
 * @returns array[0] -> pending || array[1] --> success
 */
export const getTransferRequests = () => {
   const returnArr = []
   const entries = Object.entries(window.localStorage).filter(([k, v]) => k.startsWith('request:'))
   for (const [key, value] of entries){
       returnArr.push({key: key, data: JSON.parse(value)})
   }
   return _.partition(returnArr, {data: {'status': 'success'}})
}


export const createTransferRequest = (_object) => {
    return new TransferRequest(_.omit(_object.data, ['date', 'status', 'gatewayAddress', 'dry']))
}

export const updateTransferRequest = (key, status) => {
    const item = Object.entries(window.localStorage).find(([k, v]) => k.startsWith(String(key)))
    console.log(item)
    const parsed = JSON.parse(item[1])
    parsed.status = status
    const stringified = JSON.stringify(parsed)
    window.localStorage.setItem(String(key), stringified)
}


export function useLocalStorageRefresh(props){
    const [wrapper, setWrapper] = useState()

    
    useEffect(() => {
        var entries = _
            .chain(Object.entries(window.localStorage))
            .filter(function(k, v) {return _.startsWith(k, "request:")})
            .transform(function(result, [k, v]){
                result.push({key: k, value: (JSON.parse(v))})
            }, [])
            .filter({ value: { status: "pending"}})
            .value()
        if (!_.isEmpty(entries)) setWrapper(_(entries))

        window.onstorage = () => {
            var entries = _
                .chain(Object.entries(window.localStorage))
                .filter(function(k, v) {return _.startsWith(k, "request:")})
                .transform(function(result, [k, v]){
                    result.push({key: k, value: (JSON.parse(v))})
                }, [])
                .filter({ value: { status: "pending"}})
                .value()
            if (!_.isEmpty(entries)) setWrapper(_(entries))
        }
    }, [])

    useEffect(() => {
        if (wrapper){
            const value = wrapper
                .chain()
                .head()
                .value()

            _BridgeMonitor.listener.emit("background", value.value)
            _BridgeMonitor.listener.on("cleared", () => {
                value.value.status = "success"
                window.localStorage.setItem(value.key, JSON.stringify(value.value))
            })

            console.log(value.key, value.value)
        }
    }, [wrapper])
}

/**
 * 
 * [...transferRequests, transferRequest] localStorage
 * 
 */

