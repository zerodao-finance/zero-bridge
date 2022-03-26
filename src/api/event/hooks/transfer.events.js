import { GenericEventEmitter } from '../generic.events'
import { useState, useContext, useEffect } from 'react'

export const useTransferEvents = (Component) => {
    const [ component, setComponent ] = useState(null)
    useEffect(() => {
        GenericEventEmitter.on("transfer_event", (confirmed) => {
            setComponent(<Component confirmations={confirmed} />)
        })
        GenericEventEmitter.on("clear_transfer_event", () => {
            setComponent(null)
        })
        return () =>  {
             GenericEventEmitter.off("transfer_event", (confirmed) => {
            setComponent(<Component confirmations={confirmed} />)
            })

            GenericEventEmitter.off("clear_transfer_event", () => {
                setComponent(null)
            })
        }
    }, [])

    return {
        component
    }
}