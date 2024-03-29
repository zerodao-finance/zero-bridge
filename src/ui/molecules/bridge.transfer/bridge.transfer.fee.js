import { useEffect, useState } from "react";
import { getTransferOutput } from "../../../api/hooks/transfer-fees";
import TokenDropdown from "../../atoms/dropdowns/dropdown.tokens";
import { DefaultInput } from "../../atoms";
import { selectRemovedTokens } from "../../../api/utils/tokenMapping";
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
  matic_usd,
  renZEC_usd,
  setToken,
  token,
  chainId,
  setQuote,
  quote,
  primaryToken,
}) => {
  const [isFeeLoading, setIsFeeLoading] = useState(false);
  const [usdcEstimate, setUsdcEstimate] = useState();

  // Fetch fees when the amount changes
  useEffect(() => {
    if (amount > 0) {
      setIsFeeLoading(true);
      getTransferOutput({ amount, token, chainId, primaryToken }).then(
        (immediateQuote) => {
          setQuote(immediateQuote);
        }
      );
      setIsFeeLoading(false);

      let isSubscribed = true;
      const timerId = setInterval(() => {
        getTransferOutput({ amount, token, chainId, primaryToken }).then(
          (timerQuote) => {
            isSubscribed ? setQuote(timerQuote) : null;
          }
        );
      }, 15000);
      return () => {
        isSubscribed = false;
        clearInterval(timerId);
      };
    } else {
      setQuote(0);
    }
  }, [amount, token, chainId]);

  useEffect(() => {
    setUsdcEstimate(amount > 0 ? formatConversionOutput() : "$0.00");
  }, [quote, amount]);

  useEffect(() => {
    setToken(primaryToken == "ZEC" ? "renZEC" : "renBTC");
  }, [primaryToken]);

  function formatConversionOutput() {
    switch (token) {
      case "USDC":
        return formatUSDC(quote);
      case "USDC.e":
        return formatUSDC(quote);
      case "USDT":
        return formatUSDC(quote);
      case "ETH":
        return formatUSDCPricedETH(quote, eth_usd);
      case "AVAX":
        return formatUSDCPricedETH(quote, avax_usd);
      case "MATIC":
        return formatUSDCPricedETH(quote, matic_usd);
      case "renZEC":
        return formatUSDCPricedBTC(quote, renZEC_usd);
      default:
        return formatUSDCPricedBTC(quote, btc_usd);
    }
  }

  return (
    <div className="self-center px-0 py-0 w-full">
      <div className="w-full flex items-center justify-between px-4 py-2 mt-5 text-badger-white-400 rounded-xl bg-badger-gray-500">
        <div className="grid">
          <p className="text-xs text-gray-300 whitespace-nowrap">EST. RESULT</p>
          <TokenDropdown
            token={"ETH"}
            setToken={setToken}
            tokensRemoved={selectRemovedTokens({ primaryToken, chainId })}
            tokensDisabled={[""]}
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
      <div className="mt-1 pr-2 italic tracking-wider w-full text-right text-xs text-zero-neon-green-500">
        ~ {usdcEstimate}
      </div>
    </div>
  );
};
