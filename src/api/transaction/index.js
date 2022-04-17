import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { TransactionReducer } from './reducer';

/**
 * Transaction Logic
 * Handler Transfer and Burn request submitting,
 * Handle Transfer Request Persistance
 * Handle Transfer Request Refresh
 */

export const TransactionContext = React.createContext();

/**
 * initial state should be derived from indexedDB
 */
const initialState = {
    pending: {
        burn: [],
        transfer: []
    },
    completed: {
        burn: [],
        transfer: []
    }
};

export const { Provider, Consumer } = TransactionContext;

export const TransactionProvider = ({ children }) => {
    const [transactions, txDispatch ] = React.useReducer(TransactionReducer, initialState);
    const providerValue = { transactions, txDispatch }

    return (
        <Provider value={providerValue}>
            {children}
        </Provider>
    )
}

export const useTransactionContext = () => {
    const { transactions, txDispatch} = React.useContext(TransactionContext)

    return {...transactions, txDispatch}
}
