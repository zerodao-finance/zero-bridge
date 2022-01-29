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



/**
 * 
 * [...transferRequests, transferRequest] localStorage
 * 
 */

