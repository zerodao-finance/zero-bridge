import fixtures from "zero-protocol/lib/fixtures";
import { ethers } from "ethers";
const { getAddress } = ethers.utils;

export const txCardAmount = ({ amount, tokenName }) => {
  const bigNumAmount = ethers.BigNumber.from(amount);

  switch (tokenName.toLowerCase()) {
    case "eth":
      return ethers.utils.formatEther(bigNumAmount);
    case "usdc":
      return ethers.utils.formatUnits(bigNumAmount, 6);
    default:
      return ethers.utils.formatUnits(bigNumAmount, 8);
  }
};

export const selectFixture = (chainId) => {
  switch (chainId) {
    case "42161":
      return fixtures.ARBITRUM;
    case "43114":
      return fixtures.AVALANCHE;
    case "137":
      return fixtures.MATIC;
    default:
      return fixtures.ETHEREUM;
  }
};

export const tokenMapping = ({ tokenName, chainId }) => {
  const fixture = selectFixture(chainId);

  switch (tokenName.toLowerCase()) {
    case "eth":
      return ethers.constants.AddressZero;
    case "renbtc":
      return fixture.renBTC;
    case "wbtc":
      return fixture.WBTC;
    case "ibbtc":
      return fixture.ibBTC;
    case "usdc":
      return fixture.USDC;
  }
};

export const reverseTokenMapping = ({ tokenAddress }) => {
  const checksummedAddress = tokenAddress
    ? getAddress(String(tokenAddress))
    : "";

  switch (checksummedAddress) {
    case ethers.constants.AddressZero:
      return "ETH";
    case getAddress(fixtures.ETHEREUM.renBTC):
      return "renBTC";
    case getAddress(fixtures.ARBITRUM.renBTC):
      return "renBTC";
    case getAddress(fixtures.ETHEREUM.WBTC):
      return "WBTC";
    case getAddress(fixtures.ARBITRUM.WBTC):
      return "WBTC";
    case getAddress(fixtures.ETHEREUM.ibBTC):
      return "ibBTC";
    case getAddress(fixtures.ARBITRUM.ibBTC):
      return "ibBTC";
    case getAddress(fixtures.ETHEREUM.USDC):
      return "USDC";
    case getAddress(fixtures.ARBITRUM.USDC):
      return "USDC";
    default:
      return "unknown";
  }
};
