import { PrimaryRoundedButton } from "../../atoms/buttons/button.rounded";
import { useEffect, useState } from "react";
import useBurnFees from "../../../api/hooks/burn-fees";
import { ethers } from "ethers";

const btcRegex = /^(?:[13]{1}[a-km-zA-HJ-NP-Z1-9]{26,33}|bc1[a-z0-9]{39,59})$/;

export const BridgeBurnSubmit = ({
  action,
  destination,
  amount,
  token,
  btc_usd,
}) => {
  const { getBurnOutput } = useBurnFees();
  const [buttonLabel, setButtonLabel] = useState(
    "Enter Valid Recipient Address"
  );
  const [active, setActive] = useState(false);
  const [burnOutput, setBurnOutput] = useState();

  useEffect(async () => {
    if (amount > 0) {
      const output = await getBurnOutput({ amount, token });
      setBurnOutput(output);
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
    <PrimaryRoundedButton active={active} label={buttonLabel} action={action} />
  );
};
