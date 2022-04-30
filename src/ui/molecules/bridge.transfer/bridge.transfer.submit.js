import { PrimaryRoundedButton } from "../../atoms/buttons/button.rounded";
import { useZero } from "../../../api/global/interfaces/interfaces.zero";
import { useEffect, useState } from "react";
import useTransferFees from "../../../api/hooks/transfer-fees";
import { BridgeTransferFeeInformation } from "./bridge.transfer.feeInformation";

export const BridgeTransferSubmit = ({ action, amount, token }) => {
  const { keeper } = useZero();
  const { getTransferOutput } = useTransferFees();
  const [buttonLabel, setButtonLabel] = useState("Input Valid Amount");
  const [active, setActive] = useState(false);
  const [transferOutput, setTransferOutput] = useState();

  useEffect(async () => {
    if (amount > 0) {
      const output = await getTransferOutput({ amount, token });
      setTransferOutput(output);
    }
  }, [amount, token]);

  useEffect(async () => {
    setActive(false);
    if (amount <= 0) {
      setButtonLabel("Input Valid Amount");
    } else if (keeper.length > 0) {
      if (transferOutput > 0) {
        setButtonLabel("Transfer Funds");
        setActive(true);
      } else {
        setButtonLabel("Result Must Be More Than Zero");
      }
    } else {
      setButtonLabel("Awaiting Keeper");
    }
  }, [keeper, transferOutput, amount]);

  return (
    <>
      <div className="px-8">
        <PrimaryRoundedButton
          active={active}
          label={buttonLabel}
          action={action}
        />
      </div>

      <div className={"animate-flip-in-hor-top px-6 mt-6 [animation-delay:700ms] w-full " + (amount > 0 && keeper.length > 0 && transferOutput > 0 ? "" : "hidden")}>
        <BridgeTransferFeeInformation token={token}/>
      </div>
    </>
  );
};
