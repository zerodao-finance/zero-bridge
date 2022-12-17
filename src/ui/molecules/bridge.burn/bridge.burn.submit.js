import { PrimaryRoundedButton } from "../../atoms/buttons/button.rounded";
import { useEffect, useState } from "react";
import { getFeeBreakdown } from "../../../api/hooks/burn-fees";
import { ethers } from "ethers";
import { BridgeFeeInformation } from "../bridge.transfer/bridge.transfer.feeInformation";
import { useZero } from "../../../api/global/interfaces/interfaces.zero";

const btcRegex = /^(?:[13]{1}[a-km-zA-HJ-NP-Z1-9]{26,33}|bc1[a-z0-9]{39,59})$/;
const zcashRegex = /t1[a-km-zA-HJ-NP-Z1-9]{33}$/;

const isValidAddress = ({ destination, primaryToken }) => {
  if (primaryToken === "BTC") {
    return destination.substr(0, 4) != "bc1p" && destination.match(btcRegex);
  } else {
    return destination.match(zcashRegex);
  }
};

export const BridgeBurnSubmit = ({
  action,
  destination,
  amount,
  token,
  btc_usd,
  renZEC_usd,
  chainId,
  quote,
  primaryToken,
}) => {
  const [buttonLabel, setButtonLabel] = useState(
    "Enter Valid Recipient Address"
  );
  const { keeper } = useZero();
  const [active, setActive] = useState(false);
  const [fees, setFees] = useState({});

  useEffect(async () => {
    if (amount > 0) {
      const feeAmounts = await getFeeBreakdown({
        amount,
        token,
        chainId,
        primaryToken,
      });
      setFees(feeAmounts);
    }
  }, [amount, token, chainId]);

  useEffect(async () => {
    setActive(false);
    if (isValidAddress({ destination, primaryToken })) {
      if (keeper.length <= 0) {
        setButtonLabel("Awaiting Keeper");
      } else if (
        amount > 0 &&
        ethers.utils.formatUnits(
          ethers.utils.parseUnits(quote, 8).mul(ethers.BigNumber.from(btc_usd)),
          14
        ) > 15
      ) {
        setButtonLabel("Release Funds");
        setActive(true);
      } else {
        setButtonLabel("Result Must Be More Than $15");
      }
    } else {
      setButtonLabel(
        "Enter Valid " +
          (primaryToken == "ZEC" ? "Transparent" : "") +
          " Recipient Address"
      );
    }
  }, [destination, quote, amount, keeper, primaryToken]);

  return (
    <>
      <div className="px-8 mt-4">
        <PrimaryRoundedButton
          // active={active}
          // label={buttonLabel}
          active={false}
          label="Temporarily Disabled"
          action={action}
        />
      </div>

      {amount > 0 && (
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
            type="burn"
            primaryToken={primaryToken}
          />
        </div>
      )}
    </>
  );
};
