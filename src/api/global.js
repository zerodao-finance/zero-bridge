/**
 * Persistant Global Synched Store
 * 
 * DONE: initial context
 * @state
    * items
    * isloading
    * error
* @dispatch
    f*n

* DONE: reducer
    @dispatch START_REQUEST
    @dispatch SUCCEED_REQUEST
    @dispatch FAIL_REQUEST
    @default assertNever

* TODO: Provider
    @effect localStorage.set(key, transferRequests)
    @useReducer

* TODO: reducer
    @disptach SYNC_REQUEST
    @default assertNever
    
 */

import { createContext, useEffect, useReducer } from 'react'
import { PersistanceStore } from './storage'
import hash from 'object-hash'
import _ from 'lodash'
import { globalBridgeState, globalBridgeReducer } from './global.reducers'


const storeContext = createContext(globalBridgeState)
const { Provider } = storeContext

const StateProvider = ({ children }) => {


    const [ state, dispatch ] = useReducer(globalBridgeReducer, globalBridgeState.state)


    // useEffect(async () => {
    //     console.log(state.transactions)
    //     console.log(await PersistanceStore.get_all_data())
    //     if (!_.isEmpty(state.transactions))
    //         await PersistanceStore.put_data(state.transactions[0], 'complete')
    // }, [state.transactions])

    return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { storeContext, StateProvider }






