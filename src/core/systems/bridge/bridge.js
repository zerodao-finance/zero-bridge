import { ethers } from 'ethers'
import _ from 'lodash'
import { TrivialUnderwriterTransferRequest, TransferRequest } from 'zero-protocol/dist/lib/zero'
import { storage } from '../storage'
import { MOCK_TF_RQ } from '../../tools/utilities'
import { EventEmitter } from 'events'
import TransactionCard from '../../../components/molecules/TransactionCard'
import { DataStructures } from '../../tools'
let { Monitor, Observer } = DataStructures

export class BridgeMonitor extends Monitor {
    /**
     * @attach : (_observer):Observer[]
     * @detach : (_observer): Observer[]
     * @notify : (_group): String
     * 
     */

    listener = new EventEmitter()
    constructor(_type){
        super(_type)
    }

    async _create(_to, _value, _ratio){
        this.error = null
        console.log(`\n ${this.type} Subject: creating a Transfer Request `)
        _to = await _to.getAddress()
        
        const data = ethers.utils.defaultAbiCoder.encode(
            ["uint256"],
            [ethers.utils.parseEther(parseFloat(String(Number(_value) / 100 * _ratio)).toFixed(8))]
        )
        const asset = MOCK_TF_RQ[process.env.REACT_APP_CHAIN].asset
        const transferRequest = new TransferRequest({
            to: _to,
            contractAddress: MOCK_TF_RQ[process.env.REACT_APP_CHAIN].controller.address,
            underwriter: MOCK_TF_RQ[process.env.REACT_APP_CHAIN].trivialUnderwriter,
            module: MOCK_TF_RQ[process.env.REACT_APP_CHAIN].zeroModule,
            asset,
            amount: ethers.utils.parseUnits(String(_value), 8),
            data: String(data)
        })
        this.transferRequest = transferRequest
        return transferRequest
    }

    async load(_transferRequest){
        this.transferRequest = new TransferRequest(_.omit(_transferRequest, ['date']))
        return await this.transferRequest.submitToRenVM()
    }

    async pollTX(_transferRequest){
        this.transferRequest = new TransferRequest(_.omit(_transferRequest, ['date', 'status']))
        this._gatewayAddress = await this.transferRequest.toGatewayAddress()
        this._mint = await this.transferRequest.submitToRenVM()
        this.notify("card_group")

    }

    async sign(signer){
        if (this.error) return
        if (!this.transferRequest || !signer) return this.error = new Error(`${this.type} Subject: ERROR signing: no transfer request or signer`)
        try {
            return this.signature = await this.transferRequest.sign(signer)
        } catch(error){
            console.log("error signing transaction, no wallet connected", error)
        }
    }

    async dry(signer){
        if (this.error) return
        try {
            this._dry = await new TrivialUnderwriterTransferRequest(this.transferRequest).dry(signer.provider, { from : '0x12fBc372dc2f433392CC6caB29CFBcD5082EF494'})
            this._key = await storage.set({...this.transferRequest, date: Date.now()})
        } catch (error) {
            console.log(error)
            this.error = "Loan will fail, double check input values"
            this.timeout = 7000
            this.notify("ERROR")
            return new Error("Loan will fail")
        }
        
    }
    
    async transfer(mock){
        if (this.error) return
        if (mock) return this._gatewayAddress = this._mint.gatewayAddress
        else this._gatewayAddress = await this.transferRequest.toGatewayAddress()
        try {
            await this.zeroUser.publishTransferRequest(this.transferRequest)
            this._mint = await this.transferRequest.submitToRenVM()
            this.notify("CONFIRM")
            this.listener.emit("transaction", this._mint)
        } catch(e) {
            console.log("Error", e)
            if(_.startsWith(this._key, "request:")) window.localStorage.removeItem(`request:${this._key}`)
            else window.localStorage.removeItem(this._key)
            this.error = "Oops, experiencing issues with RenVM"
            this.notify("ERROR")
        }
    }


    async mockSign(signer){
        console.log(`\n ${this.type} Subject: mocking transfer request signature`)
        if (!this.transferRequest || !signer) return this.error = new Error(`\n ${this.type} Subject: error, no transfer request or signer`)
        return this.notify("bridge_group")
    }


}

/**
 * @group bridge_group
 * @events
 *  - transaction_signed
 *      [ pass signed transferRequest to second conversionTool screen ]
 */
export class BridgeObserver extends Observer {
    dispatch
    constructor(_group){
        super(_group)
    }

    async update (monitor) {
        switch (this.group){
            case "CONFIRM":
                let data = monitor.transferRequest
                data.gatewayAddress = monitor._gatewayAddress
                this.dispatch({type: "next", data: { transferRequest: data, back: () => this.dispatch({type: "prev"}) }})
                this.dispatch({type: 'waiting'})
                monitor.listener.on("clear", () => {this.dispatch({type: "prev"})})
                break;
        }
    }
}

export class RefreshObserver extends Observer {
    constructor(_group){
        super(_group)
        this.switch
        this.page
    }
    
    async update (monitor) {
        this.switch()
        this.page(monitor.transferRequest)
    }
}


export class TransactionCardObserver extends Observer {
    constructor(_group){
        super(_group)
        this.append
        this.clear

    }
    async update (monitor) {
        monitor._mint.on('deposit', async (deposit) => {
            const hash = deposit.txHash()
            if (deposit.depositDetails.transaction.confirmations >= 6) return storage.updateTransferRequest(monitor._key, "success")
            await this.append(<TransactionCard btc={monitor._gatewayAddress} confs={deposit}/>)
            (await deposit
                .confirmed())
                .on("target", target => console.log(`0/${target} confirmations`))
                .on("confirmation", (confs, target) => {
                    console.log(`${confs}/${target} confirmations`)
                    if (Number(confs) === 6){
                        storage.updateTransferRequest(monitor._key, "success")
                    }
                })

        })

    }
}

