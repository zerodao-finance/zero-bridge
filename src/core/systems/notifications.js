/**
 * React Hook based notification system
 * Efficient UI updating
 * 
 * EventMonitor
 * 
 * 
 * effect hook governs state of display zones
 * effect hook governs uidisplay and internal state of modular component
 * 
 * interfaces w/ frontend with a wrapper with a hook attached that connects to Monitor
 */

import React, { useState, useEffect } from 'react'
import { Observer } from "../tools"
import { EventEmitter } from "events";


export function useNotification(props){
    const [ data, action ] = useState(null)

    useEffect(() => {
        props.event.on("add", (data, time = null) => {
            console.log(props.group)
            action(data)
            if (time) setTimeout(() => action(null), time)
        })
        props.event.on("delete", () => {
            action(null)
        })

        return () => props.event.removeAllListeners()
    }, [])


    return data;
}

export class NotificationObserver extends Observer {
    emitter = new EventEmitter()
    constructor(_group){
        super(_group)
    }

    update(monitor) {
        switch(this.group){
            case "ERROR":
                console.log(`${this.group} Notification: emitting new ${this.group} \n Message: ${monitor.error}`)
                this.emitter.emit("add", monitor.error, monitor.timeout)
                break
            case "TRANSACTION":
                this.emitter.emit("add", monitor.transaction)
                break
        }
    }
}






