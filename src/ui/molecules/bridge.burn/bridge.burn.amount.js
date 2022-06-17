import { useContext } from "react";
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

export const BridgeBurnInput = ({
  destination,
  amount,
  setToken,
  token,
  updateDestination,
  effect,
  btc_usd,
  eth_usd,
  avax_usd,
  chainId,
  quote,
  setQuote,
}) => {
  const { dispatch } = useContext(storeContext);
  const { balances } = useWalletBalances();

  const formattedAmount = () => {
    switch (token) {
      case "USDC":
        return formatUSDC(amount);
      case "ETH":
        return formatUSDCPricedETH(amount, eth_usd);
      case "AVAX":
        return formatUSDCPricedETH(amount, avax_usd);
      default:
        return formatUSDCPricedBTC(amount, btc_usd);
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

  const removedCoin = chainId == "43114" ? "ETH" : "AVAX";

  return (
    <>
      <div className="self-center px-0 py-0 z-10">
        <div className=" xl:mr-5 tracking-wider pr-2 w-full flex justify-end text-xs text-badger-yellow-neon-400">
          <span>Your Balance: {getBalance(token) + " " + token}</span>
        </div>
        <div className="w-fit flex items-center justify-between gap-2 dark:bg-badger-gray-500 bg-gray-100 px-2 py-1 rounded-2xl">
          <div>
            <p className="text-xs text-secondary-400 whitespace-nowrap mt-1">
              FROM
            </p>
            <TokenDropdown
              token={token}
              setToken={setToken}
              tokensRemoved={["BTC", removedCoin]}
              tokensDisabled={["ibBTC"]}
            />
          </div>
          <div className="flex justify-between items-center pl-2 dark:!border-white dark:focus:!border-badger-yellow-400 border !border-gray-600 focus:!border-badger-yellow-400 rounded-xl">
            <button
              className="text-sm pl-1 pr-3 h-fit hover:!text-badger-yellow-neon-400"
              onClick={getMax}
            >
              MAX
            </button>
            <DefaultInput value={amount} onChange={effect} withBorder={false} />
          </div>
        </div>
        <div className=" xl:mr-5 tracking-wider w-full flex justify-end pr-2 text-xs text-badger-yellow-neon-400">
          <span className="italic">~ {formattedAmount()}</span>
        </div>
        {amount > 0 && (
          <>
            <div className="w-full grid justify-items-center">
              <ArrowDownIcon className="h-6 w-6 text-badger-yellow-400" />
            </div>
            <BridgeBurnTransferFee
              {...{ amount, token, btc_usd, chainId, quote, setQuote }}
            />
          </>
        )}

        <div className="w-full py-1 mt-10 items-center justify-between gap-2 dark:bg-badger-gray-500 bg-gray-100 px-2 rounded-2xl">
          <div>
            <p className="text-xs text-gray-300 whitespace-nowrap mt-1">
              RECIPIENT BTC ADDRESS
            </p>
          </div>
          <DefaultInput
            value={destination}
            onChange={updateDestination}
            type="text"
            placeholder="Paste BTC address here"
          />
        </div>
      </div>
    </>
  );
};
