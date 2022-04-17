import { GenericEventEmitter } from '../generic.events'
import { useState, useContext, useEffect } from 'react'


//Error Hook
export const useErrorEvents = (Component) => {
    const [ component, setComponent ] = useState(null) 

    useEffect(() => {
        GenericEventEmitter.on("error_event", (message) => {
            setComponent(<Component message={message} />)
        })

        GenericEventEmitter.on("clear_error_event", () => {
            setComponent(null)
        })

        return () => {
            GenericEventEmitter.off("error_event", (message) => {
                setComponent(<Component message={message} />)
            })

            GenericEventEmitter.off("clear_error_event", () => {
                setComponent(null)
            })
        }

    }, [])

    return {
        component
    }

}