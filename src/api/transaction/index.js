import * as React from "react";
import * as ReactDOM from "react-dom";
import { TransactionReducer } from "./reducer";
import { PersistanceStore } from "../storage/storage";

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
    transfer: [],
  },
  completed: {
    burn: [],
    transfer: [],
  },
};

export const { Provider, Consumer } = TransactionContext;

export const TransactionProvider = ({ children }) => {
  const [transactions, txDispatch] = React.useReducer(
    TransactionReducer,
    initialState
  );
  const providerValue = { transactions, txDispatch };

  React.useEffect(async () => {
    // await PersistanceStore.put_data({test: "this is test data 2"}, "pending")
    console.log(await PersistanceStore.get_all_data());
  }, [PersistanceStore]);

  return <Provider value={providerValue}>{children}</Provider>;
};

export const useTransactionContext = () => {
  const { transactions, txDispatch } = React.useContext(TransactionContext);

  return { ...transactions, txDispatch };
};
