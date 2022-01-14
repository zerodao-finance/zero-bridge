import { useNotification, _ErrorNotifications, _TransactionNotifications, _events } from '../../core/instance'
import {ErrorCard} from './ErrorCard'
import TransactionCard  from '../molecules/TransactionCard'
import _ from 'lodash'
import {useState, useEffect} from 'react'
export const ErrorNotifications = () => {
    const [data] = useNotification({type: "error", event: _events.dispatch})
    return (
        <div className="fixed top-0 right-0 w-fit h-fit mt-[6rem] mr-[6rem] z-50 text-white">
            {!_.isEmpty(data) && <ErrorCard data={_.head(data)}/>}
        </div>
    )
}

export const TransactionNotifications = () => {
    const [data] = useNotification({type: "confirmed", event: _events.dispatch})
    return (
        <div className="fixed top-0 left-0 w-fit h-fit mt-[6rem] z-50">
            {!_.isEmpty(data) && <TransactionCard data={_.head(data)}/>}
        </div>
    )
}