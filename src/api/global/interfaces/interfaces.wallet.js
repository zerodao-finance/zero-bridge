import { storeContext } from "../global";
import { useContext, useEffect, useState, useMemo } from "react";
import { ethers } from "ethers";
import wallet_modal from "../../utils/walletModal";
import { NETWORK_ROUTER } from "../../utils/network";
import { CHAINS } from "../../utils/chains";
import _ from "lodash";
import { tokenMapping } from "../../utils/tokenMapping";
import { useBridgeBurnInput } from "./interface.bridge.burn";

export const useWalletConnection = () => {
  const { state, dispatch } = useContext(storeContext);
  const { wallet } = state;
  const { isLoading } = wallet;
  const { web3Loading, getweb3 } = wallet_modal();
  const getSigner = useMemo(async () => {
    try {
      await wallet.provider.send("eth_requestAccounts", []);
      const signer = await wallet.provider.getSigner();
      return signer;
    } catch (err) {
      dispatch({ type: "RESET_REQUEST", effect: "wallet" });
      return new Error("Cannot get Provider | Reconnect Wallet");
    }
  }, [wallet.provider]);

  useEffect(async () => {
    const provider = localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER");
    if (provider) {
      await connect();
    }
  }, []);

  useEffect(() => {
    const call = async () => {
      try {
        // TODO: Make getweb3 dynamic and allow the app to define what chain we're on
        const web3Modal = await getweb3();
        // await web3Modal.currentProvider.sendAsync({
        //   method: "wallet_addEthereumChain",
        //   params: Object.values(CHAINS).reverse(),
        // });
        let chainId = await web3Modal.eth.getChainId();
        await dispatch({
          type: "SUCCEED_BATCH_REQUEST",
          effect: "wallet",
          payload: {
            address: (await web3Modal.eth.getAccounts())[0],
            chainId: chainId,
            network: NETWORK_ROUTER[chainId],
            provider: new ethers.providers.Web3Provider(
              await web3Modal.currentProvider
            ),
          },
        });
        return;
      } catch (err) {
        console.error(err);
        dispatch({ type: "RESET_REQUEST", effect: "wallet" });
      }
    };

    if (isLoading) {
      call();
    }
  }, [isLoading]);

  const connect = async () => {
    dispatch({ type: "START_REQUEST", effect: "wallet" });
  };

  const disconnect = async () => {
    dispatch({ type: "RESET_REQUEST", effect: "wallet" });
    localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
  };

  return { connect, disconnect, wallet, isLoading };
};

export const useCheckWalletConnected = () => {
  const { state, dispatch } = useContext(storeContext);
  const { address } = state.wallet;
  const [walletConnected, toggle] = useState(true);

  useEffect(() => {
    if (!address) {
      toggle(true);
    } else {
      toggle(false);
    }
  }, [address]);

  const getWalletConnectionProps = ({ ...otherProps } = {}) => ({
    wallet: walletConnected,
  });

  return {
    getWalletConnectionProps,
  };
};

export const useWalletBalances = () => {
  // Global Wallet State
  const { state, dispatch } = useContext(storeContext);
  const { provider, address, network } = state.wallet;
  // User Selected Token
  const { getBridgeBurnInputProps } = useBridgeBurnInput();
  const { token } = getBridgeBurnInputProps();
  // Balance States
  const [balances, setBalances] = useState({
    ETH: 0,
    renBTC: 0,
    WBTC: 0,
    ibBTC: 0,
    USDC: 0,
  });

  useEffect(() => {
    // ETH TOKEN BALANCE
    provider.getBalance(address).then((bal) => {
      const balanceInEth = ethers.utils.formatEther(bal);
      setBalances({
        ...balances,
        ETH: parseFloat(balanceInEth),
      });
    });
  }, []);

  useEffect(async () => {
    // OTHER TOKEN BALANCES
    await getBalance(token).then((bal) => {
      setBalances({
        ...balances,
        [token]: parseFloat(bal) || 0,
      });
    });
  }, [token]);

  const balanceOfABI = [
    {
      constant: true,
      inputs: [{ name: "_owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ name: "balance", type: "uint256" }],
      type: "function",
    },
  ];

  async function getBalance(tokenName) {
    if (tokenName.toLowerCase() === "eth") {
      return balances.ETH;
    } else {
      const contract = new ethers.Contract(
        tokenMapping(tokenName),
        balanceOfABI,
        provider
      );
      const balance = await contract.balanceOf(address).toString();
      return balance;
    }
  }

  return {
    balances,
    getBalance,
  };
};
