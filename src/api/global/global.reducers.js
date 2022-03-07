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
        transactions: {
            release: [],
            transfer: [],
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
            return { ...state, [ action.effect]: {
                ...globalBridgeState.state[action.effect]
            }}
        default: 
            assertNever(action.type)
    }

    
    // switch (action.type) {
    //     case "UPDATE_INPUT":
    //         switch (action.payload.type) {
    //             case "RATIO":
    //                 return { ...state, input: { ...state.input, ratio: action.payload.data}}
    //             case "AMOUNT":
    //                 return { ...state, input: { ...state.input, amount: action.payload.data}}
    //             case "RESET":
    //                 return { ...state, input: { ratio: 0, amount: 0} }
    //             default:
    //                 assertNever(action.payload.type)
    //         }
    //         break
        
    //     case "START_DISPLAY_REQUEST":
    //         return { ...state, isLoading: true, error: null}

    //     case "STATE_CONNECTION_REQUEST":
    //         return { ...state, isLoading: true, error: null}
    //     case "FAIL_CONNECTION_REQUEST":
    //         return { ...state, isLoading: false, error: new Error("Could not establish Wallet Connection"), wallet: null, network: null}
    //     case "SUCCEED_CONNECTION_REQUEST":
    //         return { ...state, isLoading: false, error: null, wallet: action.payload.data.wallet, network: action.payload.data.network, address: action.payload.data.address, network_config: action.payload.data.network_config}
    //     case "SUCCEED_DISPLAY_REQUEST":
    //         return { ...state, isLoading: false, error: null, display: action.payload.data}
    //     case "FAIL_DISPLAY_REQUEST":
    //         return { ...state, isLoading: false, error: new Error("Could Not Update Values"), display: { ETH: 0, renBTC: 0}}
    //     case "GET_TRANSACTION":
    //         return { ...state, transactions: action.payload.data}
    //     case "ADD_TRANSACTION":
    //         switch (action.payload.type) {
    //             case "RELEASE":
    //                 return { ...state, transactions: {...state.transactions, release: [action.payload.data, ...state.transactions.release]}}
    //             case "TRANSFER":
    //                 return { ...state, transactions: {...state.transactions, transfer: [action.payload.data, ...state.transactions.transfer]}}
    //             default:
    //                 assertNever(action.payload.type)
    //         }
    //     default:
    //         assertNever(action.type)
    // }
}
