import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { getTransferOutput } from "../../../api/hooks/transfer-fees";

export const BridgeTransferFee = ({
  amount,
  effect,
  btc_usd,
  eth_usd,
  setToken,
  token,
}) => {
  // Getting Fees - START
  const [isFeeLoading, setIsFeeLoading] = useState(false);
  const [fee, setFee] = useState();
  useEffect(async () => {
    if (amount > 0) {
      setIsFeeLoading(true);
      const output = await getTransferOutput({ amount, token });
      setFee(output);
      setIsFeeLoading(false);
    }
  }, [amount, token]);
  // Getting Fees - END

  useEffect(() => {
    if (fee) {
      setFee(null);
    }
  }, [token]);

  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  function formatConversionOutput() {
    const formattedFee = fee && fee != "" ? fee : "0";
    console.log("Formatted FEE: " + formattedFee);

    switch (token) {
      case "USDC":
        return formattedFee;
      case "ETH":
        return ethers.utils.formatUnits(
          ethers.utils.parseEther(formattedFee).mul(eth_usd),
          24
        );
      default:
        return ethers.utils.formatUnits(
          ethers.utils.parseUnits(formattedFee, 8).mul(btc_usd),
          14
        );
    }
  }

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
                {fee || 0} {token}
              </span>
            </div>
          </div>
          <div className=" xl:mr-5 italic tracking-wider w-full text-right text-xs text-badger-yellow-neon-400">
            ~ {formatter.format(formatConversionOutput())}
          </div>
        </div>
      )}
    </>
  );
};
