import { useEffect, useState } from "react";
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
  btc_usd,
  eth_usd,
  avax_usd,
  setToken,
  token,
  chainId,
  setQuote,
  quote,
}) => {
  const [isFeeLoading, setIsFeeLoading] = useState(false);
  const [usdcEstimate, setUsdcEstimate] = useState();

  // Fetch fees when the amount changes
  useEffect(async () => {
    if (amount > 0) {
      setIsFeeLoading(true);
      const immediateQuote = await getTransferOutput({
        amount,
        token,
        chainId,
      });
      setQuote(immediateQuote);
      setIsFeeLoading(false);

      let isSubscribed = true;
      const timerId = setInterval(() => {
        console.log("Refresh");
        getTransferOutput({ amount, token, chainId }).then((timerQuote) => {
          isSubscribed ? setQuote(timerQuote) : null;
        });
      }, 15000);
      return () => {
        isSubscribed = false;
        clearInterval(timerId);
      };
    } else {
      setQuote(0);
    }

    return () => clearInterval(timerId);
  }, [amount, token, chainId]);

  useEffect(() => {
    setUsdcEstimate(amount > 0 ? formatConversionOutput() : "$0.00");
  }, [quote, amount]);

  function formatConversionOutput() {
    switch (token) {
      case "USDC":
        return formatUSDC(quote);
      case "ETH":
        return formatUSDCPricedETH(quote, eth_usd);
      case "AVAX":
        return formatUSDCPricedETH(quote, avax_usd);
      default:
        return formatUSDCPricedBTC(quote, btc_usd);
    }
  }

  const removedCoin = [
    chainId == "43114" ? "ETH" : "AVAX",
    chainId !== "1" ? "ibBTC" : "",
  ];

  return (
    <div className="self-center px-0 py-0 w-full">
      <div className="w-full flex items-center justify-between px-4 py-2 mt-5 text-badger-white-400 rounded-xl bg-badger-gray-500">
        <div className="grid">
          <p className="text-xs text-gray-300 whitespace-nowrap">EST. RESULT</p>
          <TokenDropdown
            token={token}
            setToken={setToken}
            tokensRemoved={removedCoin}
            tokensDisabled={["ibBTC", "USDC"]}
          />
        </div>
        <div className="pt-3">
          <DefaultInput
            value={amount > 0 ? quote || 0 : 0}
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
