import * as React from "react";
import * as ReactDOM from "react-dom";
import { TransactionStatusPopup } from "../../ui/molecules/manage/manage.popup";
import { UnderwriterTransferRequest } from "zero-protocol/dist/lib/zero";

export function usePopup() {
  function openModal(data) {
    console.log("opening", data);
    ReactDOM.createPortal(
      <TransactionStatusPopup data={data} />,
      document.body
    );
  }

  return {
    openModal,
  };
}

export function getStatus(data) {
  const [passed, setData] = React.useState(null);
  React.useEffect(async () => {
    const req = new UnderwriterTransferRequest({
      ...data._data,
    });

    // try {
    //   let checkHasMinted = await req.hasMinted()
    //   // await console.log(checkHasMinted)
    // } catch (error) {
    //   console.log(error)
    // }

    const mint = await req.submitToRenVM();

    if (!process.env.REACT_APP_TEST) {
      mint.on("deposit", async (deposit) => {
        let confs = deposit.depositDetails.transaction.confirmations;

        let passedData = {
          target: 6,
          confs: await confs,
          _fallbackMint: req.fallbackMint,
          get fallbackMint() {
            if (this.confs && this.confs > 6) return this._fallbackMint;
            else return null;
          },
        };
        setData(passedData);
      });
    }
  }, []);

  return { passed };
}
