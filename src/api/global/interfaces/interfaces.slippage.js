import { ethers } from "ethers";
import { storeContext } from "../global";
import { useContext, useCallback } from "react";
import { WETH } from "@uniswap/sdk";
import { tokenAddressTable } from "../global.reducers";

const RENCRV_BY_NETWORK = {
  ETHEREUM: "0x93054188d876f558f4a66B2EF1d97d16eDf0895B",
  ARBITRUM: "0x3E01dD8a5E1fb3481F0F589056b428Fc308AF0Fb",
  MATIC: "0xC2d95EEF97Ec6C17551d45e77B590dc1F9117C67",
};

const RENCRV = RENCRV_BY_NETWORK[process.env.REACT_APP_CHAIN || "ETHEREUM"];

export const useSlippageFetchers = () => {
  const { state } = useContext(storeContext);
  const quoter = new ethers.Contract(
    "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6",
    [
      "function quoteExactInputSingle(address tokenIn, address tokenOut, uint24 fee, uint256 amountIn, uint160 sqrtPriceLimitX96) public view returns (uint256 amountOut)",
      "function quoteExactInput(bytes path, uint256 amountIn) public view returns (uint256 amountOut)",
    ],
    state.wallet.provider
  );

  // direction = true ? renbtc -> wbtc
  const getWbtcQuote = useCallback(
    async (direction, amount) => {
      const rencrv = new ethers.Contract(
        RENCRV,
        ["function get_dy(int128, int128, uint256) view returns (uint256)"],
        state.network.priceFeedContract.provider
      );
      if (rencrv) {
        const path = [0, 1];
        return rencrv.get_dy(
          ...(direction ? path : [...path].reverse()),
          amount
        );
      }
    },
    [state.network.priceFeedContract]
  );

  // direction = true ? usdc -> wbtc : wbtc -> usdc
  const getUsdcWbtcQuote = useCallback(async (direction, amount) => {
    const usdcToWbtc = [
      tokenAddressTable.tokens.USDC.id,
      500,
      WETH["1"].address,
      500,
      tokenAddressTable.tokens.WBTC.id,
    ];
    const path = ethers.utils.solidityPack(
      ["address", "uint24", "address", "uint24", "address"],
      direction ? usdcToWbtc : [...usdcToWbtc].reverse()
    );
    return await quoter.quoteExactInput(path, amount);
  }, []);

  // direction = true ? wbtc -> weth : weth -> wbtc
  const getWbtcWethQuote = useCallback(async (direction, amount) => {
    const wbtcToWeth = [tokenAddressTable.tokens.WBTC.id, WETH["1"].address];
    const path = direction ? wbtcToWeth : [...wbtcToWeth].reverse();
    return await quoter.quoteExactInputSingle(...path, 500, amount, 0);
  }, []);

  return { getUsdcWbtcQuote, getWbtcWethQuote, getWbtcQuote };
};
