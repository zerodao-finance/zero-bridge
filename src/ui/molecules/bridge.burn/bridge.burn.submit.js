import { PrimaryRoundedButton } from "../../atoms/buttons/button.rounded";
import { useEffect, useState } from "react";
import { getBurnOutput, getFeeBreakdown } from "../../../api/hooks/burn-fees";
import { ethers } from "ethers";
import { BridgeTransferFeeInformation } from "../bridge.transfer/bridge.transfer.feeInformation";

const btcRegex = /^(?:[13]{1}[a-km-zA-HJ-NP-Z1-9]{26,33}|bc1[a-z0-9]{39,59})$/;

export const BridgeBurnSubmit = ({
  action,
  destination,
  amount,
  token,
  btc_usd,
}) => {
  const [buttonLabel, setButtonLabel] = useState(
    "Enter Valid Recipient Address"
  );
  const [active, setActive] = useState(false);
  const [burnOutput, setBurnOutput] = useState();
  const [fees, setFees] = useState({});

  useEffect(async () => {
    if (amount > 0) {
      const output = await getBurnOutput({ amount, token });
      const feeAmounts = await getFeeBreakdown({ amount, token });
      setBurnOutput(output);
      setFees(feeAmounts);
    } else {
      setBurnOutput(0);
    }
  }, [amount, token]);

  useEffect(async () => {
    setActive(false);
    if (destination.match(btcRegex)) {
      if (burnOutput * ethers.utils.formatUnits(btc_usd, 6) > 15) {
        setButtonLabel("Release Funds");
        setActive(true);
      } else {
        setButtonLabel("Result Must Be More Than $15");
      }
    }
  }, [destination, burnOutput]);

  return (
    <div className="px-8 mt-4">
      <PrimaryRoundedButton
        active={false}
        label={"Under Maintenance"}
        action={() => {}}
      />
    </div>
  );

  // return (
  //   <>
  //     <div className="px-8 mt-4">
  //       <PrimaryRoundedButton
  //         active={active}
  //         label={buttonLabel}
  //         action={action}
  //       />
  //     </div>

  //     <div
  //       className={
  //         "animate-flip-in-hor-top px-6 mt-6 [animation-delay:700ms] w-full " +
  //         (active ? "" : "hidden")
  //       }
  //     >
  //       <BridgeTransferFeeInformation {...fees} btc_usd={btc_usd} />
  //     </div>
  //   </>
  // );
};
