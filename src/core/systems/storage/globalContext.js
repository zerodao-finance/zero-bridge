import { createContext, useReducer } from 'react'
import { useNetwork } from '../wallet'

const GlobalContext = createContext()
const { Provider } = GlobalContext



const GlobalContextWrapper = ({children}) => {
    global.context = {
        // network: useNetwork(),
        // wallet: useWallet(),
        // signer: useSigner(),
        // transaction: useTransaction(),
        notifications: useNotifications(),
        // localStorage: useLocalStorage()
    }

    return (
        <Provider value={global.context}>
            { children }
        </Provider>
    )
}

