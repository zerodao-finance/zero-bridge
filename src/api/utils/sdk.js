import { ethers } from "ethers";
import { deploymentsFromSigner, CONNECTIONS } from "./zero";
import {
  TransferRequest,
  BurnRequest,
  FIXTURES,
  utils,
  TransferRequestV2,
  DEPLOYMENTS,
} from "@zerodao/sdk";
import { Buffer } from "buffer";
import { tokenMapping } from "../utils/tokenMapping.js";
import EventEmitter from "events";
import { chainIdToName, DECIMALS } from "../utils/tokenMapping.js";
import peerId from "peer-id";
import { CHAINS } from "./chains";

const renZECControllerAddress = "0x350241Ff5A144Ef09AAfF2E65195453CCBf8fD22";
const zeroBTCAddress =
  DEPLOYMENTS["1"].mainnet.contracts?.ZeroBTC?.address ||
  "0x11dbf784098e296471a08251178f757156651085";

export const checkVaultAmount = async () => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(CHAINS[1].rpcUrls[0]);
    const signer = new ethers.VoidSigner(zeroBTCAddress, provider);
    const renBtcContract = new ethers.Contract(
      "0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D", // renBtc token address
      ["function balanceOf(address) view returns (uint)"],
      signer
    );

    let renBtcBalance = await renBtcContract.balanceOf(signer.getAddress());
    renBtcBalance = ethers.utils.formatUnits(renBtcBalance, 8);
    return renBtcBalance;
  } catch (err) {
    console.error("Error getting vault amount:", err);
    return "0";
  }
};

const pingKeeper = async (zero) => {
  const keeper = zero._keepers[0];
  const _peerId = await peerId.createFromB58String(keeper);
  const peerInfo = await zero.peerRouting.findPeer(_peerId);
  return await zero.ping(peerInfo.id);
};

const determineModule = (asset, chain = "ETHEREUM") => {
  const assetName = Object.keys(FIXTURES[chain]).find(
    (d) => FIXTURES[chain][d].toLowerCase() == asset.toLowerCase()
  );
  if (!["USDC", "WBTC", "renBTC", "ETH"].includes(assetName))
    throw new Error("invalid asset");
  if (["USDC", "WBTC"].includes(assetName))
    return DEPLOYMENTS["1"].mainnet.contracts[`convert${assetName}Mainnet`]
      .address;
  if (assetName == "ETH")
    return DEPLOYMENTS["1"].mainnet.contracts[`convertNativeMainnet`].address;
  if (assetName == "renBTC") return ethers.constants.AddressZero;
};

export class sdkTransfer {
  response = new EventEmitter({ captureRejections: true });
  constructor(
    chainId,
    zeroUser,
    asset,
    value,
    token,
    signer,
    to,
    _data,
    primaryToken,
    isFast
  ) {
    this.chainId = chainId;
    this.isFast = isFast;
    this.zeroUser = zeroUser;
    this.signer = signer;
    this.token = token;
    const self = this;

    // initialize Transfer Request Object
    this.transferRequest = (async function () {
      const module = tokenMapping({
        tokenName: self.token,
        chainId: self.chainId,
      });
      const contracts = await deploymentsFromSigner(signer);
      const data = String(_data) || "0x";
      const amount = ethers.utils.parseUnits(String(value), 8);
      const address = await signer.getAddress();
      const timestamp = String(Math.floor(+new Date() / 1000));
      let req;
      if (!isFast) {
        req = new TransferRequest(
          {
            amount, // btcAmount
            module, // Token Address
            to, // Ethereum Address
            underwriter: contracts.DelegateUnderwriter.address, // BadgerBridgeZeroController.address on mainnet/arbitrum
            asset, // Either the address of renBTC or renZEC on the current chain
            nonce: utils.getNonce(address, timestamp), // Deterministic recovery mechanism
            pNonce: utils.getPNonce(address, timestamp), // Deterministic recovery mechanism
            data, // minOut
            contractAddress:
              primaryToken == "ZEC"
                ? renZECControllerAddress
                : contracts.ZeroController.address, // BadgerBridgeZeroController.address or RenZECController.address on mainnet/arbitrum
            chainId: self.chainId, // any of the available chainIds
            signature: "", // Currently not used
          },
          signer
        );
      } else {
        req = new TransferRequestV2({
          module: determineModule(asset), // determines which module to use
          asset,
          amount,
          to,
          contractAddress: zeroBTCAddress,
          data:
            String(_data) ||
            ethers.utils.defaultAbiCoder.encode(["uint256"], [1]),
          nonce: utils.getNonce(address, timestamp),
          loanId: utils.getPNonce(address, timestamp),
          pNonce: utils.getPNonce(address, timestamp),
          underwriter: CONNECTIONS.KEEPER_ADDRESS,
        });
      }
      req.dry = async () => [];
      return req;
    })();
  }

