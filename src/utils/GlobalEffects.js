import { useContext, useEffect } from "react";
import {
  ContractContext,
  Web3Context,
  ConversionToolContext,
} from "../context/Context";
import { ethers } from "ethers";
import {
  TransferRequest,
  TrivialUnderwriterTransferRequest,
  createZeroConnection,
  createZeroKeeper,
  createZeroUser,
} from "zero-protocol/dist/lib/zero.js";

import _ from "lodash"

import {enableGlobalMockRuntime, createMockKeeper} from "zero-protocol/dist/lib/mock.js"

import { EventEmitter } from "events";
import tools from "./_utils";
import { _BridgeMonitor } from '../core/instance'

const GlobalEffectWrapper = ({ children }) => {
  /**
   * Context Declerations
   */
  let value = useContext(Web3Context); // web3 context
  let c_value = useContext(ConversionToolContext); // conversion tool context
  let a_value = useContext(ContractContext); //arbitrum context


  /**
   * Effect Functions
   */
  function checkConnected() {
    if (value.web3) {
      value.set.setConnection(true);
    } else {
      value.set.setConnection(false);
    }
  }

  const ln = (v) => (console.log(ethers.utils.formatEther(v)), v);
  const updateAmounts = async () => {
    c_value.set.setrenBTC(
      ethers.utils.formatUnits(
        ln(
          ethers.utils
            .parseEther("1")
            .sub(
              ethers.BigNumber.from(String(c_value.get.ratio)).mul(
                ethers.utils.parseEther("0.01")
              )
            )
        )
          .mul(ethers.utils.parseUnits(String(c_value.get.value), 8))
          .div(ethers.utils.parseEther("1")),
        8
      )
    );
    c_value.set.setETH(
      ethers.utils.formatEther(
        ethers.BigNumber.from(String(c_value.get.ratio))
          .mul(ethers.utils.parseEther("0.01"))
          .mul(
            ethers.utils
              .parseUnits(String(c_value.get.value), 8)
              .mul(c_value.get.ETHPrice)
          )
          .div(ethers.utils.parseEther("1", 18))
          .div(ethers.utils.parseUnits("1", 8))
      )
    );
  };






  const initializeTestEnvironment = async (zUser) => {
    window.keeper = createZeroKeeper(
      await createZeroConnection(tools.SIGNALING_MULTIADDR)
    );
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.REACT_APP_JSONRPC || "http://localhost:8545"
    );
    await provider.send("hardhat_impersonateAccount", [
      tools.TEST_KEEPER_ADDRESS,
    ]);
    window.keeperSigner = provider.getSigner(tools.TEST_KEEPER_ADDRESS);
    zUser.subscribeKeepers = function () {
      if (!zUser.keepers.includes(tools.TEST_KEEPER_ADDRESS)) {
        setTimeout(function () {
          zUser.keepers.push(tools.TEST_KEEPER_ADDRESS);
          zUser.emit("keeper", tools.TEST_KEEPER_ADDRESS);
        }, 500);
      }
    };

    TransferRequest.prototype.submitToRenVM = function (flag) {
      const confirmed = new EventEmitter();
      const gatewayAddress = '39WeCoGbNNk5gVNPx9j4mSrw3tvf1WfRz7';
      let _signed;
      confirmed.on("deposit", (count) => {
        if (count === target) _signed = true;
      });
      const target = 6;
      const timeout = (n) => new Promise((resolve) => setTimeout(resolve, n));
      setTimeout(async () => {
        confirmed.emit("target", target);
        confirmed.emit("deposit", 0);
        for (let i = 1; i <= 6; i++) {
          await timeout(2000);
          confirmed.emit("deposit", i, target);
        }
      }, 100);
      const txHash = ethers.utils.randomBytes(32).toString("base64");
      const mint = new EventEmitter();
      const deposit = {
        async txHash() {
          return txHash;
        },
        async confirmed() {
          return confirmed;
        },
        async signed() {
          const ee = new EventEmitter();
          setTimeout(async () => {
            const result = await new Promise((resolve) => {
              if (_signed) return resolve("signed");
              confirmed.on("deposit", (count) => {
                if (count === target) resolve("signed");
              });
            });
            ee.emit("status", result);
          }, 100);
          return ee;
        },
      };
      setTimeout(() => {
        mint.emit("deposit", deposit);
      }, 50);
      mint.gatewayAddress = gatewayAddress;
      return mint;
    };


    zUser.publishTransferRequest = (transferRequest) => {
      setTimeout(() => {
        (async () => {
          try {
            await window.keeper._txDispatcher(transferRequest);
          } catch (e) {
            console.error(e);
          }
        })();
      }, 3000);
    };

    window.keeper.setTxDispatcher = async function (fn) {
      this._txDispatcher = fn;
    };

    window.keeper.setTxDispatcher(async (transferRequest) => {
      const trivial = new TrivialUnderwriterTransferRequest(transferRequest);
      try {
        const loan_result = await trivial.dry(window.keeperSigner)
        console.log("Loan Result", loan_result)

      } catch (err) {
        console.log("ERROR", err)
      }
      const mint = trivial.submitToRenVM(true)

      await new Promise((resolve, reject) => mint.on('deposit', async deposit => {
        await resolve()
        const hash = await deposit.txHash()
        console.log("hash", hash)
        console.log(await deposit)
        let confirmed = await deposit
          .confirmed()
        
        // Monitor._transact(confirmed)

        confirmed
          .on('target', (target) => {
            console.log(`0/${target} confirmations`)
          })
          .on('deposit', async (confs, target) => {
            console.log(`${confs}/${target} confirmations`)
            if (confs == 6){
              await new Promise((resolve, reject) => {
                setTimeout(resolve, 3000);
              });
              // Monitor._update("successful")
              // Monitor._resolve()
              c_value.set.setAddress('')
            }  
          })
          let status = await deposit.signed()
          status.on('status', (status) => console.log("status", status))
        
      }))

      trivial.waitForSignature = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return {
          amount: ethers.BigNumber.from(trivial.amount)
          .sub(ethers.utils.parseUnits("0.0015", 8))
          .toString(),
          nHash: ethers.utils.hexlify(ethers.utils.randomBytes(32)),
          signature: ethers.utils.hexlify(ethers.utils.randomBytes(65)),
        };
      };
      
      
      const loanTx = await trivial.loan(window.keeperSigner);
      console.log(await loanTx.wait())
      await new Promise((resolve, reject) => {
        setTimeout(resolve, 3000);
      });
      const tx = await trivial.repay(window.keeperSigner);
      console.log(await tx.wait())
    });
  };

  


  /**
   * Initialize Connection to Arbitrum Backend
   * @returns Zero UserObject
   */
  const initializeConnection = async () => {
    if (a_value.get.zUser) return
    const zeroUser = createZeroUser(await createZeroConnection('/dns4/lourdehaufen.dynv6.net/tcp/443/wss/p2p-webrtc-star/'));
    if (process.env.REACT_APP_TEST) {
      // await createMockKeeper()
      // await enableGlobalMockRuntime()
    }
    await zeroUser.conn.start();
    await zeroUser.subscribeKeepers();
    console.log(zeroUser)
    window.user = window.user || zeroUser;
    a_value.set.setUser(zeroUser);
    _BridgeMonitor.zeroUser = zeroUser
    return zeroUser;
  };

  /**
   * Effects
   */


  useEffect(() => {
    checkConnected();
  }, [window]);

  

  useEffect(updateAmounts, [
    c_value.get.value,
    c_value.get.ETHPrice,
    c_value.get.ratio,
  ]);

  useEffect(async () => {
    await initializeConnection();
  }, []);

  useEffect(async () => {
    const listener = (keeper) => {
      console.log(keeper)
      a_value.set.setKeepers([...a_value.get.keepers, keeper]);
    };
    if (a_value.get.zUser) a_value.get.zUser.on("keeper", listener);
    return () =>
      a_value.get.zUser && a_value.get.zUser.removeListener("keeper", listener);
  }, [a_value.get.zUser]);

  /** 
   * Sets Eth price on block change 
   */
  useEffect(async () => {
    const listener = async () => {
      try {
        c_value.set.setETHPrice(
          (
            await tools.contract.get_dy(1, 2, ethers.utils.parseUnits("1", 8))
          ).toString()
        );
      } catch (e) {
        console.error(e, "Error setting ETH price");
      }
    };
    var invoke = _.throttle(listener, 2000)
    tools.contract.provider.on("block", invoke);
    return () => {
      tools.contract.provder.removeListener("block", invoke)
      invoke.cancel()
    }
  }, []);


  useEffect(() => {
    if (localStorage.getItem("screenMode") === "dark") {
      document.documentElement.classList.add("dark")

    }
  }, [])


  

/**
 *
 */


  return <>{children}</>;
};

export default GlobalEffectWrapper;
