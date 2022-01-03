import { times } from "lodash";
import tools from '../_utils'
import { TransferRequest } from "zero-protocol/dist/lib/zero.js"
import { ethers } from 'ethers'


/**
 * The Subject owns some important state and notifies observers when the state
 * changes.
 */
class TransactionMonitor {
    /**
     * @type {string} For the sake of simplicity, the Subject's state, essential
     * to all subscribers, is stored in this variable.
     */

     

    /**
     * @type {Observer[]} List of subscribers. In real life, the list of
     * subscribers can be stored more comprehensively (categorized by event
     * type, etc.).
     */
    transferRequest
    key
    confirmations
    observers = new Map()

    constructor(){
    }

    /**
     * Attach a observer
     * #attach(observer: Observer): void
     */
    attach(observer){
        console.log(`Subject: attaching new ${ observer._type} observer`)
        const type = observer._type
        if (!this.observers.has(type)) this.observers.set(type, new Set())
        if ((this.observers.get(type)).has(observer)) return console.log(`\n Subject: Observer has been attached already`)
        else (this.observers.get(type)).add(observer)
    }

    detach(observer) {
        const type = observer._type
        if ( !this.observers.has(type)) return console.log(`Subject: Observer type is invalid`)
        if ( (this.observers.get(type)).has(observer) ) (this.observers.get(type)).delete(observer)
        else return console.log("Subject: Nonexistent observer")
        return console.log('Subject: Detached an observer.');
    }

    /**
     * Trigger an update in each subscriber.
     */
    notify(type) {
        console.log(`Subject: Notifying observers of type ${type}`);
        if (!this.observers.has(type)) return console.log(`\n Subject: found 0 observers of type ${type}`)
        for (const observer of this.observers.get(type)) {
            observer.update(this);
        }
    }

    /**
     * Usually, the subscription logic is only a fraction of what a Subject can
     * really do. Subjects commonly hold some important business logic, that
     * triggers a notification method whenever something important is about to
     * happen (or after it).
     */
     async _create(transferRequest) {
        console.log(`\nSubject: Transfer request being initiated in localStorage`)
        this.event = "SET"
        this.key = await tools.storage.set(transferRequest)
        console.log("KEY", this.key)
        this.notify()
        return
    }

    async _update(_status) {
        console.log(`\nSubject: Transaction ${this.key} status changed to ${_status}`)
        if ( await this.key ){
            this.event = "UPDATE"
            tools.storage.setStatus(this.key, _status)
            this.notify()
        }
        console.log("No new status to update")
    }

    async _refresh() {
       /**
         * TODO: search and load pending last pending transaction
         */
    }

    _transact(_confirmations){
        this.event = "DISPATCH"
        this.confirmations = _confirmations
        this.notify()
    }
    
    _resolve(){
        this.event = "RESOLVE"
        this.confirmations = null
        this.notify()
    }

    /**
     * TransferRequest Methods
     */
    async _createTxn(to, value, ratio) {
        console.log(`\nSubject: Creating a new TransferRequest with to ${to}`)
        console.log(`\nSubject: ...data: \n { \n value: ${value} \n eth amount: ${value / 100 * ratio} \n chain is : ${process.env.CHAIN || process.env.REACT_APP_CHAIN} \n ratio: ${ratio} \n }`)

        const data = ethers.utils.defaultAbiCoder.encode(
            ["uint256"],
            [ethers.utils.parseEther(parseFloat(String(Number(value) / 100 * ratio)).toFixed(8))]
        )
        const asset = tools.asset
        const transferRequest = new TransferRequest({
            to: to,
            contractAddress: tools.controller.address,
            underwriter: tools.trivialUnderwriter,
            module: tools.zeroModule,
            asset,
            amount: ethers.utils.parseUnits(value, 8),
            data: String(data)
        })
        this.transferRequest = transferRequest
        return transferRequest
    }

    async _setProvider(provider) {
        if (!this.transferRequest || !provider) return new Error(`Subject: error setting provider no transferRequest or provider`)
        this.transferRequest.setProvider(provider)
    }

    /**
     * 
     * @param {*} signer 
     * @returns gateway address
     */
    async _signTransferRequest(signer) {
        if (!this.transferRequest || !signer) return new Error(`Subject: error signing no transferRequest or signer`) 
        this._signature = await this.transferRequest.sign(signer)
        this.event = "SIGNED"
        this.notify("ConvertTableObserver") 
    }

    async _toRenVM(){
        if (!this.transferRequest) return new Error(`Subject: error transfering to renVM no transferRequest`)

        this._mint = this.transferRequest.transferToRenVM()
        this.event = "MINTING"
        // add minting confirmations here
        this.notify()
    }

    async _mockTransfer(){
        console.log(`\nSubject: mocking transfer to RenVM`)
        if (!this.transferRequest) return new Error(`Subject: error mocking transfer to RenVM`)
        this._zeroUser.publishTransferRequest(this.transferRequest)
        this._mint = await this.transferRequest.submitToRenVM(true)
        this._gatewayAddress = this._mint.gatewayAddress
        this.event = "MINTING"
        this.notify("TXCardObserver")
    }

    async _mockSignTxn(signer) {
        if (!this.transferRequest || !signer) return new Error(`Subject: error signing no transferRequest or signer`) 
        this._signature = await this.transferRequest.sign(signer)
        this.event = "SIGNED"
        this.notify("ConvertTableObserver") 
    }



}




export {TransactionMonitor}