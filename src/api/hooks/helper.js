import { useContext } from "react";
import { storeContext } from "../global";
import { useNotificationContext } from "../notification";
import { NotificationHelper } from "../notification/helper";
import { TransactionContext } from "../transaction";
import { TransactionHelper } from "../transaction/helper";
import { GlobalStateHelper } from "../utils/global.utilities";
import { sdkBurn, sdkTransfer } from "../utils/sdk";
import async from "async";

const CARD_TIMEOUT = 10000;

export const useRequestHelper = () => {
  const { state, dispatch } = useContext(storeContext);
  const { transactions, txDispatch } = useContext(TransactionContext);
  const { card, cardDispatch } = useNotificationContext();
  const queue = async.queue(function (task, callback) {
    callback(null, task);
  });

  let Helper = new SDKHelper({
    globalState: [state, dispatch],
    tx: [transactions, txDispatch],
    notify: [card, cardDispatch],
    queue: queue,
  });

  return {
    state,
    Helper,
  };
};

class SDKHelper {
  static create(params) {
    return new SDKHelper(params);
  }

  constructor(
    params = {
      globalState: [state, dispatch],
      tx: [transactions, txDispatch],
      notify: [card, cardDispatch],
      queue: queue,
    }
  ) {
    this.Global = new GlobalStateHelper(...params.globalState);
    this.Notify = new NotificationHelper(...params.notify);
    this.Transaction = new TransactionHelper(...params.tx);
    this.Queue = params.queue;
  }

  request(_type, request) {
    switch (_type) {
      case "transfer":
        this.handle(new sdkTransfer(...request), _type);
        break;
      case "burn":
        this.handle(new sdkBurn(...request), _type);
        break;
    }
  }

  handle(request, _type) {
    this.#listenForResponse(request.response, _type);
    request.call(this);
    this.#clean(request.response);
  }

  #listenForResponse(response, _type) {
    if (_type === "transfer") {
      // Transfer Requests
      response.on("signing", (data) => {
        this.Notify.createCard(data.timeout, "success", {
          message: data.message,
        });
        this.Global.update(_type, "mode", { mode: "showSigning" });
      });

      response.on("signed", (data) => {
        this.Global.update(_type, "mode", { mode: "waitingDry" });
      });

      response.on("published", async (data) => {
        this.Global.update(_type, "mode", {
          mode: "showGateway",
          gatewayData: { address: data.gateway, requestData: data.request },
        });
        this.Queue.push(
          {
            type: _type,
            mint: data.mintEmitter,
            request: data.request,
            transactionHash: data.hashData,
            this: this,
          },
          this.processTransferRequest
        );
      });
      //end transfer request conditions
    }

    if (_type === "burn") {
      let cardCleanupProperties = null;
      response.on("signed", () => {
        cardCleanupProperties = this.Notify.createCard(null, "burnWaiting", {
          message: "Burn Transaction Signed. Now Being Submitted.",
        });
      });

      response.on("reset", () => {
        this.Global.reset(_type, "input");
      });

      response.on("hash", async (data) => {
        try {
          cardCleanupProperties.dispatch({
            type: "REMOVE",
            payload: { id: cardCleanupProperties.id },
          });
        } catch (error) {
          console.error(error);
        }

        this.Queue.push(
          {
            type: _type,
            this: this,
            ...data,
          },
          this.processBurnRequest
        );
      });
    }

    response.on("error", (data) => {
      this.Notify.createCard(CARD_TIMEOUT, "warning", {
        message: data.message,
      });
    });
  }

  async processBurnRequest(error, task) {
    let data = task.this.Transaction.createRequest("burn", task.request);

    const { id, dispatch } = task.this.Notify.createBurnCard(task.type, {
      data: { hostTX: task.request.hostTX, txo: null },
    });

    try {
      task.request.txo.then((value) => {
        dispatch({
          type: "UPDATE",
          payload: {
            id: id,
            update: {
              data: { hostTX: task.request.hostTX, txo: value.txHash },
            },
          },
        });

        data.payload.data.complete();
      });
    } catch (err) {
      console.error(err);
      task.this.Notify.createCard(CARD_TIMEOUT, "message", {
        message: "Error: " + err?.message,
      });
    }
    //create card takes hostTX and displays that information
    //shows pending screen untill task.txo is fulfulled and displays transaction receipt

    if (error) {
      console.error(error);
    }
  }

  async processTransferRequest(error, task) {
    await new Promise((resolve) =>
      task.mint.on("transaction", (transaction) => {
        //recieve deposit object
        task.this.Global.reset(task.type, "input");
        task.this.Global.update(task.type, "mode", { mode: "input" });
        task.this.#tfRequestTransaction(transaction, task);
        resolve(transaction);
        //create a transaction in Transaction with data on deposit receieved
      })
    );
  }

  async #tfRequestTransaction(transaction, task) {
    let data = task.this.Transaction.createRequest("transfer", task.request);
    let forwarded = null;

    await transaction.in.wait().on("progress", (progress) => {
      if (!forwarded) {
        const { id, dispatch } = task.this.Notify.createTXCard(
          true,
          task.type,
          {
            hash: task.transactionHash,
            confirmed: true,
            data: task.request,
            max: progress.target,
            current: progress.confirmations,
          }
        );
        forwarded = { id: id, dispatch: dispatch };
      } else {
        if (progress.confirmations >= progress.target) {
          forwarded.dispatch({ type: "REMOVE", payload: { id: forwarded.id } });
          data.payload.data.complete();
        } else {
          forwarded.dispatch({
            type: "UPDATE",
            payload: {
              id: forwarded.id,
              update: {
                max: progress.target,
                current: progress.confirmations + 1,
              },
            },
          });
        }
      }
    });
  }

  #clean(response) {
    response.removeAllListeners(["signed", "error"]);
  }
}
