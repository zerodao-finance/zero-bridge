import { storeContext } from "../global";
import { useContext } from "react";
import { useSDKTransactionSubmit } from "../../hooks/submit";
import { useBridgeInput } from "./interface.bridge.transfer";

export const useBridgeBurnInput = () => {
  const { state, dispatch } = useContext(storeContext);
  const { eth_usd, btc_usd } = state.priceFeeds.data;
  const { sendBurnRequest } = useSDKTransactionSubmit("burn");
  const { input } = state.burn;
  const { amount, destination, token } = input;
  const { setTransferSlippage } = useBridgeInput();

  const updateAmount = (e) => {
    dispatch({
      type: "UPDATE",
      module: "burn",
      effect: "input",
      data: { token, amount: e.target.value, destination },
    });
  };
  const updateDestination = (e) => {
    dispatch({
      type: "UPDATE",
      module: "burn",
      effect: "input",
      data: { token, destination: e.target.value, amount },
    });
  };
  const setToken = (e) => {
    dispatch({
      type: "UPDATE",
      module: "burn",
      effect: "input",
      data: { destination, amount: "", token: e },
    });
  };

  const getBurnSlippageProps = ({ ...otherProps } = {}) => ({
    amount: amount,
    token,
    slippage: state.transfer.input.slippage,
    setSlippage: setTransferSlippage,
  });

  const getBridgeBurnInputProps = ({ ...otherProps } = {}) => ({
    amount: amount,
    destination: destination,
    setToken,
    token,
    btc_usd: btc_usd,
    eth_usd: eth_usd,
    effect: updateAmount,
    updateAmount,
    updateDestination,
  });

  const getBurnSenderProps = ({ ...otherProps } = {}) => ({
    action: sendBurnRequest,
    destination: destination,
    token,
    amount: amount,
    btc_usd: btc_usd,
  });

  return {
    getBridgeBurnInputProps,
    getBurnSlippageProps,
    getBurnSenderProps,
  };
};
