import fixtures from "zero-protocol/lib/fixtures";

export function tokenMapping(name) {
  switch (name.toLowerCase()) {
    case "renbtc":
      return fixtures.ETHEREUM.renBTC;
    case "wbtc":
      return fixtures.ETHEREUM.WBTC;
    case "ibbtc":
      return fixtures.ETHEREUM.ibBTC;
    case "usdc":
      return fixtures.ETHEREUM.USDC;
  }
}
