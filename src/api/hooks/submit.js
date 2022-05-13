import { useMemo, useContext } from "react";
import { ethers } from "ethers";
import { storeContext } from "../global";
import { GlobalStateHelper } from "../utils/global.utilities";
import { useRequestHelper } from "./helper";
import fixtures from "zero-protocol/lib/fixtures";
import { useSlippageFetchers } from "../global/interfaces/interfaces.slippage";

export const useSDKTransactionSubmit = (module) => {
  const { dispatch } = useContext(storeContext);
  const { state, Helper } = useRequestHelper();
  const { wallet, zero } = state;
  const { slippage } = state.transfer;
  const { input } = state[module];
  const { getWbtcQuote, getUsdcWbtcQuote, getWbtcWethQuote } =
    useSlippageFetchers();

  //getSigner function
  const getSigner = useMemo(async () => {
    try {
      await wallet.provider.send("eth_accounts", []);
      const signer = await wallet.provider.getSigner();
      return signer;
    } catch (err) {
      return new Error("Reconnect Wallet, Cannot get signer");
    }
  });

  async function sendTransferRequest() {
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

    let tokenAddr = fixtures.ETHEREUM[token];
    let quote = 0;
    switch (tokenAddr) {
      case fixtures.ETHEREUM["renBTC"]:
        quote = ethers.utils.parseUnits(amount, 8);
        break;
      case fixtures.ETHEREUM["WBTC"]:
        quote = 0;
        break;
      case fixtures.ETHEREUM["USDC"]:
        quote = 0;
        break;
      case fixtures.ETHEREUM["ETH"]:
        quote = 0;
        break;
    }

    const inverseSlippage = ethers.BigNumber.from(1 - slippage);
    const minOut = inverseSlippage.mul(quote);

    let requestData = [
      zeroUser,
      amount,
      minOut,
      token,
      ratio,
      signer,
      to,
      isFast,
      data,
    ];

    Helper.request("transfer", requestData);
    console.log(Helper);
  }

  async function sendBurnRequest() {
    const StateHelper = new GlobalStateHelper(state, dispatch);
    StateHelper.update("burn", "mode", { mode: "showSigning" });
    var signer = await getSigner;
    var to = await signer.getAddress();
    var zeroUser = zero.zeroUser;
    var amount = input.amount;
    var destination = input.destination;
    var deadline = ethers.constants.MaxUint256;
    // var destination = ethers.utils.hexlify(ethers.utils.base58.decode('36c5pSLZ4J11EiyaXuYfJypNzrufYVJ5Qd'))

    let requestData = [
      zeroUser,
      amount,
      to,
      deadline,
      signer,
      destination,
      StateHelper,
    ];

    Helper.request("burn", requestData);

    // const transfer = new sdkBurn(zeroUser, amount, to, deadline, signer, destination, StateHelper)
    // await transfer.call(input.token)
  }

  return {
    sendTransferRequest,
    sendBurnRequest,
  };
};
