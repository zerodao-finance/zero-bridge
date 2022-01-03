import { TransactionMonitor } from './Monitor'
import { TXCardObserver, TXTableObserver, ConvertTableObserver } from './Observers'

export const CardObserver = new TXCardObserver()
export const TableObserver = new TXTableObserver()
export const ConvertObserver = new ConvertTableObserver()
export const Monitor = new TransactionMonitor()