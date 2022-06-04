import { getChainName } from "../api/utils/chains";

describe("getChainName function", () => {
  test("it should return Arbitrum for 42161", () => {
    expect(getChainName("42161")).toEqual("Arbitrum");
  });

  test("it should return Mainnet for 1", () => {
    expect(getChainName("1")).toEqual("Mainnet");
  });

  test("it should return Mainnet for null", () => {
    expect(getChainName(null)).toEqual("Mainnet");
  });
});
