import fixtures from "zero-protocol/lib/fixtures";
import { ethers } from "ethers";

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
