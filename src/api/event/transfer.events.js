import EventEmitter from 'events'
import { useState, useContext, useEffect } from 'react'

export const TransferEventEmitter = new EventEmitter()

export const useTransferEvents = (TransferComponent) => {
    const [ display, setComponent ] = useState(null)
    useEffect(() => {
        TransferEventEmitter.on("display", (confirmed) => {
            setComponent(<TransferComponent confirmations={confirmed} />)
        })
        TransferEventEmitter.on("clear", () => {
            setComponent(null)
        })
        return () =>  {
             TransferEventEmitter.off("display", (confirmed) => {
            setComponent(<TransferComponent confirmations={confirmed} />)
            })

            TransferEventEmitter.off("clear", () => {
                setComponent(null)
            })
        }
    }, [])

    return {
        display
    }
}

export const useConfirmationsHandler = ({confirmations}) => {
    const [ max, setMax ] = useState(null)
    const [ current, setCurrent ] = useState(null)

    useEffect(() => {
        if (confirmations) {
            confirmations.on('confirmation', (i, target) => {
                if (!max) setMax(target)
                setCurrent(i+1)
            })
        }
    }, [confirmations])

    return {
        max, current
    }
}