import { PrimaryRoundedButton } from "../../atoms/buttons/button.rounded";
import { useZero } from "../../../api/global/interfaces/interfaces.zero";
import { useEffect, useState } from "react";
import {
  getTransferOutput,
  getFeeBreakdown,
} from "../../../api/hooks/transfer-fees";
import { BridgeFeeInformation } from "./bridge.transfer.feeInformation";
import { checkVaultAmount } from "../../../api/utils/sdk";
import { formatUSDCPricedBTC } from "../../../api/utils/formatters";

export const BridgeTransferSubmit = ({
  action,
  amount,
  token,
  btc_usd,
  renZEC_usd,
  chainId,
  primaryToken,
  oneConfEnabled,
}) => {
  const { keeper } = useZero();
  const [buttonLabel, setButtonLabel] = useState("Input Valid Amount");
  const [active, setActive] = useState(false);
  const [transferOutput, setTransferOutput] = useState();
  const [fees, setFees] = useState({});

  useEffect(async () => {
    if (amount > 0) {
      const output = await getTransferOutput({
        amount,
        token,
        chainId,
        primaryToken,
      });
      const feeAmounts = await getFeeBreakdown({
        amount,
        chainId,
        primaryToken,
      });
      setFees(feeAmounts);
      setTransferOutput(output);
    }
  }, [amount, token, chainId]);

  useEffect(async () => {
    const vaultAmount = await checkVaultAmount();
    setActive(false);
    if (amount <= 0) {
      setButtonLabel("Input Valid Amount");
    } else if (keeper.length > 0) {
      if (transferOutput > 0) {
        if (oneConfEnabled && amount > vaultAmount) {
          setActive(false);
          setButtonLabel("Insufficient Funds for 1 Confirmation.");
        } else {
          setButtonLabel("Transfer Funds");
          setActive(true);
        }
      } else {
        setButtonLabel("Result Must Be More Than Zero");
      }
    } else {
      setButtonLabel("Awaiting Keeper");
    }
  }, [keeper, transferOutput, amount, oneConfEnabled]);

  return (
    <>
      <div className="px-8">
        <PrimaryRoundedButton
          active={false}
          // active={active}
          // label={buttonLabel}
          // action={action}
          label="Temporarily Disabled"
        />
      </div>

      <div
        className={
          "animate-flip-in-hor-top px-6 mt-6 [animation-delay:700ms] w-full " +
          (active ? "" : "hidden")
        }
      >
        <BridgeFeeInformation
          {...fees}
          btc_usd={btc_usd}
          renZEC_usd={renZEC_usd}
          primaryToken={primaryToken}
          type="transfer"
        />
      </div>
    </>
  );
};
