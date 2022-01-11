import ConversionTool from "../organisms/ConversionTool";
import Transactions from "../organisms/Transactions";
import TransactionCard from '../molecules/TransactionCard'
import AppBar from "../organisms/AppBar";
import { ConversionToolContext, TransactionTableContext } from '../../context/Context'
import { useEffect, useState } from 'react'
import Disclaimer from '../organisms/Disclaimer'
import {Confirm} from '../organisms/Confirm'
import { Sidebar } from '../molecules/sidebar'
import { ManageTool } from '../organisms/ManageTool'
import { ErrorCard } from '../organisms/ErrorCard'

const Dashboard = () => {
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
        <AppBar />
        <Sidebar switcher={switchTool}/>
      {/* <header>
      </header> */}
      <main className="fixed h-screen top-0">
      {tool == "convert" &&
        <ConversionToolContext.Consumer>
          { value =>
              <div className="h-full flex flex-col w-screen place-content-center items-center" >
                { signed ? '': <Disclaimer setSigned={setSigned}/>}
                <Confirm></Confirm>
                <div className="fixed top-0 left-0 w-fit h-fit mt-[6rem] z-50">
                  {value.get.depositTx}
                </div>
                <ConversionTool />
              </div>
            }
        </ConversionToolContext.Consumer>
        }
        {tool == "transactions" &&
        <TransactionTableContext.Consumer>
          { value => 
            <div className="h-full flex flex-col w-screen place-content-center items-center">
              <Transactions txTable={value.get.txTable}/>
            </div>
          }
        </TransactionTableContext.Consumer>
        }
        {tool == "manage" &&
          <div className="h-full flex flex-col w-screen place-content-center items-center">
            <ManageTool />
          </div>
        }
      <div className="fixed top-0 right-0 w-fit h-fit mt-[6rem] mr-[6rem]">
        <ErrorCard />
      </div>
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
