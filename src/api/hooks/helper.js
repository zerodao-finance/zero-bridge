import { useContext } from "react"
import { storeContext } from "../global"
import { useNotificationContext } from "../notification"
import { NotificationHelper } from "../notification/helper"
import { TransactionContext } from "../transaction"
import { TransactionHelper } from "../transaction/helper"
import { GlobalStateHelper } from "../utils/global.utilities"
import { sdkBurn, sdkTransfer } from "../utils/sdk"
import async from 'async'

export const useRequestHelper = () => {
  const { state, dispatch } = useContext(storeContext)
  const { transactions, txDispatch } = useContext(TransactionContext)
  const { card, cardDispatch } = useNotificationContext()
  const queue = async.queue(function (task, callback) {
    callback(null, task)
  })

  let Helper = new SDKHelper({
    globalState: [state, dispatch],
    tx: [transactions, txDispatch],
    notify: [card, cardDispatch],
    queue: queue
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
    globalState: [state, dispatch],
    tx: [transactions, txDispatch],
    notify: [card, cardDispatch],
    queue: queue
  }) {
    this.Global = new GlobalStateHelper(...params.globalState)
    this.Notify = new NotificationHelper(...params.notify)
    this.Transaction = new TransactionHelper(...params.tx)
    this.Queue = params.queue
  }

  request(_type, request) {
    switch (_type) {
      case "transfer":
        this.handle(new sdkTransfer(...request), _type)
        break;
      case "burn":
        this.handle(new sdkBurn(...request), _type)
        break;
    }
  }

  handle(request, _type) {
    this.#listenForResponse(request.response, _type)
    request.call(this)
    this.#clean(request.response)
  }

  #listenForResponse(response, _type) {
    if (_type === "transfer") {
      // Transfer Requests
      response.on('signing', (data) => {
        this.Notify.createCard(data.timeout, "success", { message: data.message })
        this.Global.update(_type, 'mode', { mode: "showSigning" })
      })

      response.on("signed", (data) => {
        this.Global.update(_type, "mode", { mode: "waitingDry" })
      })

      response.on("published", async (data) => {
        this.Global.update(_type, "mode", { mode: "showGateway", gatewayData: { address: data.gateway, requestData: data.request } })
        this.Queue.push({
          type: _type,
          mint: data.mintEmitter,
          request: data.request,
          transactionHash: data.hashData,
          this: this
        }, this.processTransferRequest)
      })
      //end transfer request conditions     
    }

    if (_type === "burn") {
      response.on("signed", (data) => {
        this.Notify.createCard(3000, "success", { message: "successfully signed request" })
      })

      response.on("hash", async (data) => {
        this.Queue.push({
          type: _type,
          request: data.request,
          this: this
        }, this.processBurnRequest)
      })

    }

    response.on('error', (data) => {
      this.Notify.createCard(6000, "warning", { message: data.message })
    })
  }

  async processBurnRequest(error, task) {
    task.this.Transaction.createRequest("burn", task.request.data)
    task.this.Notify.createCard(20000, task.type, { data: task.request.data, hash: task.request.request })
    //handle burn request
  }

  async processTransferRequest(error, task) {
    const deposit = await new Promise(async resolve =>
      task.mint.on("deposit", async deposit => {
        //recieve deposit object
        console.log(task.transactionHash)
        console.log(deposit)
        task.this.Global.reset(task.type, "input")
        task.this.Global.update(task.type, "mode", { mode: "input" })
        task.this.#tfRequestTransaction(deposit, task)
        resolve(deposit)
        //create a transaction in Transaction with data on deposit receieved
      })
    )
  }

  async #tfRequestTransaction(deposit, task) {
    let data = task.this.Transaction.createRequest("transfer", task.request)
    console.log("Entered requestTransaction")

    await deposit
      .confirmed()
      .on("target", (target) => {
        console.log(`Waiting for ${target} confirmations`)
        task.this.Notify.createTXCard(true, task.type, { hash: task.transactionHash, confirmed: true, data: task.request, max: target, current: 0 })
      })
      .on("confirmation", (confs, target) => {
        console.log(`${confs}/${target}`)
        task.this.Notify.createTXCard(true, task.type, { hash: task.transactionHash, confirmed: true, data: task.request, max: target, current: confs })

        if (confs >= target) {
          data.payload.data.complete
        }
      })
  }

  #clean(response) {
    response.removeAllListeners(['signed', 'error'])
  }
}
