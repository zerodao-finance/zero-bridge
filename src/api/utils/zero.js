import { ethers } from "ethers";
import { DEPLOYMENTS } from "@zerodao/sdk";

export const CONNECTIONS = process.env.REACT_APP_TEST
  ? {
      KEEPER: "QmXXKMKno6KXdtTWYkUe3AGXCMEKRnNhFcvPkA2a4roj9Y",
      KEEPER_ADDRESS: "0xb0BDFaa09cef1eCDA684ad5FF28fC01c68143aaa",
      SIGNALING_MULTIADDR:
        "/dns4/devp2p.zerodao.com/tcp/443/wss/p2p-webrtc-star/",
    }
  : {
      KEEPER: "QmNzPmnp9qJia5XwzFteBcZW1BYhcZuCsXVgg8qVp7eovV",
      KEEPER_ADDRESS: "0xec5D65739C722A46cd79951E069753c2FC879B27",
      SIGNALING_MULTIADDR: "/dns4/p2p.zerodao.com/tcp/443/wss/p2p-webrtc-star/",
    };

const contracts = [
  "ZeroController",
  "DelegateUnderwriter",
  "Convert",
  "BTCVault",
  "ArbitrumConvertQuick",
];

export const chainIdToNetworkName = (chainId) => {
  return {
    [10]: [
      "optimism",
      [
        { BadgerBridgeZeroController: "ZeroController" },
        { BadgerBridgeZeroController: "DelegateUnderwriter" },
      ],
      [],
    ],
    [42161]: [
      "arbitrum",
      [
        { BadgerBridgeZeroController: "ZeroController" },
        { BadgerBridgeZeroController: "DelegateUnderwriter" },
      ],
      [],
    ],
    [43114]: [
      "avalanche",
      [
        { BadgerBridgeZeroController: "ZeroController" },
        { BadgerBridgeZeroController: "DelegateUnderwriter" },
      ],
      [],
    ],
    [137]: [
      "matic",
      [
        { BadgerBridgeZeroController: "ZeroController" },
        { BadgerBridgeZeroController: "DelegateUnderwriter" },
      ],
      [],
    ],
    [1]: [
      "mainnet",
      [
        { BadgerBridgeZeroController: "ZeroController" },
        { BadgerBridgeZeroController: "DelegateUnderwriter" },
      ],
      [],
    ],
  }[chainId];
};

export const deploymentsFromSigner = async (signer) => {
  const { chainId } = await signer.provider.getNetwork();
  let [name, contractsToInclude, contractsToExclude] =
    chainIdToNetworkName(chainId);

  const contractsToSearch = contractsToInclude
    ? contractsToInclude
    : contracts.filter((d) => !contractsToExclude.includes(d));

  return contractsToSearch.reduce((contracts, _contract) => {
    const [deployName, contractName] =
      typeof _contract == "string"
        ? [_contract, _contract]
        : [Object.keys(_contract)[0], Object.values(_contract)[0]];
    const contract = DEPLOYMENTS[chainId][name].contracts[deployName];
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
