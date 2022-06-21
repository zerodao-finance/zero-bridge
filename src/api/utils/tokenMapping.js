import fixtures from "zero-protocol/lib/fixtures";
import { ethers } from "ethers";
const { getAddress, isAddress } = ethers.utils;

export const txCardAmount = ({ amount, tokenName }) => {
  const bigNumAmount = ethers.BigNumber.from(amount);

  switch (tokenName ? tokenName.toLowerCase() : "") {
    case "eth":
      return ethers.utils.formatEther(bigNumAmount);
    case "avax":
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
    case "avax":
      return ethers.constants.AddressZero;
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
  const checksummedAddress = isAddress(tokenAddress)
    ? getAddress(String(tokenAddress))
    : "";

  const fixture_array = [
    fixtures.ETHEREUM,
    fixtures.ARBITRUM,
    fixtures.AVALANCHE,
  ];
  var tokenName = null;

  fixture_array.forEach((fixture) => {
    if (checksummedAddress == ethers.constants.AddressZero) {
      tokenName = "ETH";
    } else if (checksummedAddress == getAddress(fixture.renBTC)) {
      tokenName = "renBTC";
    } else if (checksummedAddress == getAddress(fixture.WBTC)) {
      tokenName = "WBTC";
    } else if (checksummedAddress == getAddress(fixture.USDC)) {
      tokenName = "USDC";
    }
  });

  return tokenName || "unknown";
};
