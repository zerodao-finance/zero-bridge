import TransactionCard from '../../components/molecules/TransactionCard'
import tools from '../_utils'

export class TXCardObserver {

    _type = "TXCardObserver"
    constructor(){
        this.append
        this.clear
    }

    async update(subject) {
        switch (subject.event) {
            case "MINTING":
                console.log(`Observer: Adding transaction card to the screen`)
                const deposit = await new Promise((resolve) => subject.mint.on('deposit', resolve));
                console.log("waiting for confirmation")
                const confirmed = await deposit.confirmed();
                console.log("adding card to the screen")
                this.append(<TransactionCard btc={subject._gatewayAddress} confs={confirmed}/>)
                confirmed.on('deposit', async (confs, target) => {
                    if (confs == 6){
                        console.log(`\nObserver: transaction successful, removing TxnCard from DOM`)
                        tools.storage.setStatus(this._key, "success")
                        this.clear()
                    }
                })

                const signed = deposit.signed();
                signed.on("status", async (status) => {
                    if (status === 'signed') await tools.storage.setStatus(this._key)
                })
                break;
        }
    }
}

export class ConvertTableObserver {
    _type = "ConvertTableObserver"

    constructor(_hide){
        this.hide = _hide
        this._screen
    }

    update(subject) {
        switch (subject.event) {
            case "SIGNED":
                if (subject._key) console.log(`Observer: Showing Confirmation Screen for TX ${subject._key}`)
                if (!subject.transferRequest || !subject._gatewayAddress) return console.log('Observer: no transfer request or gateway address found')
                const data = subject.transferRequest
                data.gatewayAddress = subject._gatewayAddress
                console.log(data)
                this._screen(data)
                break;
            case "MINTING":
                console.log(`Observer: showing confirm animation`)
                this.hide(true)
                setTimeout(() => {
                    this.hide(false)
                }, 5000)
        }

    }


}

export class TXTableObserver {

    _type = "TXTableObserver"
    update(subject) {

        switch (subject.event) {
            /**
             * 
             * @event refresh
             * @function refresh()
             * @returns void
             * 
             * 
             */
        }
    }
}