import { useEffect, useState } from 'react'
import { EventEmitter } from 'events'
/**
 * Event processor superclass
 * @reactor eventListener
 * @property state: String
 * @executor effect(eventListener)
 */
class EventManager {
    state
    reactor = mew EventEmitter()
    
    executor = () => {

    }
    
}