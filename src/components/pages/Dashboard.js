// import ConversionTool from "../organisms/ConversionTool";
import { BridgeComponent } from "../organisms/bridge";
import { Transactions } from "../organisms/history";
import { Appbar, Sidebar } from "../organisms/navigation";
import { useEffect, useState } from "react";
import { Disclaimer } from "../organisms/notifications";
import { Confirmation } from "../molecules/bridge";
import { ManageTool } from "../organisms/manage";
import {
  ErrorNotifications,
  TransactionNotifications,
} from "../organisms/notifications";
import { Wallet, UI, SDK } from "../../core/systems";
import { initializeZeroUser } from "../../core/systems/sdk/keeper";
import { Wrappers } from "../../core/systems/bridge";

const { useWallet, useNetwork } = Wallet;

const Dashboard = () => {
  // useTransactionListener()
  // SDK.useLocalStorageRefresh()
  const [keepers, setKeepers] = useState([]);
  const [zeroUser, setZeroUser] = useState(null);
  useEffect(() => {
    (async () => {
      setZeroUser(await initializeZeroUser());
      console.log(`Keeper Effect: ZeroUser initialized`);
    })().catch(console.error);
  }, []);

  useEffect(() => {
    const listener = (keeper) => {
      console.log(`Keeper effect: ${keeper} found`);
      setKeepers([...keepers, keeper]);
    };

    console.log(`Keeper Effect: Zero User searching for keeper: \n`, zeroUser);
    if (zeroUser) zeroUser.on("keeper", listener);
    return () => {
      if (zeroUser) zeroUser.removeListener("keeper", listener);
    };
  }, [zeroUser]);
  global.keeper = (global.keeper &&
    Object.assign(global.keeper, { keepers, zeroUser })) || {
    keepers,
    zeroUser,
  };
  global.wallet = useWallet();
  useNetwork();
  UI.useScreenMode();

  const [signed, setSigned] = useState(false);
  const [tool, switchTool] = useState("convert");
  useEffect(() => {
    console.log(signed);
    const agreement = window.localStorage.getItem("TC_agreement_signed");
    if (agreement == "true") {
      setSigned(true);
    }
  }, [signed]);
  // On page load or when changing themes, best to add inline in `head` to avoid FOUC

  return (
    <div className="bg-gradient-to-tl from-rose-50 to-teal-50 via-Fuchsia-50 dark:bg-none dark:bg-gradient-to-br dark:from-gray-700 dark:via-gray-900 dark:to-black h-screen">
      <Appbar />
      <Sidebar switcher={switchTool} tool={tool} />
      {/* <header>
      </header> */}
      <main className="fixed h-screen top-0">
        {tool == "convert" && (
          <div className="h-full flex flex-col w-screen place-content-center items-center">
            {signed ? "" : <Disclaimer setSigned={setSigned} />}
            <Confirmation></Confirmation>
            <Wrappers.DataProvider>
              {/* <ConversionTool /> */}
              <BridgeComponent />
            </Wrappers.DataProvider>
          </div>
        )}
        {/* {tool == "transactions" &&
            <div className="h-full flex flex-col w-screen place-content-center items-center">
              <Transactions />
            </div>
        }
        {tool == "manage" &&
          <div className="h-full flex flex-col w-screen place-content-center items-center">
            <ManageTool />
          </div>
        } */}
        <ErrorNotifications />
        <TransactionNotifications />
      </main>

      <footer className="absolute bottom-0 h-[2rem] w-screen text-xs px-4 flex flex-row justify-between">
        <p className="text-gray-400">
          Copyright (the "zeroDAO Site"). Z DAO, LLC ("ZD"){" "}
          <a href="ZeroDao.com">ZeroDao.com</a>
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
