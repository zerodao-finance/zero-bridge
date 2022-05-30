import { ethers } from "ethers";
import { deploymentsFromSigner } from "./zero";
import {
  UnderwriterTransferRequest,
  UnderwriterBurnRequest,
} from "zero-protocol/dist/lib/zero";
import { EIP712_TYPES } from "zero-protocol/dist/lib/config/constants";
import { Buffer } from "buffer";
import fixtures from "zero-protocol/dist/lib/fixtures";
import { ETHEREUM } from "zero-protocol/dist/lib/fixtures";
import { createGetGasPrice } from "ethers-gasnow";
import { tokenMapping } from "../utils/tokenMapping.js";
import EventEmitter from "events";

const remoteETHTxMap = new WeakMap();

const toLower = (s) => s && s.toLowerCase();
const signETH = async function (signer) {
  const { contractAddress, amount, destination, minOut } = this;
  const contract = new ethers.Contract(
    contractAddress,
    ["function burnETH(uint256, bytes) payable"],
    signer
  );
  const tx = await contract.burnETH(minOut, destination, {
    value: amount,
  });
  remoteETHTxMap.set(this, tx.wait());
};

const waitForHostTransaction =
  UnderwriterBurnRequest.prototype.waitForHostTransaction;

const waitForHostTransactionETH = async function () {
  const receiptPromise = remoteETHTxMap.get(this);
  if (receiptPromise) return await receiptPromise;
  else return await waitForHostTransaction.call(this);
};

const DECIMALS = {
  [toLower(ETHEREUM.WBTC)]: 8,
  [toLower(ETHEREUM.renBTC)]: 8,
  [toLower(ETHEREUM.USDC)]: 6,
  [toLower(ETHEREUM.ibBTC)]: 8,
  [ethers.constants.AddressZero]: 18,
};

const toEIP712USDC = function (contractAddress, chainId) {
  this.contractAddress = contractAddress || this.contractAddress;
  this.chainId = chainId || this.chainId;
  return {
    types: {
      EIP712Domain: EIP712_TYPES.EIP712Domain,
      Permit: [
        {
          name: "owner",
          type: "address",
        },
        {
          name: "spender",
          type: "address",
        },
        {
          name: "value",
          type: "uint256",
        },
        {
          name: "nonce",
          type: "uint256",
        },
        {
          name: "deadline",
          type: "uint256",
        },
      ],
    },
    domain: {
      name: "USD Coin",
      version: "2",
      chainId: String(this.chainId) || "1",
      verifyingContract: this.asset || ethers.constants.AddressZero,
    },
    message: {
      owner: this.owner,
      spender: contractAddress,
      nonce: this.tokenNonce,
      deadline: this.getExpiry(),
      value: this.amount,
    },
    primaryType: "Permit",
  };
};

export class sdkTransfer {
  computeRandomValue(salt, address, timestamp) {
    return ethers.utils.solidityKeccak256(
      ["string", "address", "uint256"],
      ["/zero/1.0.0/" + salt, address, timestamp]
    );
  }
  getNonce(address, timestamp) {
    return this.computeRandomValue("nonce", address, timestamp);
  }
  getPNonce(address, timestamp) {
    return this.computeRandomValue("pNonce", address, timestamp);
  }

