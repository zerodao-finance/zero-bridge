import { useReducer } from 'react'
import _ from 'lodash'

/**
 * @Reducers
 * 
 * DONE: @input
 * DONE: @display
 * TODO: @transactions
 * DONE: @wallet
 * DONE: @zero
 */

function assertNever(x){
    throw new Error("Unexpected Object", x);
}


export const globalBridgeState = {  
    state: {
        bridge: {
            input: {
                ratio: 0,
                amount: '0',
                isFast: false, 
                isLoading: false,
                error: null,
            },
            display: {
                ETH: 0,
                renBTC: 0
            },
            mode: {
                mode: 'transfer', //transfer, release
                processing: false,
                signed: false,
                data: null,
                error: null,
                isLoading: false
            }
        },
        utilities: {
            ethPrice: 0,
            btcPrice: 0,
            themeMode: 'light',
        },
        module: {
            currentModule: "bridge",
            isLoading: false,
            error: null
        },
        network: {
            provider: null,
            priceFeedContract: null
        },
        transferRequestCard: {
            confirmations: null,
            status: null,
            isLoading: false,
            error: null
        },
        transfer: {
            page: 'main',
            isLoading: false,
            error: null
        },
        transactions: {
            release: [],
            transfer: [],
            currentTX: null,
            isLoading: false,
            error: null

        },
        wallet: {
            address: null,
            provider: null,
            signer: null,
            network: null,
            chainId: null,
            isLoading: false,
            error: null
        },
        zero: {
            keepers: [],
            zeroUser: null,
            signer: null,
            controller: null,
            isLoading: false,
            error: null

        }
    },
    dispatch: (_a) => {}
}

/**
 * @display_requests
 *  effects that require intermediate loading screens
 *  ie. page transitions, data requests etc.
 * @background_processes
 *  state effects that occur in the background and dont require intermediate 
 *  display changes
 *  ie. 
 */
export const globalBridgeReducer = (state, action) => {

    switch ( action.type ) {
        case "UPDATE":
            var { module } = action
            var { effect } = action
            var { data } = action
            return {
                ...state,
                [module]: {
                    ...state[module],
                    [effect]: {
                        ...state[module][effect],
                        ...data
                    }
                }
            }
        case "RESET":
            var { module } = action
            var { effect } = action
            return {
                ...state,
                [module] : { 
                    ...state[module],
                    [effect]: globalBridgeState.state[module][effect]
                }
            }
        
        case "START_REQUEST":
            return { ...state, [action.effect]: { ...state[action.effect], isLoading: true, error: null}}
        case "SUCCEED_REQUEST":
            return { ...state, [action.effect]: { ...state[action.effect], [action.payload.effect]: action.payload.data, isLoading: false, error: null}}
        case "SUCCEED_BATCH_REQUEST":
            return { ...state, [action.effect]: {...state[action.effect], ...action.payload, isLoading: false, error: null}}
        case "FAIL_REQUEST":
            return { ...state, [ action.efffect]: { ...state[action.effect], isLoading: false, error: action.payload.error}}
        case "RESET_REQUEST":
            return { ...state, [ action.effect]: { ...globalBridgeState.state[action.effect]}}
        default: 
            assertNever(action.type)
    }

}
