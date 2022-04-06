import { ethers } from "ethers";
import { deployments, deploymentsFromSigner } from "./zero";
import {
  UnderwriterTransferRequest,
  UnderwriterBurnRequest,
} from "zero-protocol/dist/lib/zero";
import { TEST_KEEPER_ADDRESS } from "zero-protocol/dist/lib/mock";

export class sdkTransfer {
  constructor(
    zeroUser,
    value,
    ratio,
    signer,
    to,
    isFast,
    TransferEventEmitter,
    StateHelper,
    Notification,
    _data
  ) {
    this.isFast = isFast;
    this.ratio = ratio;
    this.zeroUser = zeroUser;
    this.signer = signer;
    this.Emitter = TransferEventEmitter;
    this.StateHelper = StateHelper;
    this.Notification = Notification;

    // initialize Transfer Request Object

    this.transferRequest = (async function () {
      var asset = "0xDBf31dF14B66535aF65AaC99C32e9eA844e14501";
      const contracts = await deploymentsFromSigner(signer);
      const amount = ethers.utils.parseUnits(String(value), 8);
      const data = String(_data);

      UnderwriterTransferRequest.prototype.loan = async function () {
        return { wait: async () => {} };
      };
      return new UnderwriterTransferRequest({
        amount,
        asset: contracts.Convert ? asset : contracts.asset.address,
        to,
        data,
        pNonce: ethers.utils.hexlify(ethers.utils.randomBytes(32)),
        nonce: ethers.utils.hexlify(ethers.utils.randomBytes(32)),
        underwriter: contracts.DelegateUnderwriter.address,
        module: contracts.Convert ? contracts.Convert.address : asset,
        contractAddress: contracts.ZeroController.address,
      });
    })();
  }

  async submitTX() {
    const liveDeployments = await deploymentsFromSigner();
    console.log(liveDeployments);
    // set correct module based on past in speed
    const transferRequest = await this.transferRequest;
    transferRequest.module = this.isFast
      ? liveDeployments.ArbitrumConvertQuick?.address
      : liveDeployments.Convert.address;

    try {
      await transferRequest.sign(this.signer);
      this.StateHelper.update("transfer", "mode", { mode: "waitingDry" });
    } catch (err) {
      // handle signing error
      this.Notification.createCard(5000, "error", {
        message: "Failed! Must sign Transaction",
      });
      throw new Error("Failed to sign transaction");
    }

    try {
      await transferRequest.dry(this.signer, { from: TEST_KEEPER_ADDRESS });
    } catch (err) {
      this.Notification.createCard(5000, "error", {
        message: `Error Processing Transaction: ${err}`,
      });
      throw new Error("Dry failed to run");
    }

    //handle publish transfer request
    // emit transfer request
    try {
      await this.zeroUser.publishTransferRequest(transferRequest);
      const mint = await transferRequest.submitToRenVM();
      var gatewayAddress = await transferRequest.toGatewayAddress();
      this.StateHelper.update("transfer", "mode", {
        mode: "showGateway",
        gatewayData: { address: gatewayAddress, requestData: transferRequest },
      });
      this.Emitter.emit("transfer", mint, transferRequest);
      return;
    } catch (error) {
      this.Notification.createCard(5000, "error", {
        message: `Error Publishing Transaction: ${err}`,
      });
      throw new Error("Error publishing transaction");
    }

    // handle publish transfer request
    // try {
    //     await this.zeroUser.publishTransferRequest(transferRequest)
    //     const mint = await transferRequest.submitToRenVM()
    //     if ( process.env.REACT_APP_TEST) {
    //         this.dispatch({ type: "SUCCEED_REQUEST", effect: "event_card_queue", payload: { effect: "event", data: {mint: mint, transferRequest: transferRequest}}})
    //     } else {
    //         // production code
    //         var _gatewayAddress = await transferRequest.toGatewayAddress()
    //         this.dispatch({ type: "SUCCEED_REQUEST", effect: "transfer", payload: { effect: "request", data: {
    //             ...transferRequest, gateway: _gatewayAddress
    //         }}})

    //         let deposit = mint.on("deposit", async (deposit) => {
    //             let confirmed = deposit.confirmed()
    //             let signed = deposit.signed()
    //             signed.on("status", (status) => {
    //                 // if status is completed update transfer request object
    //             })
    //         })

    //         //end production workflow
    //     }
    // } catch (err) {
    //     //handle errors
    //     console.log(err)
    //     return false
    // }
  }
}

export class sdkBurn {
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
    console.log(destination);
    this.signer = signer;
    this.StateHelper = StateHelper;
    this.zeroUser = zeroUser;
    this.BurnRequest = (async function () {
      const contracts = await deploymentsFromSigner(signer);
      const value = ethers.utils.hexlify(
        ethers.utils.parseUnits(String(amount), 8)
      );
      const asset = "0xDBf31dF14B66535aF65AaC99C32e9eA844e14501";

      return new UnderwriterBurnRequest({
        owner: to,
        underwriter: contracts.DelegateUnderwriter.address,
        asset: asset,
        amount: value,
        deadline: ethers.utils.hexlify(deadline),
        destination: ethers.utils.hexlify(
          ethers.utils.base58.decode(destination)
        ),
        contractAddress: contracts.ZeroController.address,
      });
    })();
  }

  async call() {
    const BurnRequest = await this.BurnRequest;
    console.log(BurnRequest);
    const contracts = await deploymentsFromSigner(this.signer);

    //sign burn request
    try {
      await BurnRequest.sign(this.signer, contracts.ZeroController.address);
    } catch (error) {
      console.error(error);
      //handle signature error
    }

    //publishBurnRequest
    try {
      this.zeroUser.publishBurnRequest(BurnRequest);
    } catch (error) {
      console.error(error);
    }
  }
}
