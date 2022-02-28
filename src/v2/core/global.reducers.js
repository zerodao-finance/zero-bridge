import { useReducer } from 'react'


/**
 * @Reducers
 * 
 * @input reducers
 * 
 * @display reducers
 * 
 * @output reducers (to be stored)
 * 
 * @config reducers (to be memoized after initialization)
 */

function assertNever(x){
    throw new Error("Unexpected Object", x);
}

export const globalBridgeState = {  
    state: {
        input: {
            ratio: 0,
            amount: '0'
        },
        display: {
            ETH: 0,
            renBTC: 0
        },
        isLoading: false,
        error: null,
        transactions: {
            release: [],
            transfer: []
        },
        wallet: null,
        keepers: [],
        network: null,
        address: null
    },
    dipatch: (_a) => {}
}


export const globalBridgeReducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_INPUT":
            switch (action.payload.type) {
                case "RATIO":
                    return { ...state, input: { ...state.input, ratio: action.payload.data}}
                case "AMOUNT":
                    return { ...state, input: { ...state.input, amount: action.payload.data}}
                case "RESET":
                    return { ...state, input: { ratio: 0, amount: 0} }
                default:
                    assertNever(action.payload.type)
            }
        case "START_DISPLAY_REQUEST":
            return { ...state, isLoading: true, error: null}
        case "STATE_CONNECTION_REQUEST":
            return { ...state, isLoading: true, error: null}
        case "FAIL_CONNECTION_REQUEST":
            return { ...state, isLoading: false, error: new Error("Could not establish Wallet Connection"), wallet: null, network: null}
        case "SUCCEED_CONNECTION_REQUEST":
            return { ...state, isLoading: false, error: null, wallet: action.payload.data.wallet, network: action.payload.data.network, address: action.payload.data.address}
        case "SUCCEED_DISPLAY_REQUEST":
            return { ...state, isLoading: false, error: null, display: action.payload.data}
        case "FAIL_DISPLAY_REQUEST":
            return { ...state, isLoading: false, error: new Error("Could Not Update Values"), display: { ETH: 0, renBTC: 0}}
        case "GET_TRANSACTION":
            return { ...state, transactions: action.payload.data}
        case "ADD_TRANSACTION":
            switch (action.payload.type) {
                case "RELEASE":
                    return { ...state, transactions: {...state.transactions, release: [action.payload.data, ...state.transactions.release]}}
                case "TRANSFER":
                    return { ...state, transactions: {...state.transactions, transfer: [action.payload.data, ...state.transactions.transfer]}}
                default:
                    assertNever(action.payload.type)
            }
        default:
            assertNever(action.type)
    }
}
