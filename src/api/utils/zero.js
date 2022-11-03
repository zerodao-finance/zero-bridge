import { ethers } from "ethers";
import { DEPLOYMENTS } from "@zerodao/sdk";

export const test = {
  TEST_KEEPER_ADDRESS: "0xb0BDFaa09cef1eCDA684ad5FF28fC01c68143aaa",
  SIGNALING_MULTIADDR: "/dns4/devp2p.zerodao.com/tcp/443/wss/p2p-webrtc-star/",
};

// export const controller = getContract("ZeroController")

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
