import { NavigationTopBar } from "../molecules/navigation/navigation.topbar";
import { BridgeModule } from "../organisms/bridge.module";
import { LayoutSidebarNavigation } from "./layout.sidebar.nav";
import { MobileNavigationSidebar } from "../molecules/navigation/navigation.sidebar.mobile";
import { useActiveModuleSwitcher } from "../../api/global/interfaces/interfaces.active.module";
import { useCheckWalletConnected } from "../../api/global/interfaces/interfaces.wallet";
import { useBridgePage } from "../../api/global/interfaces/interface.bridge";
import UnderConstruction from "../atoms/helpers/under-construction";
import { ManageTransaction } from "../molecules/manage/manage.request";
import { TransactionHistory } from "../molecules/history/history.request";

export const DashboardLayout = () => {
  const { changeActiveModule, resetModule, currentModule, isLoading } =
    useActiveModuleSwitcher();
  const { getWalletConnectionProps } = useCheckWalletConnected();
  const { getBridgePageProps } = useBridgePage();

  return (
    <>
      <div className="grid grid-rows-11 grid-flow-cols h-full w-full">
        <div className="row-span-1" id="navigation">
          <NavigationTopBar />
          <div className="w-1/2 md:w-1/4 right-0 absolute mx-2">
            <LayoutSidebarNavigation changeModule={changeActiveModule}>
              <MobileNavigationSidebar changeModule={changeActiveModule} />
            </LayoutSidebarNavigation>
          </div>
        </div>
        <div className="flex flex-col w-fit ml-auto mr-auto">
          {isLoading ? (
            <>Loading</>
          ) : currentModule.includes("Transactions") ? (
            <>
              <p className="pb-[.5rem] text-center font-bold dark:text-badger-gray-300">
                {" "}
                Transactions{" "}
              </p>
              <UnderConstruction />
            </>
          ) : currentModule.includes("History") ? (
            <>
              <p className="pb-[.5rem] text-center font-bold dark:text-badger-gray-300">
                {" "}
                History{" "}
              </p>
              <UnderConstruction />
            </>
          ) : (
            <>
              <p className="pb-[.5rem] text-center font-bold dark:text-badger-gray-300">
                {" "}
                Bridge{" "}
              </p>
              {currentModule === "bridge" ? (
                <BridgeModule
                  {...getWalletConnectionProps()}
                  {...getBridgePageProps()}
                />
              ) : currentModule === "manage" ? (
                <ManageTransaction />
              ) : currentModule === "history" ? (
                <TransactionHistory />
              ) : (
                ""
              )}
            </>
          )}
        </div>

        <div className="footer row-span-2 flex mt-8 flex-col-reverse text-[13px] md:text-md">
          <p className="text-gray-400 ml-2">
            Powered By ZeroDAO - Copyright (the "zeroDAO Site"). Z DAO, LLC
            ("ZD") <a href="ZeroDao.com">ZeroDao.com</a>
          </p>
        </div>
      </div>
    </>
  );
};
