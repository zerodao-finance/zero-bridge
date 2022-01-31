import { createContext, useContext } from 'react'

let BridgeContext
export const { Provider } = (BridgeContext = createContext())

export const useBridgeContext = () => useContext(BridgeContext)