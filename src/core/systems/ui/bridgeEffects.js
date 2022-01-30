import {useEffect, useState} from 'react'
import { _events } from '../event'


export function useBridgeDisplay(){
    const [page, update] = useState(1)
    const [data, setData] = useState()
    const togglePage = (data = null) => {
        update(page == 1 ? 2 : 1)
        setData(data)
    }

    useEffect(() => {
        _events.on("toggle_bridge_display", async (data = null) => togglePage(data))

        return _events.off("toggle_bridge_display", async (data = null) => togglePage(data))
    }, [])

    return [page, data]
}


export function useBridgeInput(){

}