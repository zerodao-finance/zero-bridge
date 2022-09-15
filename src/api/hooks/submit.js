import { useContext } from "react";
import { ethers } from "ethers";
import { storeContext } from "../global";
import { GlobalStateHelper } from "../utils/global.utilities";
import { useRequestHelper } from "./helper";
import { selectFixture } from "../utils/tokenMapping";

//getSigner function
export const getSigner = async (wallet) => {
  try {
    await wallet.provider.send("eth_accounts", []);
    const signer = await wallet.provider.getSigner();
    return signer;
  } catch (err) {
    return new Error("Reconnect Wallet, Cannot get signer");
  }
};

const getPrimaryTokenMappedAddress = (primaryToken, chainId) => {
  const fixture = selectFixture(chainId);
  switch (primaryToken) {
    case "ZEC":
      if (chainId != "1") {
        console.error("ZEC is not supported on this chain");
      }
      return fixture.renZEC;
    case "BTC":
      return fixture.renBTC;
  }
};

export const useSDKTransactionSubmit = (module) => {
  const { dispatch } = useContext(storeContext);
  const { state, Helper } = useRequestHelper();
  const { wallet, zero } = state;
  const { chainId } = wallet;
  const { primaryToken } = state.bridge.mode;
  const { slippage, destinationAddress } = state.transfer.input;
  const { input } = state[module];

  async function sendTransferRequest() {
    var zeroUser = zero.zeroUser;
    var amount = input.amount;
    var token = input.token;
    var signer = await getSigner(wallet);
    var to = destinationAddress;
    var isFast = input.isFast;

    var quote = input.quote;
    switch (token) {
      case "ETH":
        quote = ethers.utils.parseEther(quote);
        break;
      case "AVAX":
        quote = ethers.utils.parseEther(quote);
        break;
      case "MATIC":
        quote = ethers.utils.parseEther(quote);
        break;
      case "USDC":
        quote = ethers.utils.parseUnits(quote, 6);
        break;
      case "USDC.e":
        quote = ethers.utils.parseUnits(quote, 6);
        break;
      case "USDT":
        quote = ethers.utils.parseUnits(quote, 6);
        break;
      default:
        quote = ethers.utils.parseUnits(quote, 8);
    }

    const inverseSlippage = ethers.utils
      .parseEther("1")
      .sub(ethers.utils.parseEther(String(Number(slippage) / 100)));

    const minOut = inverseSlippage.mul(quote).div(ethers.utils.parseEther("1"));
    const data = ethers.utils.defaultAbiCoder.encode(["uint256"], [minOut]);

    let requestData = [
      chainId,
      zeroUser,
      getPrimaryTokenMappedAddress(primaryToken, chainId), // asset
      amount,
      token,
      signer,
      to,
      isFast,
      data,
      primaryToken,
    ];

    Helper.request("transfer", requestData);
  }

  async function sendBurnRequest() {
    const StateHelper = new GlobalStateHelper(state, dispatch);
    StateHelper.update("burn", "mode", { mode: "showSigning" });
    var signer = await getSigner(wallet);
    var to = await signer.getAddress();
    var zeroUser = zero.zeroUser;
    var amount = input.amount;
    var destination = input.destination;
    var deadline = ethers.constants.MaxUint256;

    var quote = ethers.utils.parseUnits(input.quote, 8);

    const inverseSlippage = ethers.utils
      .parseEther("1")
      .sub(ethers.utils.parseEther(String(Number(slippage) / 100)));

    const minOut = inverseSlippage.mul(quote).div(ethers.utils.parseEther("1"));

    let requestData = [
      chainId,
      zeroUser,
      minOut,
      amount,
      to,
      deadline,
      signer,
      destination,
      StateHelper,
      primaryToken,
    ];

    Helper.request("burn", requestData);
  }

  return {
    sendTransferRequest,
    sendBurnRequest,
  };
};
