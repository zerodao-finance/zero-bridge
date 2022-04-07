import { useContext } from "react"
import { storeContext } from "../global"
import { useNotificationContext } from "../notification"
import { NotificationHelper } from "../notification/helper"
import { TransactionContext } from "../transaction"
import { TransactionHelper } from "../transaction/helper"
import { GlobalStateHelper } from "../utils/global.utilities"
import { sdkBurn, sdkTransfer } from "../utils/sdk"

export const useRequestHelper = () => {
    const { state, dispatch } = useContext(storeContext)
    const { transactions, txDispatch } = useContext(TransactionContext)
    const { card, cardDispatch } = useNotificationContext()

    let Helper = new SDKHelper({
        globalState: [ state, dispatch ],
        tx: [ transactions, txDispatch ],
        notify: [ card, cardDispatch ]
    })

    return {
        state,
        Helper
    }
}

class SDKHelper {
    
    static create(params) {
        return new SDKHelper(params)
    }

    constructor(params = { 
        globalState: [ state, dispatch ],
        tx: [ transactions, txDispatch ],
        notify: [ card, cardDispatch]
    }) {
        this.Global = new GlobalStateHelper(...params.globalState)
        this.Notify = new NotificationHelper(...params.notify) 
        this.Transaction = new TransactionHelper(...params.tx)
    }

    request(_type, request) {
        switch (_type) {
            case "transfer":
                this.handle(new sdkTransfer(...request))
                break;
            case "burn":
                this.handle(new sdkBurn(...request))
                break;
        }
    }

    handle(request) {
        this.#listenForResponse(request.response)
        request.call()
        this.#clean(request.response)
    }

    #listenForResponse(response) {
        response.on('signed', (data) => {
            this.Notify.createCard(10000, "success", { message: "successfully created a transaction"})
        })
    }

    #clean(response) {
        response.removeAllListeners(['published'])
    }


    
}
