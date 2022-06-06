import { ethers } from "ethers";

const ETH = {
  name: "Ether",
  symbol: "ETH",
  decimals: 18,
};

const MATIC = {
  name: "Matic",
  symbol: "MATIC",
  decimals: 18,
};

export const getChainName = (chainId) => {
  switch (chainId) {
    case "42161":
      return "Arbitrum";
    default:
      return "Mainnet";
  }
};

export const getExplorerRoot = (chainId) => {
  switch (chainId) {
    case "42161":
      return "https://arbiscan.io/address/";
    default:
      return "https://etherscan.io/address/";
  }
};

const hexChainIdFromChain = (name) => {
  switch (name.toLowerCase()) {
    case "arbitrum":
      return "42161";
    case "matic":
      return "137";
    default:
      return "42161";
  }
};

export const CHAINS = {
  1: {
    chainId: ethers.utils.hexValue(1),
    chainName: "mainnet",
    nativeCurrency: ETH,
    rpcUrls: [
      process.env.REACT_APP_JSONRPC
        ? process.env.REACT_APP_JSONRPC
        : "https://main-light.eth.linkpool.io",
    ].filter((url) => url !== undefined),
    blockExplorerUrls: ["https://etherscan.io"],
  },
  42161: {
    chainId: ethers.utils.hexValue(42161),
    chainName: "Arbitrum",
    nativeCurrency: ETH,
    rpcUrls: [
      process.env.infuraKey
        ? `https://arbitrum-mainnet.infura.io/v3/${process.env.infuraKey}`
        : undefined,
      "https://arb1.arbitrum.io/rpc",
    ].filter((url) => url !== undefined),
    blockExplorerUrls: ["https://arbiscan.io"],
  },
  137: {
    chainId: ethers.utils.hexValue(137),
    chainName: "Polygon",
    nativeCurrency: MATIC,
    rpcUrls: [
      process.env.infuraKey
        ? `https://polygon-mainnet.infura.io/v3/${process.env.infuraKey}`
        : undefined,
      "https://polygon-rpc.com",
    ].filter((url) => url !== undefined),
    blockExplorerUrls: ["https://polygonscan.com"],
  },
};

export const URLS = Object.keys(CHAINS).reduce((accumulator, chainId) => {
  const validUrls = CHAINS[Number(chainId)].rpcUrls;

  if (validUrls.length) {
    accumulator[chainId] = validUrls;
  }

  return accumulator;
}, {});
