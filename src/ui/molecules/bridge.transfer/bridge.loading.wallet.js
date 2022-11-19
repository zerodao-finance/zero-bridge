import { useWalletConnection } from "../../../api/global/interfaces/interfaces.wallet";
import { PrimaryRoundedButton } from "../../atoms";
import { LoadingIndicator } from "../../atoms/indicators/indicator.loading";

export const BridgeLoadingWallet = () => {
  const { connect } = useWalletConnection();

  return (
    <div className="min-h-[360px] flex flex-col gap-20 justify-center items-center">
      <LoadingIndicator title="please connect wallet" />
      <PrimaryRoundedButton
        className="w-fit"
        active={true}
        label={"CONNECT"}
        action={connect}
      />
    </div>
  );
};
