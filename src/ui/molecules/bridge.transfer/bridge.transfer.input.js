import { useEffect, useState } from "react";
import { DefaultInput } from "../../atoms/inputs/input.default";
import { ethers } from "ethers";
import TokenDropdown from "../../atoms/dropdowns/dropdown.tokens";
import useTransferPrices from "../../../api/hooks/transfer-prices";

export const BridgeTransferInput = ({
  amount,
  effect,
  btc_usd,
  setToken,
  token,
}) => {
  // How to use 'TokenDropdown' component
  // Create 'useState' variables and pass it to 'TokenDropdown'
  // (props are 'token' and 'setToken' where 'token' is a string of the token symbol)

  // Additional Props: 'tokensRemoved' which is an array of tokens you do not want in dropdown
  // Default Dropdown Items: ETH, WBTC, ibBTC, renBTC, USDC

  const { getRenBtcEthPair } = useTransferPrices();

  const [calculateWith, setCalculateWith] = useState(1);
  const [calculateLoading, setCalculateLoading] = useState(false);

  useEffect(async () => {
    setCalculateLoading(true);
    if (token.toLowerCase() === "eth") {
      const pair = await getRenBtcEthPair();
      setCalculateWith(pair);
    } else if (token.toLowerCase() === "usdc") {
      if (btc_usd) {
        const btcPrice = ethers.utils.formatUnits(btc_usd, 6);
        setCalculateWith(1 / btcPrice);
      }
    } else {
      setCalculateWith(1);
    }
    setCalculateLoading(false);
  }, [token]);

  const calculateAmount = () =>
    amount == 0 ? amount : (amount / calculateWith).toFixed(6);

  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className="self-center px-0 py-0 w-full">
      <div className="w-100 flex items-center justify-between gap-5 dark:bg-badger-gray-500 bg-gray-100 px-2 rounded-2xl min-h-[74px]">
        <div className="flex items-center pl-2 max-w-[100%]">
          <p className="text-xs text-gray-300 whitespace-nowrap">TO</p>
          <TokenDropdown
            token={token}
            setToken={setToken}
            tokensDisabled={["ibBTC"]}
          />
        </div>
        <DefaultInput
          value={calculateAmount()}
          onChange={effect}
          loading={calculateLoading}
          disabled
          maxW="150px"
        />
      </div>
      <div className=" xl:mr-5 italic tracking-wider w-full text-right text-xs text-badger-yellow-neon-400">
        {btc_usd &&
          formatter.format(amount * ethers.utils.formatUnits(btc_usd, 6))}
      </div>
    </div>
  );
};
