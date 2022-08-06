import { storeContext } from "../global";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useContext, useState } from "react";
import { URLS } from "./chains";
import { NETWORK_ROUTER } from "./network";
import { ethers } from "ethers";
import { available_chains } from "./tokenMapping";
import { CHAINS } from "./chains";

export default function wallet_modal() {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(storeContext);
  return {
    get web3Loading() {
      return loading;
    },
    // TODO: Make getweb3 dynamic and allow the app to define what chain we're on
    async getweb3() {
      setLoading(true);
      let web3Modal;
      let provider;
      let web3;
      let providerOptions;
      providerOptions = {
        metamask: {
          id: "injected",
          name: "MetaMask",
          type: "injected",
          check: "isMetaMask",
        },
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            rpc: URLS,
            network: "mainnet",
            qrcodeModalOptions: {
              mobileLinks: [
                "rainbow",
                "metamask",
                "argent",
                "trust",
                "imtoken",
                "pillar",
              ],
            },
          },
        },
      };
      web3Modal = new Web3Modal({
        cacheProvider: true,
        providerOptions,
      });

      provider = await web3Modal.connect();
      provider.on("error", (e) => console.error("WS Error", e));
      provider.on("end", (e) => console.error("WS End", e));
      provider.on("disconnect", (e) => console.log("WS Disconnect: ", e));
      provider.on("connect", (info) => console.log("connecting: ", info));
      provider.on("accountsChanged", (accounts) => {
        dispatch({ type: "UPDATE_WALLET", data: { address: accounts[0] } });
      });
      provider.on("chainChanged", async (chainId) => {
        const baseTenChainId = ethers.BigNumber.from(chainId).toString();
        dispatch({
          type: "UPDATE_WALLET",
          data: {
            network: NETWORK_ROUTER[baseTenChainId],
            chainId: baseTenChainId,
          },
        });
        if (!available_chains.includes(Number(baseTenChainId))) {
          await provider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: CHAINS[1].chainId }],
          });
        }
      });

      web3 = new Web3(provider);
      setLoading(false);
      return web3;
    },
  };
}
