import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { getTransferOutput } from "../../../api/hooks/transfer-fees";
import TokenDropdown from "../../atoms/dropdowns/dropdown.tokens";
import { DefaultInput } from "../../atoms";
import {
  formatUSDCPricedBTC,
  formatUSDCPricedETH,
  formatUSDC,
} from "../../../api/utils/formatters";

export const BridgeTransferFee = ({
  amount,
  effect,
  btc_usd,
  eth_usd,
  setToken,
  token,
}) => {
  const [isFeeLoading, setIsFeeLoading] = useState(false);
  const [fee, setFee] = useState();
  const [usdcEstimate, setUsdcEstimate] = useState();

  // Fetch fees when the amount changes
  useEffect(async () => {
    if (amount > 0) {
      setIsFeeLoading(true);
      const output = await getTransferOutput({ amount, token });
      setFee(output);
      setIsFeeLoading(false);
      return;
    }
    setFee(null);
  }, [amount, token]);

  useEffect(() => {
    setUsdcEstimate(formatConversionOutput());
  }, [fee]);

  function formatConversionOutput() {
    switch (token) {
      case "USDC":
        return formatUSDC(fee);
      case "ETH":
        return formatUSDCPricedETH(fee, eth_usd);
      default:
        return formatUSDCPricedBTC(fee, btc_usd);
    }
  }

  return (
    <div className="self-center px-0 py-0 w-full">
      <div className="w-full flex items-center justify-between px-4 py-2 mt-5 text-badger-white-400 rounded-xl bg-badger-gray-500">
        <div className="grid">
          <p className="text-xs text-gray-300 whitespace-nowrap">EST. RESULT</p>
          <TokenDropdown
            token={token}
            setToken={setToken}
            tokensDisabled={["ibBTC", "USDC"]}
          />
        </div>
        <div className="pt-3">
          <DefaultInput
            value={fee || 0}
            onChange={() => {}}
            loading={isFeeLoading}
            disabled
            maxW="150px"
          />
        </div>
      </div>
      <div className=" xl:mr-5 italic tracking-wider w-full text-right text-xs text-badger-yellow-neon-400">
        ~ {usdcEstimate}
      </div>
    </div>
  );
};
