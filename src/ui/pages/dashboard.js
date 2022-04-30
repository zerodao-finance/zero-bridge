import { DashboardLayout } from "../layouts/layouts.dashboard";
import { usePriceFeedContracts } from "../../api/global/hooks/usePriceFeedData";
import Disclaimer from "../organisms/Disclaimer";
import { useBridgePage } from "../../api/global/interfaces/interface.bridge";

export const DashboardPage = () => {
  usePriceFeedContracts();
  const { getBridgePageProps } = useBridgePage();
  const { tcSigned } = getBridgePageProps();
  return (
    <div className="fixed h-full w-full dark:bg-badger-black-800">
      {!tcSigned ? <Disclaimer /> : <DashboardLayout />}
    </div>
  );
};
