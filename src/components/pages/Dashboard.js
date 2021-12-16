import {
  WalletProviderContext,
  KeeperContext,
} from "../../context/WalletContext";
import wallet_model from "../../WalletModal";
import Contract from "web3-eth-contract";
import { ethers } from 'ethers';
import { useEffect, useState } from "react";
import ConversionTool from "../organisms/ConversionTool";
import Transactions from "../organisms/Transactions";
import {
  TransferRequest,
  createZeroConnection,
  createZeroKeeper,
  createZeroUser,
} from "zero-protocol/dist/lib/zero.js";

import Button from "../atoms/Buttons";
import AppBar from "../organisms/AppBar";

const chainData = [
  {
    chainId: "0xA4B1",
    chainName: "Arbitrum",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://arb1.arbitrum.io/rpc"],
    blockExplorerUrls: ["https://arbiscan.io/"],
  },
];

const curveArbitrum = "0x960ea3e3C7FB317332d990873d354E18d7645590"; // Swap wBTC for wETH (indeces to swap are 1 -> 2 in pool.coins)
const curveABI = [
  {
    stateMutability: "view",
    type: "function",
    name: "get_dy",
    inputs: [
      { name: "i", type: "uint256" },
      { name: "j", type: "uint256" },
      { name: "dx", type: "uint256" },
    ],
    outputs: [{ name: "", type: "uint256" }],
    gas: 3122,
  },
];

const SIGNALING_MULTIADDR =
  "/dns4/lourdehaufen.dynv6.net/tcp/443/wss/p2p-webrtc-star/";
const TEST_KEEPER_ADDRESS =
  process.env.REACT_APP_TEST_KEEPER_ADDRESS ||
  "0x12fBc372dc2f433392CC6caB29CFBcD5082EF494";

const initializeTestEnvironment = async (zUser) => {
  window.keeper = createZeroKeeper(
    await createZeroConnection(SIGNALING_MULTIADDR)
  );
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.REACT_APP_JSONRPC || "http://localhost:8545"
  );
  await provider.send("hardhat_impersonateAccount", [TEST_KEEPER_ADDRESS]);
  window.keeperSigner = provider.getSigner(TEST_KEEPER_ADDRESS);
  zUser.subscribeKeepers = function () {
    if (!zUser.keepers.includes(TEST_KEEPER_ADDRESS)) {
      setTimeout(function () {
        zUser.keepers.push(TEST_KEEPER_ADDRESS);
        zUser.emit("keeper", TEST_KEEPER_ADDRESS);
      }, 500);
    }
  };
  zUser.publishTransactionRequest = (transferRequest) => {
    setTimeout(() => {
      (async () => {
        try {
          await window.keeper._txDispatcher(
            JSON.parse(JSON.stringify(transferRequest))
          );
        } catch (e) {
          console.error(e);
        }
      })();
    }, 3000);
  };
  window.keeper.setTxDispatcher = function (fn) {
    this._txDispatcher = fn;
  };
  window.keeper.setTxDispatcher(async (transferRequest) => {
    const trivial = new TrivialUnderwriterTransferRequest(transferRequest);
    await trivial.loan(window.keeperSigner);
  });
};

const Dashboard = () => {
  var [connected, setConnection] = useState(false);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [user, setUser] = useState(null);
  // TODO - Create keeper context
  const [keepers, setKeepers] = useState([]);

  const { web3Loading, getweb3 } = wallet_model();

  async function connectWallet() {
    await getweb3().then(async (response) => {
      setWeb3(response);
      const chainId = await response.eth.getChainId();
      if (chainId !== chainData.chainId) {
        await response.currentProvider.sendAsync({
          method: "wallet_addEthereumChain",
          params: chainData,
        });
      }

      Contract.setProvider(response);
      const curveContract = new Contract(curveABI, curveArbitrum);
      setContract(curveContract);
      setConnection(true);
    });
  }

  // - sets ZeroDao User Connection
  const initializeConnection = async () => {
    const connection = await createZeroConnection(
      "/dns4/lourdehaufen.dynv6.net/tcp/443/wss/p2p-webrtc-star/"
    );
    const zUser = createZeroUser(connection); // new LocalStoragePersistenceAdapter());
    if (!process.env.REACT_APP_TEST) {
      await zUser.conn.start();
    } else {
      await initializeTestEnvironment(zUser);
    }
    await zUser.subscribeKeepers();
    window.user = window.user || zUser;
    setUser(zUser);
    return zUser;
  };

  // use effect for initializing zero user connection
  useEffect(async () => {
    await initializeConnection();
  }, []);

  // set keeper state from zero user
  useEffect(async () => {
    const listener = (keeper) => {
      setKeepers(user.keepers.slice());
    };
    if (user) user.on("keeper", listener);
    return () => user && user.removeListener("keeper", listener);
  }, [user]);

  function checkConnected() {
    console.log(user);
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Install A Wallet Provider");
      setConnection(false);
      return;
    }

    ethereum.request({ method: "eth_accounts" }).then((account) => {
      if (account.length == 0) setConnection(false);
      else setConnection(true);
    });

    setConnection(ethereum.isConnected());
  }

  useEffect(() => {
    checkConnected();
  }, []);

  return (
    <KeeperContext.Provider value={keepers}>
      <WalletProviderContext.Provider
        value={{ connect: connectWallet, connected: connected }}
      >
        {/* <Button action={wallet.account ? null : connectWallet} text={wallet.account ? "Connected" : "Connect Wallet"} variant={wallet.account ? "valid" : "outlined"}/> */}
        <div className="h-screen fixed bg-gradient-to-tl from-white via-slate-50 to-neutral-50">
          <AppBar />
          <div className="flex flex-col h-full items-center justify-center">
            <div className="grow"></div>
            <ConversionTool />
            <Transactions />
          </div>
        </div>
      </WalletProviderContext.Provider>
    </KeeperContext.Provider>
  );
};

export default Dashboard;
