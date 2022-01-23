import ConversionTool from "../organisms/ConversionTool";
import Transactions from "../organisms/Transactions";
import { Appbar }  from "../organisms/navigation";
import { useEffect, useState } from 'react'
import Disclaimer from '../organisms/Disclaimer'
import {Confirm} from '../organisms/Confirm'
import { Sidebar } from '../molecules/sidebar'
import { ManageTool } from '../organisms/ManageTool'
import { ErrorNotifications, TransactionNotifications } from '../organisms/Notifications'
import {useKeeper, useWallet, BridgeProvider, _TransactionNotifications, useTransactionListener, useLocalStorageRefresh, useScreenMode } from '../../core/instance'




const Dashboard = () => {
  useTransactionListener()
  useLocalStorageRefresh()
  global.keeper = useKeeper()
  global.wallet = useWallet()
  global.screenMode = useScreenMode()
  
  const [signed, setSigned] = useState(false)
  const [tool, switchTool] = useState("convert")
  useEffect(() => {
    console.log(signed)
    const agreement = window.localStorage.getItem("TC_agreement_signed")
    if (agreement == "true") {
      setSigned(true)
    }
  }, [signed])  
  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  
  return (
    <div className="bg-gradient-to-tl from-rose-50 to-teal-50 via-Fuchsia-50 dark:bg-none dark:bg-gradient-to-br dark:from-gray-700 dark:via-gray-900 dark:to-black h-screen">
        <Appbar />
        <Sidebar switcher={switchTool}/>
      {/* <header>
      </header> */}
      <main className="fixed h-screen top-0">
      {tool == "convert" &&
              <div className="h-full flex flex-col w-screen place-content-center items-center" >
                { signed ? '': <Disclaimer setSigned={setSigned}/>}
                <Confirm></Confirm>
                <BridgeProvider>
                  <ConversionTool />
                </BridgeProvider> 
              </div>
        }
        {tool == "transactions" &&
            <div className="h-full flex flex-col w-screen place-content-center items-center">
              <Transactions />
            </div>
        }
        {tool == "manage" &&
          <div className="h-full flex flex-col w-screen place-content-center items-center">
            <ManageTool />
          </div>
        }
      <ErrorNotifications />
      <TransactionNotifications />
        
      </main>

      <footer className="absolute bottom-0 h-[2rem] w-screen text-xs px-4 flex flex-row justify-between">
        <p className="text-gray-400">
          Copyright (the "zeroDAO Site"). Z DAO, LLC ("ZD") <a href="ZeroDao.com" >ZeroDao.com</a>
          
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
