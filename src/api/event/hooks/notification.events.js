import { GenericEventEmitter } from '../generic.events'
import { useState, useEffect } from 'react'
export const useNotificationEvents = ({ message }) => {
    const [component, setComponent] = useState(null)

    useEffect(() => {
        GenericEventEmitter.on("notification_event", (message) => {
            setComponent(<Component message={message} />)
        })
        GenericEventEmitter.on("clear_notification_event", () => {
            setComponent(null)
        })
        
        return () => {
            GenericEventEmitter.off("notification_event", (message) => {
                setComponent(<Component message={message} />)
            })
            GenericEventEmitter.off("clear_notification_event", () => {
                setComponent(null)
            })
        }
    }, [])

    return {
        component
    }
}