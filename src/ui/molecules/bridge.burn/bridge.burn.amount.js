import { useContext } from "react";
import { storeContext } from "../../../api/global";
import { DefaultInput } from "../../atoms/inputs/input.default";
import { ArrowDownIcon } from "@heroicons/react/solid";
import { ethers } from "ethers";
import TokenDropdown from "../../atoms/dropdowns/dropdown.tokens";
import { BridgeBurnTransferFee } from "./bridge.burn.fee";
import { useWalletBalances } from "../../../api/global/interfaces/interfaces.wallet";

export const BridgeBurnInput = ({
  destination,
  amount,
  setToken,
  token,
  updateDestination,
  effect,
  btc_usd,
  eth_usd,
}) => {
  const { dispatch } = useContext(storeContext);
  const { balances } = useWalletBalances();
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const formattedAmount = () => {
    switch (token) {
      case "USDC":
        return formatter.format(amount);
      case "ETH":
        return formatter.format(amount * ethers.utils.formatUnits(eth_usd, 6));
      default:
        return formatter.format(amount * ethers.utils.formatUnits(btc_usd, 6));
    }
  };

  const getBalance = (token) => {
    return balances[token]?.toString() ?? 0;
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
      <div className="self-center px-0 py-0 z-10">
        <div className=" xl:mr-5 tracking-wider pr-2 w-full flex justify-end text-[10px] text-badger-yellow-neon-400">
          <span>Your Balance: {getBalance(token) + " " + token}</span>
        </div>
        <div className="w-fit flex items-center justify-between gap-2 dark:bg-badger-gray-500 bg-gray-100 px-2 py-1 rounded-2xl">
          <div>
            <p className="text-[10px] text-gray-300 whitespace-nowrap mt-1">
              FROM
            </p>
            <TokenDropdown
              token={token}
              setToken={setToken}
              tokensRemoved={["BTC"]}
            />
          </div>
          <div className="flex justify-between items-center pl-2 dark:!border-white dark:focus:!border-badger-yellow-neon-400 border !border-gray-600 focus:!border-badger-yellow-neon-400 rounded-xl">
            <button
              className="text-sm pl-1 pr-3 h-fit hover:!text-badger-yellow-neon-400"
              onClick={getMax}
            >
              MAX
            </button>
            <DefaultInput value={amount} onChange={effect} withBorder={false} />
          </div>
        </div>
        <div className=" xl:mr-5 tracking-wider w-full flex justify-end pr-2 text-[10px] text-badger-yellow-neon-400">
          <span className="italic">~ {btc_usd && formattedAmount()}</span>
        </div>
        {amount > 0 && (
          <>
            <div className="w-full grid justify-items-center">
              <ArrowDownIcon className="h-6 w-6 text-badger-yellow-400" />
            </div>
            <BridgeBurnTransferFee
              {...{ amount: amount, token: token, btc_usd: btc_usd }}
            />
          </>
        )}

        <div className="w-full py-1 mt-10 items-center justify-between gap-2 dark:bg-badger-gray-500 bg-gray-100 px-2 rounded-2xl">
          <div>
            <p className="text-[10px] text-gray-300 whitespace-nowrap mt-1">
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
