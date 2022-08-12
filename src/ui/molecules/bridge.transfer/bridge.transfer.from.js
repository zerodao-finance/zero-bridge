import { useEffect } from "react";
import { DefaultInput } from "../../atoms";
import { formatUSDCPricedBTC } from "../../../api/utils/formatters";
import PrimaryTokenDropdown from "../../atoms/dropdowns/dropdown.primary.tokens";

function BridgeTransferFrom({
  amount,
  effect,
  btc_usd,
  renZEC_usd,
  primaryToken,
  setPrimaryToken,
  chainId,
}) {
  useEffect(() => {
    if (chainId != "1") {
      setPrimaryToken("BTC");
    }
  }, [chainId]);

  return (
    <>
      <div className="self-center px-0 py-0 w-full">
        <div className="w-full flex items-center justify-between px-4 py-2 mt-5 text-badger-white-400 rounded-xl bg-badger-gray-500">
          <div className="grid">
            <p className="text-xs text-gray-300 whitespace-nowrap">FROM</p>
            <PrimaryTokenDropdown
              primaryToken={primaryToken}
              setPrimaryToken={setPrimaryToken}
              tokensRemoved={chainId == "1" ? [] : ["ZEC"]}
              tokensDisabled={[]}
            />
          </div>
          <div className="pt-3">
            <DefaultInput value={amount} onChange={effect} maxW="150px" />
          </div>
        </div>
        <div className=" xl:mr-5 italic tracking-wider w-full text-right text-xs text-zero-neon-green-500">
          ~{" "}
          {formatUSDCPricedBTC(
            amount,
            primaryToken == "BTC" ? btc_usd : renZEC_usd
          )}
        </div>
      </div>
    </>
  );
}

export default BridgeTransferFrom;