  response = new EventEmitter({ captureRejections: true });
  constructor(chainId, zeroUser, value, token, signer, to, isFast, _data) {
    this.chainId = chainId;
    this.isFast = isFast;
    this.zeroUser = zeroUser;
    this.signer = signer;
    this.token = token;

    // initialize Transfer Request Object

    const self = this;
    this.transferRequest = (async function () {
      console.log("signer", signer);
      const asset = tokenMapping({
        tokenName: self.token,
        chainId: self.chainId,
      });
      const contracts = await deploymentsFromSigner(signer);
      const data = String(_data) || "0x";
      const module = contracts.ZeroController.address; // TODO: SET THIS CORRECTLY
      const amount = ethers.utils.parseUnits(String(value), 8);

      // Should this also happen on Arbitrum?
      UnderwriterTransferRequest.prototype.loan = async function () {
        return { wait: async () => {} };
      };
      UnderwriterTransferRequest.prototype.getExecutionFunction = () => "repay";
      const address = await signer.getAddress();
      const timestamp = String(Math.floor(+new Date() / 1000));
      const req = new UnderwriterTransferRequest({
        amount, // btcAmount
        module, // Token Address
        to, // Ethereum Address
        underwriter: contracts.DelegateUnderwriter.address, // BadgerBridgeZeroController.address on mainnet/arbitrum
        asset, // Token Address
        nonce: self.getNonce(address, timestamp), // Deterministic recovery mechanism
        pNonce: self.getPNonce(address, timestamp), // Deterministic recovery mechanism
        data, // minOut
        contractAddress: contracts.ZeroController.address, // BadgerBridgeZeroController.address on mainnet/arbitrum
        chainId: self.chainId, // "1" or "42161" TODO: MATIC
        signature: "", // Currently not used
      });
      req.dry = async () => [];
      return req;
    })();
  }

