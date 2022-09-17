import { useEffect, useState } from "react";
import { TransferRequest } from "@zerodao/sdk";
import { fallbackMint } from "../utils/fallback";
import { getSigner } from "../hooks/submit";
import { useRequestHelper } from "../hooks/helper";

export const getStatus = (data) => {
  const [passed, setPassed] = useState(null);
  const { state } = useRequestHelper();
  const { wallet } = state;

  useEffect(async () => {
    const req = new TransferRequest({
      ...data._data,
    });

    const signer = await getSigner(wallet);
    const mint = await req.submitToRenVM();

    mint.on("transaction", (transaction) => {
      transaction.in.wait().on("progress", (progress) => {
        let passedData = {
          target: progress.target,
          confs: progress.confirmations,
          fallbackMint:
            progress.confirmations && progress.confirmations > progress.target
              ? () => fallbackMint(req, signer)
              : null,
        };

        setPassed(passedData);
      });
    });
  }, []);

  return { passed };
};
