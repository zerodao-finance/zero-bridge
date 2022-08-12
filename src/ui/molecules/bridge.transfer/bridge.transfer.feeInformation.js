import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { formatUSDCPricedBTC } from "../../../api/utils/formatters";

export const BridgeFeeInformation = ({
  gasFee,
  opFee,
  totalFees,
  renVmBtcNetworkFee,
  btc_usd,
  renZEC_usd,
  type,
  primaryToken,
}) => {
  const [feeDetailOpen, setFeeDetailOpen] = useState(false);

  const pickUsdcPrice = () => {
    switch (primaryToken) {
      case "ZEC":
        return renZEC_usd;
      default:
        return btc_usd;
    }
  };

  const flatFeeDiv = () => {
    const BTCNetworkFee = renVmBtcNetworkFee || "0.002";

    return (
      <div className="flex justify-between">
        <span> RenVM {primaryToken} Network Fee </span>
        <div className="grid">
          <span>
            ~{BTCNetworkFee} {primaryToken}
          </span>
          <span className="italic w-full text-right font-normal text-xs -mt-1 text-zero-neon-green-500">
            ~ {formatUSDCPricedBTC(BTCNetworkFee, pickUsdcPrice())}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="grid w-full py-4 text-sm px-3 space-y-1 font-semibold border text-badger-white-400 border-badger-gray-500 rounded-lg">
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
            <span> {type == "transfer" ? "0.002" : "0.001"}% renVM Mint </span>
            <span>
              {" "}
              {type == "transfer" ? "0.002" : "0.003"}% feedback to ZERO
            </span>
          </div>
        </div>
        <div className="grid">
          <span>
            {opFee} {primaryToken}
          </span>
          <span
            className={
              "italic w-full text-right font-normal text-xs text-zero-neon-green-500 " +
              (feeDetailOpen ? "-mt-4" : "-mt-1")
            }
          >
            ~ {formatUSDCPricedBTC(opFee, pickUsdcPrice())}
          </span>
        </div>
      </div>
      <div className="flex justify-between">
        <span> Est. Gas Cost </span>
        <div className="grid">
          <span>
            {gasFee} {primaryToken}
          </span>
          <span className="italic w-full text-right font-normal text-xs -mt-1 text-zero-neon-green-500">
            ~ {formatUSDCPricedBTC(gasFee, pickUsdcPrice())}
          </span>
        </div>
      </div>
      {flatFeeDiv()}
      <div className="flex pt-4 justify-between">
        <span> Total Est. Fees </span>
        <div className="grid">
          <span>
            {totalFees} {primaryToken}
          </span>
          <span className="italic w-full text-right font-normal text-xs -mt-1 text-zero-neon-green-500">
            ~ {formatUSDCPricedBTC(totalFees, pickUsdcPrice())}
          </span>
        </div>
      </div>
    </div>
  );
};
