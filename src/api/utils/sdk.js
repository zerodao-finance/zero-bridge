import { ethers } from "ethers";
import { deployments, deploymentsFromSigner } from "./zero";
import {
  UnderwriterTransferRequest,
  UnderwriterBurnRequest,
} from "zero-protocol/dist/lib/zero";
import { EIP712_TYPES } from "zero-protocol/dist/lib/config/constants";
import fixtures from "zero-protocol/dist/lib/fixtures";
import { TEST_KEEPER_ADDRESS } from "zero-protocol/dist/lib/mock";
import { ETHEREUM } from "zero-protocol/dist/lib/fixtures";
import { createGetGasPrice } from "ethers-gasnow";
import EventEmitter from "events";
import bech32 from "bech32";

const toLower = (s) => s && s.toLowerCase();

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
  constructor(zeroUser, value, token, ratio, signer, to, isFast, _data) {
    this.isFast = isFast;
    this.ratio = ratio;
    this.zeroUser = zeroUser;
    this.signer = signer;
    this.token = token;

    // initialize Transfer Request Object

    const self = this;
    this.transferRequest = (async function () {
      console.log("signer", signer);
      const asset = fixtures[process.env.REACT_APP_CHAIN].renBTC;
      const contracts = await deploymentsFromSigner(signer);
      const data = String(_data) || "0x";
      const module = fixtures[process.env.REACT_APP_CHAIN][self.token];
      const amount = ethers.utils.parseUnits(String(value), 8);

      if (process.env.REACT_APP_CHAIN == "ETHEREUM") {
        UnderwriterTransferRequest.prototype.loan = async function () {
          return { wait: async () => {} };
        };
        UnderwriterTransferRequest.prototype.getExecutionFunction = () =>
          "repay";
      }
      const address = await signer.getAddress();
      const timestamp = String(Math.floor(+new Date() / 1000));
      const req = new UnderwriterTransferRequest({
        amount,
        asset,
        to,
        data,
        pNonce: self.getPNonce(address, timestamp),
        nonce: self.getNonce(address, timestamp),
        underwriter: contracts.DelegateUnderwriter.address,
        module,
        contractAddress: contracts.ZeroController.address,
      });
      req.dry = async () => [];
      return req;
    })();
  }

  async call(_this, asset = "renBTC") {
    const liveDeployments = await deploymentsFromSigner(this.signer);
    // set correct module based on past in speed
    const transferRequest = await this.transferRequest;
    transferRequest.asset = _this.Global.state.wallet.network[asset];
    if (!(process.env.REACT_APP_CHAIN == "ETHEREUM")) {
      transferRequest.module = this.isFast
        ? liveDeployments.ArbitrumConvertQuick?.address
        : liveDeployments.Convert.address;
    }

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

      const mint = await transferRequest.submitToRenVM();
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
      if (address.substr(0, 3) === "bc1") return bech32.decode(address).words;
      else return ethers.utils.base58.decode(address);
    })()
  );
};

export class sdkBurn {
  response = new EventEmitter({ captureRejections: true });
  constructor(
    zeroUser,
    amount,
    to,
    deadline,
    signer,
    destination,
    StateHelper
  ) {
    console.log("sdkBurn");
    this.signer = signer;
    this.StateHelper = StateHelper;
    this.zeroUser = zeroUser;
    const dest = btcAddressToHex(destination);
    const self = this;
    console.log(self.StateHelper.state);
    this.burnRequest = async function () {
      const contracts = await deploymentsFromSigner(signer);
      console.log(ETHEREUM);
      this.asset = self.StateHelper.state.burn.input.token;
      const asset = ETHEREUM[this.asset];
      const value = ethers.utils.hexlify(
        ethers.utils.parseUnits(String(amount), DECIMALS[asset.toLowerCase()])
      );
      console.log("Destination is: " + ethers.utils.base58.encode(dest));

      return new UnderwriterBurnRequest({
        owner: to,
        underwriter: contracts.DelegateUnderwriter.address,
        asset: asset,
        amount: value,
        deadline: ethers.utils.hexlify(deadline),
        destination: dest,
        contractAddress: contracts.ZeroController.address,
      });
    };
  }

  async call() {
    const burnRequest = await this.burnRequest();
    const assetAddress = burnRequest.asset;
    const asset = this.asset;
    //sign burn request
    if (process.env.REACT_APP_CHAIN === "ETHEREUM") {
      const { sign, toEIP712 } = burnRequest;
      if (asset.toLowerCase() === ETHEREUM.USDC.toLowerCase()) {
        console.log("toEIP712 reassign");
        burnRequest.toEIP712 = toEIP712USDC;
      } else if (asset.toLowerCase() !== ETHEREUM.renBTC.toLowerCase()) {
        burnRequest.sign = async function (signer, contractAddress) {
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
              asset.toLowerCase() === "wbtc"
                ? "WBTC"
                : asset.toLowerCase() === "ibbtc"
                ? "ibBTC"
                : asset;
            return toEIP712.apply(this, args);
          };

          return await sign.call(this, signer, contractAddress);
        };
      }
    }

    try {
      const contracts = await deploymentsFromSigner(this.signer);
      await burnRequest.sign(this.signer, contracts.ZeroController.address);
      this.response.emit("signed");
    } catch (error) {
      console.error(error);
      this.response.emit("error", { message: "failed to sign request!" });
      //handle signature error
    }

    //publishBurnRequest
    try {
      const burn = await this.zeroUser.publishBurnRequest(burnRequest);
      this.response.emit("reset");
      console.log(burn);
      burn.on("update", async (tx) => {
        console.log(tx);
        this.response.emit("hash", { request: tx });
      });
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
