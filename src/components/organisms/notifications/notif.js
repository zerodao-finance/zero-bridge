// import { useNotification, _ErrorNotifications, _TransactionNotifications, eventManager } from '../../core/instance'
import { Events } from '../../../core/systems'
const { eventManager } = Events
import { TransactionCard, ErrorCard }  from './cards'
import _ from 'lodash'
import {useState, useEffect} from 'react'
const { useNotification } = Events
export const ErrorNotifications = () => {
    const [data] = useNotification({type: "error", event: eventManager.dispatch})
    return (
        <div className="fixed top-0 right-0 w-fit h-fit mt-[6rem] mr-[6rem] z-50 text-white">
            {!_.isEmpty(data) && <ErrorCard data={_.head(data)}/>}
        </div>
    )
}

export const TransactionNotifications = () => {
    const [data] = useNotification({type: "confirmed", event: eventManager.dispatch})
    return (
        <div className="fixed top-0 left-0 w-fit h-fit mt-[6rem] z-50">
            {!_.isEmpty(data) && <TransactionCard data={_.head(data)}/>}
        </div>
    )
}