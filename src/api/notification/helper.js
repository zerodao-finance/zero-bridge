import { v4 as uuidv4 } from "uuid";
import { getCard } from "../../ui/molecules/notification.cards/notification.cards.core";
export class NotificationHelper {
  static ADD = "ADD";
  static REMOVE = "REMOVE";
  static REMOVE_ALL = "REMOVE_ALL";

  constructor(state, dispatch) {
    this.dispatch = dispatch;
    this.state = state;
  }

  createCard(timeout = 10000, type = null, data) {
    var id = uuidv4();
    this.dispatch({
      type: "ADD",
      payload: {
        id: id,
        type: type,
        timeout: timeout,
        content: getCard,
        callback: () => this._timeout(id, timeout),
        close: () => this._close(id),
        ...data,
      },
    });
  }

  createTXCard(confirmation = true, type = "request", data) {
    var id = uuidv4();
    this.dispatch({
      type: "ADD",
      payload: {
        id: id,
        type: type,
        timeout: null,
        content: getCard,
        confirmation: confirmation,
        callback: () => this.voidCallback(),
        close: () => this._close(id),
        ...data,
      },
    });

    return { id: id, dispatch: this.dispatch };
  }

  createBurnCard(type = "burn", data) {
    var id = uuidv4();
    this.dispatch({
      type: "ADD",
      payload: {
        id: id,
        type: type,
        timeout: null,
        content: getCard,
        callback: () => this.voidCallback(),
        close: () => this._close(id),
        ...data,
      },
    });

    return { id: id, dispatch: this.dispatch };
  }

  //callbacks

  voidCallback = () => {};

  async _confirmation(id, data) {
    await data.deposit.confirmed().on("confirmation", (confs, target) => {
      if (i >= target) {
        this.dispatch({ type: "REMOVE", payload: { id: id } });
        return;
      } else {
        this.dispatch({
          type: "UPDATE",
          payload: { id: id, update: { max: target, current: i + 1 } },
        });
      }
    });
    data.on("confirmation", (i, target) => {
      if (i >= target) {
        this.dispatch({ type: "REMOVE", payload: { id: id } });
        return;
      } else {
        this.dispatch({
          type: "UPDATE",
          payload: { id: id, update: { max: target, current: i + 1 } },
        });
      }
    });
  }
  _close(id) {
    this.dispatch({ type: "REMOVE", payload: { id: id } });
  }

  _timeout(id, timeout) {
    setTimeout(() => {
      this.dispatch({ type: "REMOVE", payload: { id: id } });
    }, timeout);
  }
}
