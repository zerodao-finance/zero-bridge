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
        input: {
            ratio: 0,
            amount: '0',
            isFast: false,
            isLoading: false,
            error: null
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
        display: {
            ETH: 0,
            renBTC: 0,
            isLoading: false,
            error: null
        },
        event_card_queue: {
            backlog: [],
            isLoading: false,
            error: null
        },
        transfer: {
            page: 'main',
            request: null,
            status: null,
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
