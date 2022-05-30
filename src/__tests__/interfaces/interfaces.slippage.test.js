import {
  renCrvByNetwork,
  WETHByNetwork,
} from "../../api/global/interfaces/interfaces.slippage";

describe("renCrvByNetwork Function", () => {
  test("returns correct address for ARBITRUM", () => {
    expect(renCrvByNetwork("42161")).toEqual(
      "0x3E01dD8a5E1fb3481F0F589056b428Fc308AF0Fb"
    );
  });

  test("returns correct address for MAINNET", () => {
    expect(renCrvByNetwork("1")).toEqual(
      "0x93054188d876f558f4a66B2EF1d97d16eDf0895B"
    );
  });

  test("returns correct address for MATIC", () => {
    expect(renCrvByNetwork("137")).toEqual(
      "0xC2d95EEF97Ec6C17551d45e77B590dc1F9117C67"
    );
  });
});

describe("WETHByNetwork Function", () => {
  test("returns correct address for ARBITRUM", () => {
    expect(WETHByNetwork("42161")).toEqual(
      "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1"
    );
  });

  test("returns correct address for MATIC", () => {
    expect(WETHByNetwork("137")).toEqual(
      "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270"
    );
  });

  test("returns correct address for MAINNET", () => {
    expect(WETHByNetwork("1")).toEqual(
      "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
    );
  });
});
