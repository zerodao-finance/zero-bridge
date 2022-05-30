import fixtures from "zero-protocol/lib/fixtures";

export const selectFixture = (chainId) => {
  switch (chainId) {
    case "42161":
      return fixtures.ARBITRUM;
    default:
      return fixtures.ETHEREUM;
  }
};

export const tokenMapping = ({ tokenName, chainId }) => {
  const fixture = selectFixture(chainId);

  switch (tokenName.toLowerCase()) {
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
