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
  const { slippage } = state.transfer.input;
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
        quote = await getWbtcQuote(true, ethers.utils.parseUnits(amount, 8));
        quote = ethers.utils.parseUnits(quote, 8);
        break;
      case fixtures.ETHEREUM["USDC"]:
        let wbtcQuote = await getWbtcQuote(
          true,
          ethers.utils.parseUnits(amount, 8)
        );
        quote = await getUsdcWbtcQuote(
          false,
          ethers.utils.parseUnits(wbtcQuote, 8)
        );
        quote = ethers.utils.parseUnits(quote, 6);
        break;
      case fixtures.ETHEREUM["ETH"]:
        wbtcQuote = await getWbtcQuote(
          true,
          ethers.utils.parseUnits(amount, 8)
        );
        quote = await getWbtcWethQuote(
          true,
          ethers.utils.parseUnits(wbtcQuote, 8)
        );
        quote = ethers.utils.parseEther(quote);
        break;
    }

    const inverseSlippage = ethers.utils
      .parseEther("1")
      .sub(ethers.utils.parseEther(String(Number(slippage) / 100)));

    const minOut = inverseSlippage.mul(quote).div(ethers.utils.parseEther("1"));

    let requestData = [
      zeroUser,
      minOut,
      amount,
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
    var asset = StateHelper.state.burn.input.token;

    let quote = 0;
    let wbtcQuote;
    switch (asset) {
      case "renBTC":
        quote = ethers.utils.parseUnits(amount, 8);
        break;
      case "WBTC":
        quote = await getWbtcQuote(false, ethers.utils.parseUnits(amount, 8));
        quote = ethers.utils.parseUnits(quote, 8);
        break;
      case "USDC":
        wbtcQuote = await getUsdcWbtcQuote(
          true,
          ethers.utils.parseUnits(amount, 6)
        );
        quote = await getWbtcQuote(false, wbtcQuote);
        //        quote = ethers.utils.parseUnits(quote, 8);
        break;
      case "ETH":
        wbtcQuote = await getWbtcWethQuote(
          false,
          ethers.utils.parseEther(amount)
        );
        quote = await getWbtcQuote(false, wbtcQuote);
        break;
    }

    const inverseSlippage = ethers.utils
      .parseEther("1")
      .sub(ethers.utils.parseEther(String(Number(slippage) / 100)));

    const minOut = inverseSlippage.mul(quote).div(ethers.utils.parseEther("1"));

    let requestData = [
      zeroUser,
      minOut,
      amount,
      to,
      deadline,
      signer,
      destination,
      StateHelper,
    ];

    Helper.request("burn", requestData);
  }

  return {
    sendTransferRequest,
    sendBurnRequest,
  };
};
