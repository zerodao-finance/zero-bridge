import { ethers } from 'ethers'
import _ from 'lodash'
import { TrivialUnderwriterTransferRequest, TransferRequest } from 'zero-protocol/dist/lib/zero'
import { updateTransferRequest } from './refresh'
import { Monitor, Observer } from '../tools'
import tools from '../../utils/_utils'
import { getTableHeadUtilityClass } from '@mui/material'
import TransactionCard from '../../components/molecules/TransactionCard'

export class BridgeMonitor extends Monitor {
    /**
     * @attach : (_observer):Observer[]
     * @detach : (_observer): Observer[]
     * @notify : (_group): String
     * 
     */
    constructor(_type){
        super(_type)
    }

    async _create(_to, _value, _ratio){
        this.error = null
        console.log(`\n ${this.type} Subject: creating a Transfer Request `)
        try {
            _to = await _to.getAddress()
        } catch ( error ) {
            this.error = new Error("Please Connect Wallet")
            return this.notify("error_group")
        }

        try {
            ethers.utils.parseUnits(_value, 8)
        } catch {
            this.error = new Error("Invalid Input Value")
            return this.notify("error_group")
        }
        const data = ethers.utils.defaultAbiCoder.encode(
            ["uint256"],
            [ethers.utils.parseEther(parseFloat(String(Number(_value) / 100 * _ratio)).toFixed(8))]
        )

        const asset = tools.asset
        const transferRequest = new TransferRequest({
            to: _to,
            contractAddress: tools.controller.address,
            underwriter: tools.trivialUnderwriter,
            module: tools.zeroModule,
            asset,
            amount: ethers.utils.parseUnits(_value, 8),
            data: String(data)
        })
        this.transferRequest = transferRequest
        return transferRequest
    }

    async load(_transferRequest){
        this.transferRequest = new TransferRequest(_.omit(_transferRequest, ['date']))
        return this._gatewayAddress = await this.transferRequest.toGatewayAddress()
        this.notify("refresh_group")
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
        } catch (error) {
            this.error = new Error("Loan will fail, double check input values")
            return this.notify("error_group")
        }
        this._key = await tools.storage.set({...this.transferRequest, date: Date.now(), dry: this._dry})
        this._event = "transaction_signed"
    }
    
    async gatewayAddress(mock){
        if (this.error) return
        if (mock) return this.gatewayAddress = this._mint.gatewayAddress
        this._gatewayAddress = await this.transferRequest.toGatewayAddress()
        return this.notify("bridge_group")
    }

    async transfer(){
        if ( _.isError(this._dry) ) return this.error = new Error(` ${this.type} Subject: Loan will return Error ...${this._dry}`)
        await this.zeroUser.publishTransferRequest(this.transferRequest)
        updateTransferRequest(this._key, "waiting")
        this._mint = await this.transferRequest.submitToRenVM()
        this.notify("card_group")

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
    constructor(_group){
        super(_group)
        this.nextScreen
        this.prevScreen
    }

    async update (monitor) {
        switch (monitor._event){
            case "transaction_signed":
                let data = monitor.transferRequest
                data.gatewayAddress = monitor._gatewayAddress
                this.nextScreen(monitor.transferRequest)
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
            if (deposit.depositDetails.transaction.confirmations >= 6) return updateTransferRequest(monitor._key, "success")
            await this.append(<TransactionCard btc={monitor._gatewayAddress} confs={deposit}/>)
            await deposit
                .confirmed()
                .on("target", target => console.log(`0/${target} confirmations`))
                .on("confirmation", (confs, target) => {
                    console.log(`${confs}/${target} confirmations`)
                    if (Number(confs) === 6){
                        updateTransferRequest(monitor._key, "success")
                    }
                })

        })


        // const deposit = new Promise(async (resolve) => await monitor._mint.on('deposit', resolve)).then(
        //     async (deposit) => 
        //     {
        //         console.log(deposit)
        //         let confirmed = await deposit.confirmed()
        //         console.log(confirmed)
        //         confirmed.on('deposit', async (confs, target) => {
        //             console.log(confs, target)
        //             if (confs == 6){
        //                 console.log(`\nObserver: transaction successful, removing TxnCard from DOM`)
        //                 tools.storage.setStatus(this._key, "success")
        //                 this.clear()
        //             }
        //         })
        //         const signed = deposit.signed();
        //         signed.on("status", async (status) => {
        //             if (status === 'signed') await tools.storage.setStatus(this._key)
        //         })
        //     }
        // )
        // const confirmed = await deposit.confirmed()
    }
}