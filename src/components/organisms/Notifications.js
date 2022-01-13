import { useNotification, _ErrorNotifications, _TransactionNotifications } from '../../core/instance'
import {ErrorCard} from './ErrorCard'
import TransactionCard  from '../molecules/TransactionCard'
import _ from 'lodash'
export const ErrorNotifications = () => {
    const data = useNotification({group: "error_group", event: _ErrorNotifications.emitter})
    return (
        <div className="fixed top-0 right-0 w-fit h-fit mt-[6rem] mr-[6rem] z-50">
            {!_.isNull(data) && <ErrorCard message={data}/>}
        </div>
    )
}

export const TransactionNotifications = () => {
    const data = useNotification({group: "transaction_group", event: _TransactionNotifications.emitter})
    return (
        <div className="fixed top-0 left-0 w-fit h-fit mt-[6rem] z-50">
            {!_.isNull(data) && <TransactionCard deposit={data}/>}
          </div>
    )
}