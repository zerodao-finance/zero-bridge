import { useEffect, useState } from "react";
import { getBurnOutput } from "../../../api/hooks/burn-fees";
import { formatUSDCPricedBTC } from "../../../api/utils/formatters";

export const BridgeBurnTransferFee = ({
  amount,
  btc_usd,
  token,
  chainId,
  quote,
  setQuote,
}) => {
  const [isFeeLoading, setIsFeeLoading] = useState(false);
  useEffect(async () => {
    if (amount > 0) {
      setIsFeeLoading(true);
      const output = await getBurnOutput({ amount, token, chainId });
      setQuote(output);
      setIsFeeLoading(false);
    }
  }, [amount, token]);

  return (
    <>
      {amount > 0 && (
        <div className="self-center px-0 py-0 w-full">
          <div className="w-full shadow-inner flex justify-between px-4 py-2 mt-5 text-badger-white-400 rounded-xl dark:bg-badger-gray-500 bg-gray-100">
            <div className="flex items-center max-w-[100%]">
              <p className="text-xs text-gray-300 whitespace-nowrap">
                EST. RESULT
              </p>
            </div>
            <div>
              <span className={`${isFeeLoading && "animate-pulse"}`}>
                {quote || 0} BTC
              </span>
            </div>
          </div>
          <div className="xl:mr-5 italic tracking-wider w-full pr-2 text-right text-xs text-zero-green-500">
            ~ {formatUSDCPricedBTC(fee, btc_usd)}
          </div>
        </div>
      )}
    </>
  );
};
