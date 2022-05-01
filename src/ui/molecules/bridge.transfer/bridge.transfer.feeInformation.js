import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";

export const BridgeTransferFeeInformation = ({
  gasFee,
  mintFee,
  totalFees,
  token,
}) => {
  const [feeDetailOpen, setFeeDetailOpen] = useState(false);

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
            <span> 0.25% feedback to ZERO</span>
          </div>
        </div>
        <div className="grid">
          <span> 0 {token} </span>
          <span
            className={
              "italic w-full text-right text-[10px] text-badger-yellow-neon-400 " +
              (feeDetailOpen ? "-mt-4" : "-mt-1")
            }
          >
            {" "}
            ~ $1.00{" "}
          </span>
        </div>
      </div>
      <div className="flex justify-between">
        <span> Est. Gas Cost </span>
        <div className="grid">
          <span> 0 {token} </span>
          <span className="italic w-full text-right text-[10px] -mt-1 text-badger-yellow-neon-400">
            {" "}
            ~ $1.00{" "}
          </span>
        </div>
      </div>
      <div className="flex pt-4 justify-between">
        <span> Total Est. Fees </span>
        <div className="grid">
          <span> 0 {token} </span>
          <span className="italic w-full text-right text-[10px] -mt-1 text-badger-yellow-neon-400">
            {" "}
            ~ $1.00{" "}
          </span>
        </div>
      </div>
    </div>
  );
};
