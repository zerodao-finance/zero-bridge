import { ChainId, Token, WETH, Fetcher, Route } from "@uniswap/sdk";

function useTransferPrices() {
  async function getRenBtcEthPair() {
    const renBTC = new Token(
      ChainId.MAINNET,
      "0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D", // renBTC Address
      18
    );

    const pair = await Fetcher.fetchPairData(renBTC, WETH[renBTC.chainId]);
    const route = new Route([pair], WETH[renBTC.chainId]);
    const price = (route.midPrice.toSignificant(6) * Math.pow(10, 10)).toFixed(
      4
    );
    return price; // TODO: Set store prices in here
  }

  return {
    getRenBtcEthPair,
  };
}

export default useTransferPrices;