  async call(_this, asset = "renBTC") {
    // set correct module based on past in speed
    const transferRequest = await this.transferRequest;

    try {
      console.log("calling sign");
      await transferRequest.sign(this.signer);
      console.log("signed");
      this.response.emit("signed", { error: false, message: null });
    } catch (err) {
      // handle signing error
      console.error(err);
      this.response.emit("error", { message: "Failed! Must sign Transaction" });
      throw new Error("Failed to sign transaction");
    } //signing

    try {
      const published = await this.zeroUser.publishTransferRequest(
        transferRequest
      );

      let txHash = new Promise((resolve, reject) => {
        published.on("update", async (tx) => {
          resolve(tx.request);
        });

        if (!published) {
          reject("Couldn't get transaction hash");
        }
      });

      const mint = await transferRequest.submitToRenVM(); // TODO: Account for the network the app is currently on
      var gatewayAddress = await transferRequest.toGatewayAddress();

      this.response.emit("published", {
        gateway: gatewayAddress,
        request: transferRequest,
        mintEmitter: mint,
        // hashData: txHash
      });
      return;
    } catch (error) {
      this.response.emit("error", { message: "Error Publishing Transaction" });
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
    StateHelper
  ) {
    this.chainId = chainId;
    this.signer = signer;
    this.StateHelper = StateHelper;
    this.zeroUser = zeroUser;
    this.minOut = minOut;
    const dest = btcAddressToHex(destination);
    const self = this;
    console.log(self.StateHelper.state);
    this.burnRequest = async function () {
      const contracts = await deploymentsFromSigner(signer);
      console.log(ETHEREUM);
      const asset =
        self.StateHelper.state.burn.input.token === "ETH"
          ? ethers.constants.AddressZero
          : ETHEREUM[self.StateHelper.state.burn.input.token];
      const value = ethers.utils.hexlify(
        ethers.utils.parseUnits(String(amount), DECIMALS[asset.toLowerCase()])
      );
      console.log("Destination is: " + ethers.utils.base58.encode(dest));
      this.assetName = self.StateHelper.state.burn.input.token;

      return new UnderwriterBurnRequest({
        owner: to, // ethereum address
        underwriter: contracts.DelegateUnderwriter.address, // BadgerBridgeZeroController.address on mainnet/arbitrum
        asset: asset, // address of the token to burn
        amount: value, // parseUnits of the amount of the asset to burn
        deadline: ethers.utils.hexlify(deadline), // ethers.constants.MaxUint256 time to keep gatewayAddress open for
        destination: dest, // bech32 encoded btcAddress put in by user
        contractAddress: contracts.ZeroController.address, // BadgerBridgeZeroController.address on mainnet/arbitrum
      });
    };
  }

  async call() {
    const burnRequest = await this.burnRequest();
    const utxo = burnRequest.waitForRemoteTransaction().then((utxo) => utxo);
    burnRequest.minOut = this.minOut;
    burnRequest.data = ethers.utils.defaultAbiCoder.encode(
      ["uint256"],
      [this.minOut]
    );
    const asset = burnRequest.asset;
    const assetName = this.assetName;

    //sign burn request
    const { sign, toEIP712 } = burnRequest;
    if (asset.toLowerCase() === ETHEREUM.USDC.toLowerCase()) {
      console.log("toEIP712 reassign");
      burnRequest.toEIP712 = toEIP712USDC;
    } else if (asset.toLowerCase() === ethers.constants.AddressZero) {
      burnRequest.sign = signETH;
    } else if (asset.toLowerCase() !== ETHEREUM.renBTC.toLowerCase()) {
      burnRequest.sign = async function (signer, contractAddress) {
        const assetAddress = this.asset;
        signer.provider.getGasPrice = createGetGasPrice("rapid");
        const token = new ethers.Contract(
          assetAddress,
          [
            "function allowance(address, address) view returns (uint256)",
            "function approve(address, uint256) returns (bool)",
          ],
          signer
        );
        if (
          ethers.BigNumber.from(this.amount).gt(
            await token.allowance(signer.getAddress(), contractAddress)
          )
        )
          await (
            await token.approve(contractAddress, ethers.constants.MaxUint256)
          ).wait();
        this.asset = fixtures.ETHEREUM.renBTC;
        const tokenNonce = String(
          await new ethers.Contract(
            this.contractAddress,
            ["function nonces(address) view returns (uint256) "],
            signer
          ).nonces(await signer.getAddress())
        );
        this.contractAddress = contractAddress;
        burnRequest.toEIP712 = function (...args) {
          this.asset = assetAddress;
          this.tokenNonce = tokenNonce;
          this.assetName =
            assetName.toLowerCase() === "wbtc"
              ? "WBTC"
              : assetName.toLowerCase() === "ibbtc"
              ? "ibBTC"
              : assetName;
          return toEIP712.apply(this, args);
        };

        return await sign.call(this, signer, contractAddress);
      };
    }
    let signTx;
    try {
      const contracts = await deploymentsFromSigner(this.signer);
      signTx = await burnRequest.sign(
        this.signer,
        contracts.ZeroController.address
      );
      this.response.emit("signed");
    } catch (error) {
      console.error(error);
      this.response.emit("error", { message: "failed to sign request!" });
      //handle signature error
    }

    //publishBurnRequest
    if (burnRequest.asset === ethers.constants.AddressZero)
      burnRequest.waitForHostTransaction = waitForHostTransactionETH;
    try {
      if (burnRequest.asset !== ethers.constants.AddressZero) {
        const burn = await this.zeroUser.publishBurnRequest(burnRequest);
        this.response.emit("reset");
        let hostTransaction = await burnRequest.waitForHostTransaction();

        let txResponse = {
          hostTX: hostTransaction,
          txo: utxo,
        };

        this.response.emit("hash", { request: txResponse });

        // hostTransaction.transactionHash
        // let txo = (await utxo).transactionHash
        // this.response.emit('hash', { request: hostTransaction.transactionHash, txo: txo })

        // console.log(burn);
        // burn.on("update", async (tx) => {
        //   console.log(tx);
        //   this.response.emit("hash", { request: tx });
        // });
      } else {
        this.response.emit("hash", { request: signTx });
      }
      // burn.then(async (tx) => {
      //   const transaction = this.signer.provider.getTransactionReceipt(tx.hash);
      //   this.response.emit("published", { data: transaction })
      //   //TODO: do things with this here
      // });
    } catch (error) {
      console.error(error);
      this.response.emit("error", {
        message: `failed to publish transaction: ${error}`,
      });
    }
  }
}
