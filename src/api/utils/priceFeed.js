import * as UNISWAP from "@uniswap/sdk";
import { ethers } from "ethers";
import { ETHEREUM, MATIC, ARBITRUM } from "zero-protocol/dist/lib/fixtures";
import _ from "lodash";
const tokenRouterTable = {
  get renBTC() {
    return {
      ETHEREUM: new UNISWAP.Token(
        UNISWAP.ChainId.MAINNET,
        ethers.utils.getAddress(ETHEREUM.renBTC),
        8
      ),
      MATIC: new UNISWAP.Token(137, ethers.utils.getAddress(MATIC.renBTC), 8),
      ARBITRUM: new UNISWAP.Token(
        42161,
        ethers.utils.getAddress(ARBITRUM.renBTC),
        8
      ),
    };
  },
  get WBTC() {
    let mainnetAddress = ethers.utils.getAddress(ETHEREUM.WBTC);
    let maticAddress = ethers.utils.getAddress(MATIC.WBTC);
    let arbitrumAddress = ethers.utils.getAddress(ARBITRUM.WBTC);
    return {
      ETHEREUM: new UNISWAP.Token(UNISWAP.ChainId.MAINNET, mainnetAddress, 8),
      MATIC: new UNISWAP.Token(137, maticAddress, 8),
      ARBITRUM: new UNISWAP.Token(42161, arbitrumAddress, 8),
    };
  },
  get ibBTC() {
    return {
      ETHEREUM: new UNISWAP.Token(UNISWAP.ChainId.MAINNET, ETHEREUM.WBTC),
      MATIC: new UNISWAP.Token(137, MATIC.WBTC),
      ARBITRUM: new UNISWAP.Token(42161, ARBITRUM.WBTC),
    };
  },
  get USDC() {
    return {
      ETHEREUM: new UNISWAP.Token(
        UNISWAP.ChainId.MAINNET,
        ethers.utils.getAddress(ETHEREUM.USDC),
        6
      ),
      MATIC: new UNISWAP.Token(137, ethers.utils.getAddress(MATIC.USDC), 6),
      ARBITRUM: new UNISWAP.Token(
        42161,
        ethers.utils.getAddress(ARBITRUM.USDC),
        6
      ),
    };
  },
  get WETH() {
    return {
      ETHEREUM: UNISWAP.WETH[1],
      MATIC: new UNISWAP.Token(
        137,
        ethers.utils.getAddress("0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619"),
        18
      ),
      ARBITRUM: null,
    };
  },
};

// async function findRoute(token, network, provider){network
//     let renBTC = (tokenRouterTable.renBTC)[network]
//     let USDC = (tokenRouterTable.USDC)[network]
//     let renToUSD = await UNISWAP.Fetcher.fetchPairData(renBTC, USDC)
//     try {
//         const pair = await UNISWAP.Fetcher.fetchPairData(token, renBTC)
//         const route = new UNISWAP.Route([pair, renToUSD], token)
//         return route
//     } catch (error) {
//         console.log(error)
//     }
// }

export async function calculateToUSDPrice(token, network, provider) {
  var inputToken;
  let USDC = tokenRouterTable.USDC[network];
  switch (token) {
    case "USDC":
      inputToken = tokenRouterTable["WBTC"][network];
      break;
    case "ibBTC":
      inputToken = tokenRouterTable["renBTC"][network];
      break;
    default:
      inputToken = tokenRouterTable[token][network];
  }
  // let route = await findRoute(inputToken, network, provider)
  // console.log(route)
  const ioPair = await UNISWAP.Fetcher.fetchPairData(inputToken, USDC);
  const route = new UNISWAP.Route([ioPair], inputToken);
  return ethers.utils.parseUnits(route.midPrice.toFixed(6), 6);
}

export class PriceFeed {
  constructor() {}

  /**
   *
   * @param {token, network, decimals} from
   * @param {token, network, decimals} to
   *
   */
  async getPrice(from, to) {
    let a_token = Token.create(from.token, from.network, from.decimals);
    let b_token = Token.create(to.token, to.network, to.decimals);

    try {
      const pair = await UNISWAP.Fetcher.fetchPairData(a_token, b_token);
      const route = new UNISWAP.Route([pair], a_token);
      price = ethers.utils.parseUnits(route.midPrice.toFixed(6), 6);
      return price;
    } catch (error) {
      this.#errorHandler(error, { from, to });
    }
  }

  #errorHandler(error, source) {
    console.log(error, source);
  }
}

export class Token {
  static create(token, network, decimals) {
    return Token(token, network, decimals);
  }

  static getChainID(network) {
    switch (network) {
      case "ETHEREUM":
        return 1;

      case "MATIC":
        return 137;

      case "ARBITRUM":
        return 42161;
    }
  }

  static getAddress(token, network) {
    return fixtures[token][network];
  }

  constructor(token, network, decimals = 8) {
    this.chainID = Token.getChainID(network);
    this.tokenAddress = Token.getAddress(token, network);
    this.token = new UNISWAP.Token(this.chainID, this.tokenAddress, decimals);
  }
}
