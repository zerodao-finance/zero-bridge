import { ethers } from "ethers";
import { storeContext } from "../global";
import { useContext, useCallback } from "react";
import { tokenMapping } from "../../utils/tokenMapping";
import {
  Fetcher,
  ChainId,
  WAVAX,
  Trade,
  Token,
  Route,
  TokenAmount,
  TradeType,
} from "@traderjoe-xyz/sdk";

export const renCrvByNetwork = (chainId) => {
  switch (chainId) {
    case "42161":
      return "0x3E01dD8a5E1fb3481F0F589056b428Fc308AF0Fb";
    case "137":
      return "0xC2d95EEF97Ec6C17551d45e77B590dc1F9117C67";
    case "43114":
      return "0x16a7DA911A4DD1d83F3fF066fE28F3C792C50d90";
    default: // ETHEREUM - 1
      return "0x93054188d876f558f4a66B2EF1d97d16eDf0895B";
  }
};

const WBTC_E = new Token(
  ChainId.AVALANCHE,
  "0x50b7545627a5162F82A992c33b87aDc75187B218",
  8
);

export const WETHByNetwork = (chainId) => {
  switch (chainId) {
    case "42161":
      return "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1";
    case "137":
      return "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270";
    case "43114":
      return "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB";
    default: // ETHEREUM MAINNET - 1
      return "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  }
};

export const useSlippageFetchers = () => {
  const { state } = useContext(storeContext);
  const { chainId } = state.wallet;
  const RENCRV = renCrvByNetwork(state.wallet.chainId);
  const quoter = new ethers.Contract(
    "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6", // same address on all chains
    [
      "function quoteExactInputSingle(address tokenIn, address tokenOut, uint24 fee, uint256 amountIn, uint160 sqrtPriceLimitX96) public view returns (uint256 amountOut)",
      "function quoteExactInput(bytes path, uint256 amountIn) public view returns (uint256 amountOut)",
    ],
    state.wallet.provider
  );

  const getWbtcQuoteAVAX = async (direction, amount) => {
    const rencrv = new ethers.Contract(
      RENCRV,
      [
        "function get_dy_underlying(int128, int128, uint256) view returns (uint256)",
      ],
      state.wallet.provider
    );
    const path = [1, 0];
    return await rencrv.get_dy_underlying(
      ...(direction ? path : [...path].reverse()),
      amount
    );
  };

  // direction = true ? renbtc -> wbtc
  const getWbtcQuote = useCallback(
    async (direction, amount) => {
      if (state.wallet.chainId == "43114")
        return await getWbtcQuoteAVAX(direction, amount);
      if (state.wallet.chainId == "42161") {
        direction = !direction;
      }
      const rencrv = new ethers.Contract(
        RENCRV,
        ["function get_dy(int128, int128, uint256) view returns (uint256)"],
        state.wallet.provider
      );
      if (rencrv) {
        const path = [0, 1];
        return rencrv.get_dy(
          ...(direction ? path : [...path].reverse()),
          amount
        );
      }
    },
    [state.wallet.provider, state.wallet.chainId]
  );

  const createContract = useCallback(
    (address, abi) => {
      return new ethers.Contract(address, abi, state.wallet.provider);
    },
    [state.wallet.provider]
  );

  // direction ? renbtc -> avax : avax -> renbtc
  const getAVAXQuote = async (direction, amount) => {
    const pair = await Fetcher.fetchPairData(
      WBTC_E,
      WAVAX[ChainId.AVALANCHE],
      state.wallet.provider
    );
    if (direction) {
      const wbtcAmount = await getWbtcQuoteAVAX(true, amount);
      const route = new Route([pair], WBTC_E);
      const trade = new Trade(
        route,
        new TokenAmount(WBTC_E, wbtcAmount),
        TradeType.EXACT_INPUT
      );
      return trade.executionPrice.adjusted();
    } else {
      const route = new Route([pair], WAVAX[ChainId.AVALANCHE]);
      const trade = new Trade(
        route,
        new TokenAmount(WAVAX[ChainId.AVALANCHE], amount),
        TradeType.EXACT_INPUT
      );
      return await getWbtcQuoteAVAX(false, trade.executionPrice.adjusted());
    }
  };

  // direction = true ? usdc -> renbtc
  const getUsdcQuoteAVAX = async (direction, amount) => {
    //amount = renBTC amount

    const rencrv = createContract(RENCRV, [
      "function get_dy(int128, int128, uint256) view returns (uint256)",
    ]);
    const aTricrypto = createContract(
      "0xB755B949C126C04e0348DD881a5cF55d424742B2",
      ["function get_dy(uint256, uint256, uint256) view returns (uint256)"]
    );

    const crvUSD = createContract(
      "0x7f90122BF0700F9E7e1F688fe926940E8839F353",
      [
        "function calc_token_amount(uint256[3] calldata, bool) view returns (uint256)",
      ],
      [
        "function calc_withdraw_one_coin(uint256, int128) view returns (uint256)",
      ]
    );
    //0 = wbtc, 1 = renbtc
    const renCrvPath = [0, 1];
    //0 = av3usd, 1 = wbtc
    const path = [0, 1];
    if (direction) {
      const av3usdAmount = await crvUSD.calc_token_amount([0, amount, 0], true);
      const wbtcAmount = await aTricrypto.get_dy(...path, av3usdAmount);
      return await rencrv.get_dy(...renCrvPath, wbtcAmount);
    } else {
      const wbtcAmount = await rencrv.get_dy(
        ...[...renCrvPath].reverse(),
        amount
      );
      const av3usdAmount = await aTricrypto.get_dy(
        ...[...path].reverse(),
        wbtcAmount
      );
      return await crvUSD.calc_withdraw_one_coin(av3usdAmount, 1);
    }
  };
  // direction = true ? usdc -> wbtc : wbtc -> usdc
  const getUsdcWbtcQuote = useCallback(
    async (direction, amount) => {
      if (state.wallet.chainId == "42161") {
        direction = !direction;
      }
      const usdcToWbtc = [
        tokenMapping({ tokenName: "usdc", chainId }),
        500,
        WETHByNetwork(chainId),
        500,
        tokenMapping({ tokenName: "wbtc", chainId }),
      ];
      const path = ethers.utils.solidityPack(
        ["address", "uint24", "address", "uint24", "address"],
        direction ? usdcToWbtc : [...usdcToWbtc].reverse()
      );
      return await quoter.quoteExactInput(path, amount);
    },
    [state.wallet.chainId]
  );

  // direction = true ? wbtc -> weth : weth -> wbtc
  const getWbtcWethQuote = useCallback(
    async (direction, amount) => {
      const wbtcToWeth = [
        tokenMapping({ tokenName: "wbtc", chainId }),
        WETHByNetwork(chainId),
      ];
      const path = direction ? wbtcToWeth : [...wbtcToWeth].reverse();
      return await quoter.quoteExactInputSingle(...path, 500, amount, 0);
    },
    [state.wallet.chainId]
  );

  return { getUsdcWbtcQuote, getWbtcWethQuote, getWbtcQuote };
};
