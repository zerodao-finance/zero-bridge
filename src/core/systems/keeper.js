import { useState, useEffect, useContext } from 'react'
import { createZeroUser, createZeroConnection } from "zero-protocol/dist/lib/zero.js";
import _ from 'lodash'
import { _BridgeMonitor } from '../instance'
import {enableGlobalMockRuntime, createMockKeeper} from "zero-protocol/dist/lib/mock.js"



const initializeZeroUser = _.once(async () => {
    const zeroUser = createZeroUser(await createZeroConnection('/dns4/lourdehaufen.dynv6.net/tcp/443/wss/p2p-webrtc-star/'));
    if (process.env.REACT_APP_TEST) {
        await createMockKeeper()
        await enableGlobalMockRuntime()
      }
    await zeroUser.conn.start();
    await zeroUser.subscribeKeepers();
    window.user = zeroUser
    _BridgeMonitor.zeroUser = zeroUser
    return zeroUser
})

export function useKeeper(props) {

    const [keepers, setKeepers] = useState([]);
    const [zeroUser, setZeroUser] = useState(null)
    useEffect(async () => {
        setZeroUser(await initializeZeroUser())
        console.log(`Keeper Effect: ZeroUser initialized`)
    }, [])

    useEffect(() => {
        const listener = (keeper) => {
            console.log(`Keeper effect: ${keeper} found`)
            setKeepers([...keepers, keeper])
        }

        console.log(`Keeper Effect: Zero User searching for keeper: \n`, zeroUser)
        if (zeroUser) zeroUser.on('keeper', listener)
        return () => {if (zeroUser) zeroUser.removeListener("keeper", listener)}
    }, [zeroUser])

    return  {zeroUser, keepers}
}