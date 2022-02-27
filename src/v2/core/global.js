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


/** 
 * initial context
 */
const initialStoreContext = {
    state: {
        items: new Map(),
        transactions: [],
        isLoading: false,
        error: null,
        data: {
            ratio: 0,
            amount: '0'
        }
    },
    dispatch: (_a) => {}
}



function assertNever(x){
    throw new Error("Unexpected Object", x);
}

const reducer = (state, action) => {
    switch (action.type) {
        case "START_REQUEST":
            return {...state, isLoading: true, error: null}
        case "SUCCEED_REQUEST":
            if (action.payload.type === 'transaction') {
                return { ...state,
                    transactions: [action.payload.data, ...state.transactions],
                    isLoading: false, 
                    error: null
                }
            } else if (action.payload.type === 'config') {
                return {
                    ...state,
                    items: state.items.set(...action.payload.data),
                    isLoading: false,
                    error: null
                }
            }
        case "MODIFY_DATA":
            return { ...state, data: action.payload }

        case "FAIL_REQUEST":
            return { ...state, isLoading: false, error: action.payload }           

        default:
            return assertNever(action)
    }
}

const storeContext = createContext(initialStoreContext)
const { Provider } = storeContext

const StateProvider = ({ children }) => {
    /**
     * TODO: implement indexeddb storage
     */

    
    const [ state, dispatch ] = useReducer(reducer, initialStoreContext.state)

    useEffect(async () => {
        console.log(state.transactions)
        console.log(await PersistanceStore.get_all_data())
        if (!_.isEmpty(state.transactions))
            await PersistanceStore.put_data(state.transactions[0], 'complete')
    }, [state.transactions])

    return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { storeContext, StateProvider }






