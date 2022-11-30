import { Fragment, useEffect, useState } from "react";
import { DefaultInput } from "../../atoms";
import { formatUSDCPricedBTC } from "../../../api/utils/formatters";
import PrimaryTokenDropdown from "../../atoms/dropdowns/dropdown.primary.tokens";
import { CheckboxInput } from "../../atoms/inputs/input.checkbox";
import { checkVaultAmount } from "../../../api/utils/sdk";
import { Transition } from "@headlessui/react";

function BridgeTransferFrom({
  amount,
  effect,
  btc_usd,
  renZEC_usd,
  primaryToken,
  setPrimaryToken,
  chainId,
  oneConfEnabled,
  setOneConfEnabled,
  token,
}) {
  const canEnableOneConf =
    ["USDC", "renBTC", "WBTC", "ETH"].includes(token) && primaryToken === "BTC"
      ? true
      : false;

  const [vaultBalance, setVaultBalance] = useState(0);

  useEffect(() => {
    if (canEnableOneConf && !oneConfEnabled) setOneConfEnabled(true);
    else if (!canEnableOneConf && oneConfEnabled) setOneConfEnabled(false);
  }, [token]);

  useEffect(() => {
    if (chainId != "1") {
      setPrimaryToken("BTC");
    }
  }, [chainId]);

  useEffect(async () => {
    setVaultBalance(await checkVaultAmount());
  }, [oneConfEnabled]);

  return (
    <>
      <div className="self-center px-0 py-0 w-full">
        <div className="min-h-[16px] mt-2">
          <Transition
            as={Fragment}
            enter="transition ease-out duration-75"
            enterFrom="transform opacity-0"
            enterTo="transform opacity-100"
            leave="transition duration-75"
            leaveFrom="transform opacity-100"
            leaveTo="transform opacity-0"
            show={oneConfEnabled}
          >
            <div
              className={`xl:mr-5 tracking-wider pr-2 w-full flex justify-end text-xs text-zero-neon-green-500 ${
                Number(vaultBalance) === 0 ? "animate-pulse" : ""
              }`}
            >
              <span>Vault Balance: {vaultBalance} renBTC</span>
            </div>
          </Transition>
        </div>
        <div className="w-full flex items-center justify-between px-4 py-2 text-badger-white-400 rounded-xl bg-badger-gray-500">
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
        <div className={`px-2 w-full flex justify-between items-center mt-1`}>
          <CheckboxInput
            label="Enable 1 Confirmation Transfer"
            checked={oneConfEnabled}
            onClick={setOneConfEnabled}
            disabled={!canEnableOneConf}
          />
          <div className="italic tracking-wider text-xs text-zero-neon-green-500">
            ~{" "}
            {formatUSDCPricedBTC(
              amount,
              primaryToken == "BTC" ? btc_usd : renZEC_usd
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default BridgeTransferFrom;
