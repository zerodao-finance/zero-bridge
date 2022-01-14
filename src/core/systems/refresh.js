import _ from "lodash"
import { useState, useEffect } from 'react'
import { storage, sdk } from '../instance'




export function useLocalStorageRefresh(props){
    const [wrapper, setWrapper] = useState()

    
    useEffect(async () => {
        let reqs = (await storage.getTransferRequests())[0]
        _.each(reqs, async (o) => await sdk.submitPendingTX(o))
    }, [])
}

<<<<<<< HEAD
=======
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
>>>>>>> fe4d9728b215a90d7cb0a327badfde00cb09cd92


/**
 * 
 * [...transferRequests, transferRequest] localStorage
 * 
 */

