import { storeContext } from "../global";
import { useContext, useEffect, useState, useMemo } from "react";
import { useBridgeDisplay } from "./interface.bridge";
import { useSDKTransactionSubmit } from "../../hooks/submit";
import { ethers } from "ethers";
import _ from "lodash";

export const useBridgeBurnInput = () => {
  const { state, dispatch } = useContext(storeContext);
  const { eth_usd, btc_eth, btc_usd } = state.priceFeeds.data;
  const { sendBurnRequest } = useSDKTransactionSubmit("burn");
  const { input } = state.burn;
  const { amount, destination, token } = input;

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
      data: { destination, amount: "0", token: e },
    });
  };

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
    tokenPrice: tokenPrice,
  });

  return {
    getBridgeBurnInputProps,
    getBurnSenderProps,
  };
};
