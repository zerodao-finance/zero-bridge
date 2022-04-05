// import {getContract} from './contracts'
// import {NETWORK_ROUTER} from './networks'
import { mapValues } from "lodash";
import { ethers } from "ethers";
import deployments from "zero-protocol/deployments/deployments.json";

console.log(deployments);

export const test = {
  TEST_KEEPER_ADDRESS: "0x4A423AB37d70c00e8faA375fEcC4577e3b376aCa",
  SIGNALING_MULTIADDR:
    "/dns4/lourdehaufen.dynv6.net/tcp/443/wss/p2p-webrtc-star/",
};

// export const controller = getContract("ZeroController")

export const deployments__old = {
  matic: {
    ZeroController: require("zero-protocol/deployments/matic/ZeroController"),
    DelegateUnderwriter: require("zero-protocol/deployments/matic/DelegateUnderwriter"),
    Convert: require("zero-protocol/deployments/matic/PolygonConvert"),
    BTCVault: require("zero-protocol/deployments/matic/BTCVault"),
  },
  arbitrum: {
    ZeroController: require("zero-protocol/deployments/arbitrum/ZeroController"),
    DelegateUnderwriter: require("zero-protocol/deployments/arbitrum/DelegateUnderwriter"),
    Convert: require("zero-protocol/deployments/arbitrum/ArbitrumConvert"),
    BTCVault: require("zero-protocol/deployments/arbitrum/BTCVault"),
    ArbitrumConvertQuick: require("zero-protocol/deployments/arbitrum/ArbitrumConvertQuick"),
  },
};
const contracts = [
  "ZeroController",
  "DelegateUnderwriter",
  "Convert",
  "BTCVault",
  "ArbitrumConvertQuick",
];

export const chainIdToNetworkName = (chainId) => {
  if (process.env.REACT_APP_TEST) return "localhost";
  return {
    [42161]: ["arbitrum", undefined, undefined],
    [137]: ["matic", undefined, ["ArbitrumConvertQuick"]],
    [1]: [
      "mainnet",
      [{ BadgerBridgeZeroController: "ZeroController" }],
      undefined,
    ],
  }[chainId];
};

export const deploymentsFromSigner = async (signer) => {
  const { chainId } = await signer.provider.getNetwork();
  //old logic
  //return mapValues(deployments[chainIdToNetworkName(chainId)], (v) => new ethers.Contract(v.address, v.abi, signer));
  const [name, contractsToInclude, contractsToExclude] =
    chainIdToNetworkName(chainId);
  return (
    contractsToInclude
      ? contractsToInclude
      : contracts.filter((d) => !contractsToExclude.includes(d))
  ).reduce((contracts, _contract) => {
    const [[contractName], [deployName]] =
      typeof _contract == "string"
        ? [[_contract], [_contract]]
        : Object.entries(_contract);
    const contract = deployments[chainId][name][deployName];
    return {
      ...contracts,
      [contractName]: new ethers.Contract(
        contract.address,
        contract.abi,
        signer
      ),
    };
  }, {});
};

const deploymentsFromChain =
  deployments[process.env.REACT_APP_CHAINID][
    chainIdToNetworkName(process.env.REACT_APP_CHAINID)
  ];
export { deploymentsFromChain as deployments };
