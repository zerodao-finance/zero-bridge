import { ethers } from "ethers";
import { deployments, deploymentsFromSigner } from "./zero";
import {
  UnderwriterTransferRequest,
  UnderwriterBurnRequest,
} from "zero-protocol/dist/lib/zero";
import fixtures from 'zero-protocol/dist/lib/fixtures';
import { TEST_KEEPER_ADDRESS } from "zero-protocol/dist/lib/mock";
import { ETHEREUM } from "zero-protocol/dist/lib/fixtures";
import { createGetGasPrice } from 'ethers-gasnow';

const toEIP712USDC = function (contractAddress, chainId) {
		this.contractAddress = contractAddress || this.contractAddress;
		this.chainId = chainId || this.chainId;
		return {
			types: {
				Permit: [
					{
						name: 'owner',
						type: 'address',
					},
					{
						name: 'spender',
						type: 'address',
					},
					{
						name: 'value',
						type: 'uint256'
					},
					{
						name: 'nonce',
						type: 'uint256',
					},
					{
						name: 'deadline',
						type: 'uint256',
					},
				],
			},
			domain: {
				name: "USD Coin",
				version: "2",
				chainId: String(this.chainId) || '1',
				verifyingContract: this.asset || ethers.constants.AddressZero,
			},
			message: {
				owner: this.owner,
				spender: contractAddress,
				nonce: this.tokenNonce,
				deadline: this.getExpiry(),
				value: this.amount
			},
			primaryType: 'Permit',
		};
	};

export class sdkTransfer {
  computeRandomValue(salt, address, timestamp) {
    return ethers.utils.solidityKeccak256(['string', 'address', 'uint256'], [ '/zero/1.0.0/' + salt, address, timestamp]);
  }
  getNonce(address, timestamp) {
    return this.computeRandomValue('nonce', address, timestamp);
  }
  getPNonce(address, timestamp) {
    return this.computeRandomValue('pNonce', address, timestamp);
  }
  constructor(
    zeroUser,
    value,
    token,
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
    this.token = token;

    // initialize Transfer Request Object

    const self = this;
    this.transferRequest = (async function () {
      const asset = fixtures[process.env.REACT_APP_CHAIN].renBTC;
      const contracts = await deploymentsFromSigner(signer);
      const amount = ethers.utils.parseUnits(String(value), 8);
      const data = String(_data);
      const module = contracts.Convert && contracts.Convert.address || (process.env.REACT_APP_CHAIN === 'ETHEREUM' ? ETHEREUM.token : asset);
      console.log("Module Is: " + module)

      if (process.env.REACT_APP_CHAIN == "ETHEREUM") {
        UnderwriterTransferRequest.prototype.loan = async function () {
          return { wait: async () => {} };
        };
        UnderwriterTransferRequest.prototype.getExecutionFunction = () =>
          "repay";
      }
      const address = await signer.getAddress();
      const timestamp = String(Math.floor((+new Date()) / 1000));
      return new UnderwriterTransferRequest({
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
    })();
  }

  async submitTX(asset = "renBTC") {
    const liveDeployments = await deploymentsFromSigner(this.signer);
    // set correct module based on past in speed
    const transferRequest = await this.transferRequest;
    transferRequest.asset = this.StateHelper.state.wallet.network[asset];
    if (!(process.env.REACT_APP_CHAIN == "ETHEREUM")) {
      transferRequest.module = this.isFast
        ? liveDeployments.ArbitrumConvertQuick?.address
        : liveDeployments.Convert.address;
    }

    try {
      console.log("calling sign");
      await transferRequest.sign(this.signer);
      console.log("signed");
      this.StateHelper.update("transfer", "mode", { mode: "waitingDry" });
    } catch (err) {
      // handle signing error
      this.Notification.createCard(5000, "error", {
        message: "Failed! Must sign Transaction",
      });
      throw new Error("Failed to sign transaction");
    }
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
    StateHelper,
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

  async call(asset = "wBTC") {
    const burnRequest = await this.BurnRequest;
    burnRequest.asset = fixtures[process.env.REACT_APP_CHAIN][asset];
    console.log(burnRequest);
    const contracts = await deploymentsFromSigner(this.signer);

    //sign burn request
    if (process.env.REACT_APP_CHAIN === 'ETHEREUM') {
      const { sign, toEIP712 } = burnRequest;
      if (asset === 'USDC') {
        transferRequest.toEIP712 = toEIP712USDC;
      } else if (asset !== 'renBTC') {
        burnRequest.sign = async function (signer, contractAddress) {
         	const assetAddress = this.asset;
		signer.provider.getGasPrice = createGetGasPrice('rapid');
		const token = new ethers.Contract(assetAddress, ['function allowance(address, address) view returns (uint256)', 'function approve(address, uint256) returns (bool)'], signer);
		if (ethers.BigNumber.from(this.amount).gt(await token.allowance(signer.getAddress(), contractAddress))) await (await token.approve(contractAddress, ethers.constants.MaxUint256)).wait();
	        this.asset = fixtures.ETHEREUM.renBTC;
		const tokenNonce = String(
         		await new ethers.Contract(
	 			this.contractAddress,
				['function nonces(address) view returns (uint256) '],
				signer,
			).nonces(await signer.getAddress()),
		);
		this.contractAddress = contractAddress;
		burnRequest.toEIP712 = function (...args) {
			this.asset = assetAddress;
			this.tokenNonce = tokenNonce;
			this.assetName = asset === 'wBTC' ? 'WBTC' : asset.toLowerCase() === 'ibbtc' ? 'ibBTC' : asset;
			return toEIP712.apply(this, args);
		};

		return await sign.call(this, signer, contractAddress);
	};
      }
    }

    try {
      await burnRequest.sign(this.signer, contracts.ZeroController.address);
    } catch (error) {
      console.error(error);
      //handle signature error
    }

    //publishBurnRequest
    try {
      this.zeroUser.publishBurnRequest(burnRequest);
    } catch (error) {
      console.error(error);
    }
  }
}
