import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { ethers } from "ethers";

export const BridgeTransferFeeInformation = ({
  gasFee,
  opFee,
  totalFees,
  btc_usd,
}) => {
  const [feeDetailOpen, setFeeDetailOpen] = useState(false);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const getFormattedFiatPrice = (btcAmount) => {
    if (btcAmount) {
      return formatter.format(btcAmount * ethers.utils.formatUnits(btc_usd, 6));
    } else {
      return formatter.format(0);
    }
  };

  return (
    <div className="grid w-full py-4 text-sm px-3 space-y-1 font-semibold border border-badger-gray-500 rounded-lg">
      <div className="flex justify-between">
        <div>
          <div
            className="flex cursor-pointer items-center"
            onClick={() => setFeeDetailOpen(!feeDetailOpen)}
          >
            <span> Protocol Fees </span>
            <span className="w-4 h-4 ml-1">
              {feeDetailOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </span>
          </div>
          <div
            className={
              "grid space-y-0 font-thin text-xs pl-2 " +
              (feeDetailOpen ? "visible" : "invisible hidden")
            }
          >
            <span> 0.15% renVM Mint </span>
            <span> 0.10% feedback to ZERO</span>
          </div>
        </div>
        <div className="grid">
          <span>{opFee} BTC</span>
          <span
            className={
              "italic w-full text-right font-normal text-xs text-badger-yellow-neon-400 " +
              (feeDetailOpen ? "-mt-4" : "-mt-1")
            }
          >
            ~ {getFormattedFiatPrice(opFee)}
          </span>
        </div>
      </div>
      <div className="flex justify-between">
        <span> Est. Gas Cost </span>
        <div className="grid">
          <span>{gasFee} BTC</span>
          <span className="italic w-full text-right font-normal text-xs -mt-1 text-badger-yellow-neon-400">
            ~ {getFormattedFiatPrice(gasFee)}
          </span>
        </div>
      </div>
      <div className="flex pt-4 justify-between">
        <span> Total Est. Fees </span>
        <div className="grid">
          <span>{totalFees} BTC</span>
          <span className="italic w-full text-right font-normal text-xs -mt-1 text-badger-yellow-neon-400">
            ~ {getFormattedFiatPrice(totalFees)}
          </span>
        </div>
      </div>
    </div>
  );
};
