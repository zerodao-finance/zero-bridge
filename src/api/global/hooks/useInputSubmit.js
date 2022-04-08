import { useContext, useMemo } from "react";
import { storeContext } from "../global";
import { GlobalStateHelper } from "../../utils/global.utilities";
import { TransferEventEmitter } from "../../event/transfer.events";
import { sdkBurn, sdkTransfer } from "../../utils/sdk";
import { ethers } from "ethers";
import { useNotificationContext } from "../../notification";
import { NotificationHelper } from "../../notification/helper";
import { getCard } from "../../../ui/molecules/notification.cards/notification.cards.core";

//Bridge Transfer Request Hook
export const useInputSubmit = (module) => {
  const { state, dispatch } = useContext(storeContext);
  const { card, cardDispatch } = useNotificationContext();
  const { wallet, zero, transfer, burn } = state;
  const { input } = state[module];

  const getSigner = useMemo(async () => {
    try {
      let signer = undefined;
      if (wallet.provider.provider) {
        await wallet.provider.provider.send("eth_requestAccounts", []);
        signer = await wallet.provider.getSigner();
      } else {
        await wallet.provider.send("eth_requestAccounts", []);
        signer = await wallet.provider.getSigner();
      }
      return signer;
    } catch (err) {
      return new Error("Cannot get Provider | Reconnect Wallet");
    }
  }, [wallet.provider]);

  async function sendTransferRequest() {
    const StateHelper = new GlobalStateHelper(state, dispatch);
    const Notification = new NotificationHelper(card, cardDispatch);

    Notification.createCard(5000, "message", {
      message: "Submitting Transaction",
    });
    StateHelper.update("transfer", "mode", { mode: "showSigning" });
    var zeroUser = zero.zeroUser;
    var amount = input.amount;
    var token = input.token;
    var ratio = String(input.ratio);
    var signer = await getSigner;
    var to = await signer.getAddress();
    var isFast = input.isFast;
    var data = ethers.utils.defaultAbiCoder.encode(
      ["uint256"],
      [ethers.utils.parseEther(ratio).div(ethers.BigNumber.from("100"))]
    );

    const transfer = new sdkTransfer(
      zeroUser,
      amount,
      token,
      ratio,
      signer,
      to,
      isFast,
      TransferEventEmitter,
      StateHelper,
      Notification,
      data
    );
    try {
      console.log("calling transfer.submitTx");
      await transfer.submitTX();
    } catch (e) {
	    console.error(e);
      dispatch({ type: "RESET_REQUEST", effect: "transfer" });
    }
  }

  async function sendBurnRequest() {
    console.log("sendBurnRequest");
    const StateHelper = new GlobalStateHelper(state, dispatch);
    StateHelper.update("burn", "mode", { mode: "showSigning" });
    console.log(input);
    var signer = await getSigner;
    var to = await signer.getAddress();
    var zeroUser = zero.zeroUser;
    var amount = input.amount;
    var deadline = ethers.constants.MaxUint256;
    console.log(input.destination);

    const transfer = new sdkBurn(
      zeroUser,
      amount,
      to,
      deadline,
      signer,
      input.destination
    );
    await transfer.call(input.token);
  }

  return {
    sendTransferRequest,
    sendBurnRequest,
  };
};
