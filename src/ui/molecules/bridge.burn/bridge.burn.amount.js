import { useContext, useEffect } from "react";
import { storeContext } from "../../../api/global";
import { DefaultInput } from "../../atoms/inputs/input.default";
import { ArrowDownIcon } from "@heroicons/react/solid";
import TokenDropdown from "../../atoms/dropdowns/dropdown.tokens";
import { BridgeBurnTransferFee } from "./bridge.burn.fee";
import { useWalletBalances } from "../../../api/global/interfaces/interfaces.wallet";
import {
  formatUSDCPricedBTC,
  formatUSDCPricedETH,
  formatUSDC,
} from "../../../api/utils/formatters";
import CameraScan from "../../atoms/helpers/camera-scan";
import { selectRemovedTokens } from "../../../api/utils/tokenMapping";
import PrimaryTokenDropdown from "../../atoms/dropdowns/dropdown.primary.tokens";

export const BridgeBurnInput = ({
  destination,
  amount,
  setToken,
  token,
  updateDestination,
  updateAmount,
  setAmount,
  btc_usd,
  eth_usd,
  renZEC_usd,
  avax_usd,
  matic_usd,
  chainId,
  quote,
  setQuote,
  primaryToken,
  setPrimaryToken,
}) => {
  const { dispatch } = useContext(storeContext);
  const { balances } = useWalletBalances();

  useEffect(() => {
    setAmount(0);
  }, [token]);

  useEffect(() => {
    setToken(primaryToken == "ZEC" ? "renZEC" : "renBTC");
  }, [primaryToken]);

  const formattedAmount = () => {
    try {
      switch (token) {
        case "USDC":
          return formatUSDC(amount);
        case "USDC.e":
          return formatUSDC(amount);
        case "USDT":
          return formatUSDC(amount);
        case "ETH":
          return formatUSDCPricedETH(amount, eth_usd);
        case "AVAX":
          return formatUSDCPricedETH(amount, avax_usd);
        case "MATIC":
          return formatUSDCPricedETH(amount, matic_usd);
        case "renZEC":
          return formatUSDCPricedBTC(amount, renZEC_usd);
        default:
          return formatUSDCPricedBTC(amount, btc_usd);
      }
    } catch (e) {
      setAmount(0);
      console.error(e);
    }
  };

  const getBalance = (token) => {
    return balances[token] || 0;
  };

  const getMax = () => {
    dispatch({
      type: "UPDATE",
      module: "burn",
      effect: "input",
      data: { amount: getBalance(token) },
    });
  };

  return (
    <>
      <div className="self-center px-0 py-0">
        <div className=" xl:mr-5 tracking-wider pr-2 w-full flex justify-end text-xs text-zero-neon-green-500">
          <span>Your Balance: {getBalance(token) + " " + token}</span>
        </div>
        <div className="w-fit grid items-center bg-badger-gray-500 px-2 py-1 rounded-2xl">
          <div>
            <p className="text-xs text-secondary-400 whitespace-nowrap mt-1">
              FROM
            </p>
          </div>
          <div className="flex items-center mb-2">
            <TokenDropdown
              token={token}
              setToken={setToken}
              tokensRemoved={selectRemovedTokens({ primaryToken, chainId })}
              tokensDisabled={[""]}
              primaryToken={primaryToken}
            />
            <div className="flex justify-between items-center pl-2 dark:!border-white dark:focus:!border-zero-green-500 border !border-gray-600 focus:!border-zero-green-500 rounded-xl">
              <button
                className="text-sm pl-1 pr-3 h-fit hover:!text-zero-neon-green-500"
                onClick={getMax}
              >
                MAX
              </button>
              <DefaultInput
                value={amount}
                onChange={updateAmount}
                withBorder={false}
              />
            </div>
          </div>
        </div>
        <div className=" xl:mr-5 tracking-wider w-full flex justify-end pr-2 text-xs text-zero-neon-green-500">
          <span className="italic">~ {formattedAmount()}</span>
        </div>
        {amount > 0 && (
          <>
            <div className="w-full grid justify-items-center">
              <ArrowDownIcon className="h-6 w-6 text-zero-neon-green-500" />
            </div>
            <BridgeBurnTransferFee
              {...{
                amount,
                token,
                btc_usd,
                renZEC_usd,
                chainId,
                quote,
                setQuote,
                primaryToken,
              }}
            />
          </>
        )}

        <div className="w-full py-1 mt-10 items-center justify-between gap-2 dark:bg-badger-gray-500 bg-gray-100 px-2 rounded-2xl">
          <div className="flex items-center">
            <p className="text-xs text-gray-300 whitespace-nowrap mt-1">
              RECIPIENT ADDRESS TYPE
            </p>
            <PrimaryTokenDropdown
              primaryToken={primaryToken}
              setPrimaryToken={setPrimaryToken}
              tokensRemoved={chainId == "1" ? [] : ["ZEC"]}
              tokensDisabled={[]}
            />
          </div>

          <div className="flex justify-between w-full">
            <CameraScan onScan={updateDestination} />
            <DefaultInput
              value={destination}
              onChange={updateDestination}
              type="text"
              placeholder={"Paste " + primaryToken + " address here"}
            />
          </div>
        </div>
      </div>
    </>
  );
};
