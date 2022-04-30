import { storeContext } from "../global";
import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import _ from "lodash";

export const usePriceFeedContracts = () => {
  const { state, dispatch } = useContext(storeContext);
  const { network } = state;
  const {
    wallet: { address },
  } = state;

  const getUniswapBtcUsdPrice = async () => {
    const response = await fetch(
      "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
              {
                pools(where:{id:"0x99ac8ca7087fa4a2a1fb6357269965a2014abc35"}) {
                  token1Price
                }
              }
            `,
          variables: {},
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const tokenPrice = parseFloat(data.data.pools[0].token1Price);
    return ethers.utils.parseUnits(tokenPrice.toFixed(6), 6).toString();
  };

  const getUniswapBtcETHPrice = async () => {
    const response = await fetch(
      "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
              {
                pools(where:{id:"0xcbcdf9626bc03e24f779434178a73a0b4bad62ed"}) {
                  token1Price
                }
              }
            `,
          variables: {},
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const tokenPrice = parseFloat(data.data.pools[0].token1Price);
    return ethers.utils.parseEther(tokenPrice.toFixed(18)).toString();
  };

  const getUniswapUsdcETHPrice = async () => {
    const response = await fetch(
      "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
              {
                pools(where:{id:"0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8"}) {
                  token0Price
                }
              }
            `,
          variables: {},
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const tokenPrice = parseFloat(data.data.pools[0].token0Price);
    return ethers.utils.parseUnits(tokenPrice.toFixed(6), 6).toString();
  };

  useEffect(() => {
    Promise.allSettled([
      getUniswapBtcETHPrice(),
      getUniswapBtcUsdPrice(),
      getUniswapUsdcETHPrice(),
    ]).then(async (result) => {
      dispatch({
        type: "UPDATE",
        module: "priceFeeds",
        effect: "data",
        data: {
          btc_usd: result[1].value,
          eth_usd: result[2].value,
          btc_eth: result[0].value,
        },
      });
    });
  }, [address, network]);
};
