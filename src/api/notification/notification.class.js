import * as React from 'react'

class NOTIFICATION {
    static ALERT = new NOTIFICATION("ALERT")
    static ERROR = new NOTIFICATION("ERROR")
    static SUCCESS = new NOTIFICATION("SUCCESS")

    constructor(type, message) {
        this.type = type
    } 
}

export class NotificationHandler {
    notifications
    constuctor() {
        
    }

    #addNotification(message, variant) {

    }
}