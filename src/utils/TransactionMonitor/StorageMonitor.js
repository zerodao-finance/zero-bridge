import { BaseMonitor } from './Monitor'
import _ from 'lodash'
import tools from '../_utils'

class StorageMonitor extends BaseMonitor {
    constructor () {

        super()
        this.set_currentTX( )
    }

    /**
     * @returns pending transactions
     */
    get_allPendingTX ( ) {
        let parsed = await tools.storage.getAllTransferRequests()
        return _.filter(parsed, function (tx) { tx.status == 'pending'})
    }

    /**`
     * @returns array of `Transfer Request` objects
     */
    get_allTX ( ) {
        return tools.storage.getAllTransferRequests()
    }

    set_currentTX (  ) {
        let parsed = tools.storage.getAllTransferRequests()
        this.current = _.head(parsed) || null
    }

    update_currentTX ( ) {
        if (!this.current) return this.error = new Error(`\nSubject: can't update current TX of ${this.current}`)
        this.current
    }

    update_currentTX ( _status ) {
        if (!this.current) return this.error = new Error(`\nSubject: can't update current TX of ${this.current}`)
        this.tools.storage.setStatus(this.current, _status)
        
    }

    set_newTX (_transferRequest) {
        console.log(`Subject: Setting a new current TX with data ${_TransferRequest}`)
        this.current = tools.storage.set(_transferRequest)
        
    }
}