import {BridgeMonitor, RefreshObserver, BridgeObserver, TransactionCardObserver} from '../systems/bridge'
import { ErrorObserver } from '../error/declare'

const _BridgeMonitor = new BridgeMonitor("bridge")
const _BridgeObserver = new BridgeObserver("bridge_group")
const _ErrorObserver = new ErrorObserver("error_group")
const _TransactionCardObserver = new TransactionCardObserver("card_group")

export { _BridgeMonitor, _BridgeObserver, _ErrorObserver, _TransactionCardObserver }