  async call(_this, asset = "renBTC") {
    // set correct module based on past in speed
    const transferRequest = await this.transferRequest;

    try {
      console.log("calling sign");
      // REMOVED:      await transferRequest.sign(this.signer);
      console.log("signed");
      this.response.emit("signed", { error: false, message: null });
    } catch (err) {
      // handle signing error
      console.error(err);
      this.response.emit("error", { message: "Failed! Must sign Transaction" });
      throw new Error("Failed to sign transaction");
    } //signing

    try {
      //      console.log("LATENCY: " + (await pingKeeper(this.zeroUser)));
      await transferRequest.publish(this.zeroUser);

      const mint = await transferRequest.submitToRenVM(); // In renjsv3, this is really called a gateway
      var gatewayAddress = await transferRequest.toGatewayAddress();

      this.response.emit("published", {
        gateway: gatewayAddress,
        request: transferRequest,
        mintEmitter: mint,
        // hashData: txHash
      });
      return;
    } catch (error) {
      console.error(error);
      this.response.emit("error", {
        message: `Error publishing transaction:\n${error}`,
      });
      throw new Error("Error publishing transaction", error);
    } //submitting
  }
}

const btcAddressToHex = (address) => {
  return ethers.utils.hexlify(
    (() => {
      if (address.substring(0, 3) === "bc1") {
        return ethers.utils.arrayify(Buffer.from(address, "utf8"));
      } else {
        return ethers.utils.base58.decode(address);
      }
    })()
  );
};

// TODO: Make sure the actual burn will occur on the proper network
export class sdkBurn {
  response = new EventEmitter({ captureRejections: true });
  constructor(
    chainId,
    zeroUser,
    minOut,
    amount,
    to,
    deadline,
    signer,
    destination,
    StateHelper,
    primaryToken
  ) {
    this.chainId = chainId;
    this.signer = signer;
    this.StateHelper = StateHelper;
    this.zeroUser = zeroUser;
    this.minOut = minOut;
    const dest = btcAddressToHex(destination);

    this.burnRequest = async function () {
      const contracts = await deploymentsFromSigner(signer);
      const tokenNamespace =
        FIXTURES[chainIdToName[this.chainId].toUpperCase()];
      const asset =
        this.StateHelper.state.burn.input.token === "ETH"
          ? ethers.constants.AddressZero
          : tokenNamespace[this.StateHelper.state.burn.input.token];
      const value = ethers.utils.hexlify(
        ethers.utils.parseUnits(String(amount), DECIMALS[asset.toLowerCase()])
      );
      this.assetName = this.StateHelper.state.burn.input.token;
      this.contractAddress =
        primaryToken == "ZEC"
          ? renZECControllerAddress
          : contracts.ZeroController.address;

      const req = new BurnRequest({
        owner: to, // ethereum address
        underwriter: contracts.DelegateUnderwriter.address, // BadgerBridgeZeroController.address on mainnet/arbitrum
        asset: asset, // address of the token to burn
        amount: value, // parseUnits of the amount of the asset to burn
        deadline: ethers.utils.hexlify(deadline), // ethers.constants.MaxUint256 time to keep gatewayAddress open for
        destination: dest, // bech32 encoded btcAddress put in by user
        contractAddress: this.contractAddress, // BadgerBridgeZeroController.address on mainnet/arbitrum
      });
      console.log("BURN REQUEST:", req);
      return req;
    };
  }

  async call() {
    const burnRequest = await this.burnRequest();
    burnRequest.data = BurnRequest.dataFromMinOut(this.minOut);
    const utxo = burnRequest.waitForRemoteTransaction().then((utxo) => utxo);

    try {
      if (burnRequest.isNative())
        await burnRequest.sendTransaction(this.signer);
      else {
        if (
          !burnRequest.supportsERC20Permit() &&
          (await burnRequest.needsApproval())
        )
          await (await burnRequest.approve(this.signer)).wait();
        await burnRequest.sign(this.signer, this.contractAddress);
      }
      this.response.emit("signed");
    } catch (error) {
      console.error(error);
      this.response.emit("error", { message: "Failed to sign request." });
      //handle signature error
    }

    //publishBurnRequest
    try {
      //      console.log("LATENCY: " + (await pingKeeper(this.zeroUser)));
      burnRequest.publish(this.zeroUser);
      this.response.emit("reset");
      let hostTransaction = await burnRequest.waitForHostTransaction();

      let txResponse = {
        hostTX: hostTransaction,
        txo: utxo,
        underwriterRequest: burnRequest,
      };
      this.response.emit("hash", { request: txResponse });
    } catch (error) {
      console.error(error);
      this.response.emit("error", {
        message: `Failed to publish transaction:\n${error}`,
      });
    }
  }
}
