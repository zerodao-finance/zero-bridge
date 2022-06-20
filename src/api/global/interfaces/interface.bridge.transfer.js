import { storeContext } from "../global";
import { useContext } from "react";
import _ from "lodash";
import { useInputHooks } from "../hooks/useInputFunctions";
import { useSDKTransactionSubmit } from "../../hooks/submit";
import { GlobalStateHelper } from "../../utils/global.utilities";

// Bridge Input Hook
export const useBridgeInput = () => {
  const { state, dispatch } = useContext(storeContext);
  const StateHelper = new GlobalStateHelper(state, dispatch);
  const { btc_usd, eth_usd } = state.priceFeeds.data;
  const { ETH, renBTC } = state.transfer.display;
  const { amount, isFast } = state.transfer.input;
  const { mode } = state.transfer.mode;
  const { sendTransferRequest } = useSDKTransactionSubmit("transfer");
  const { updateAmount, updateModule } = useInputHooks("transfer");

  const getTransferResultsProps = ({ ...otherProps } = {}) => ({
    ETH: ETH,
    renBTC: renBTC,
  });

  const getTransferModuleToggleProps = ({ ...otherProps } = {}) => ({
    isFast: isFast,
    action: updateModule,
  });

  const getTransferSenderProps = ({ ...otherProps } = {}) => ({
    action: sendTransferRequest,
    amount: amount,
    token: state.transfer.input.token,
    btc_usd: btc_usd,
    eth_usd: eth_usd,
  });

  const setTransferSlippage = (e) => {
    dispatch({
      type: "UPDATE",
      module: "transfer",
      effect: "input",
      data: { slippage: e },
    });
  };

  const getTransferSlippageProps = ({ ...otherProps } = {}) => ({
    token: state.transfer.input.token,
    slippage: state.transfer.input.slippage,
    setSlippage: setTransferSlippage,
  });

  const getTransferMode = ({ ...otherProps } = {}) => ({
    mode: mode,
  });

  const setToken = (e) => {
    dispatch({
      type: "UPDATE",
      module: "transfer",
      effect: "input",
      data: { token: e, amount: "" },
    });
  };

  const getTransferInputProps = ({ ...otherProps } = {}) => ({
    amount: amount,
    token: state.transfer.input.token,
    setToken: setToken,
    effect: updateAmount,
    btc_usd: btc_usd,
    eth_usd: eth_usd,
    slippage: state.transfer.input.slippage,
    setSlippage: setTransferSlippage,
  });

  const getGatewayData = ({ ...otherProps } = {}) => ({
    ...StateHelper.getModuleGatewayProps("transfer"),
  });

  return {
    getTransferSenderProps,
    setTransferSlippage,
    getTransferSlippageProps,
    getTransferInputProps,
    getTransferResultsProps,
    getTransferModuleToggleProps,
    getGatewayData,
    getTransferMode,
  };
};
