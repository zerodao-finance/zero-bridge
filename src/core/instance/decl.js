import {Bridge}  from '../systems'

const { BridgeMonitor, RefreshObserver, BridgeObserver, TransactionCardObserver } = Bridge

import { Events } from '../systems'
const { NotificationObserver } = Events


export const IBridgeMonitor = new BridgeMonitor('bridge')
export const IBridgeObserver = new BridgeObserver("CONFIRM")
export const IErrorNotifications = new NotificationObserver("ERROR")
export const ITransactionNotifications = new NotificationObserver("TRANSACTION")
// export const IErrorObserver = new ErrorObserver("error_group")
export const ITransactionCardObserver = new TransactionCardObserver("card_group")


