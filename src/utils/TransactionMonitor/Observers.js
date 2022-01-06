import TransactionCard from '../../components/molecules/TransactionCard'
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
                await new Promise((resolve, reject) => subject._mint.on("deposit", async deposit => {
                    await resolve()

                    let confirmed = await deposit.confirmed()
                    this.append(<TransactionCard btc={subject._gatewayAddress} confs={confirmed}/>)

                    confirmed.on('deposit', async (confs, target) => {
                        if (confs == 6){
                            console.log(`\nObserver: transaction successful, removing TxnCard from DOM`)
                            this.clear()
                        }
                    })
                }))
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
                console.log(`Observer: Showing Confirmation Screen`)
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