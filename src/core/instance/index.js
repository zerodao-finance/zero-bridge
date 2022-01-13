import {BridgeMonitor, RefreshObserver, BridgeObserver, TransactionCardObserver} from '../systems/bridge'
import { ErrorObserver } from '../error/declare'
import { useKeeper } from '../systems/keeper'
import { useWallet, useSigner } from '../systems/wallet'
import { useBridgeContext, BridgeProvider } from '../systems/bridgeInput'
import { useNotification, NotificationObserver } from '../systems/notifications'
import { useBridge } from '../systems/bridgeEffect'
import { useTransactionSender, useTransactionListener } from '../systems/transaction'
import { useLocalStorageRefresh } from '../systems/refresh'





const _BridgeMonitor = new BridgeMonitor("bridge")



const _BridgeObserver = new BridgeObserver("CONFIRM")
const _ErrorNotifications = new NotificationObserver("ERROR")
const _TransactionNotifications = new NotificationObserver("TRANSACTION")

const _ErrorObserver = new ErrorObserver("error_group")
const _TransactionCardObserver = new TransactionCardObserver("card_group")

export { _BridgeMonitor, 
    _BridgeObserver, 
    _ErrorObserver, 
    _TransactionCardObserver, 
    useKeeper, 
    useWallet, 
    useSigner, 
    BridgeProvider, 
    useBridgeContext,
    useNotification,
    _ErrorNotifications,
    _TransactionNotifications,
    useBridge,
    useTransactionSender,
    useTransactionListener,
    useLocalStorageRefresh

} 