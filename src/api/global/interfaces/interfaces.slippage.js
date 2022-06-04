import { ethers } from "ethers";
import { storeContext } from "../global";
import { useContext, useCallback } from "react";
import { tokenMapping } from "../../utils/tokenMapping";

export const renCrvByNetwork = (chainId) => {
  switch (chainId) {
    case "42161":
      return "0x3E01dD8a5E1fb3481F0F589056b428Fc308AF0Fb";
    case "137":
      return "0xC2d95EEF97Ec6C17551d45e77B590dc1F9117C67";
    default: // ETHEREUM - 1
      return "0x93054188d876f558f4a66B2EF1d97d16eDf0895B";
  }
};

export const WETHByNetwork = (chainId) => {
  switch (chainId) {
    case "42161":
      return "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1";
    case "137":
      return "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270";
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

  // direction = true ? renbtc -> wbtc
  const getWbtcQuote = useCallback(
    async (direction, amount) => {
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
