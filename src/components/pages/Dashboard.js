import ConversionTool from "../organisms/ConversionTool";
import Transactions from "../organisms/Transactions";
import TransactionCard from '../molecules/TransactionCard'
import AppBar from "../organisms/AppBar";
import { ConversionToolContext, TransactionTableContext } from '../../context/Context'
import { useEffect, useState } from 'react'
import Disclaimer from '../organisms/Disclaimer'
import {Confirm} from '../organisms/Confirm'

const Dashboard = () => {
  const [signed, setSigned] = useState(false)
  useEffect(() => {
    console.log(signed)
    const agreement = window.localStorage.getItem("TC_agreement_signed")
    if (agreement == "true") {
      setSigned(true)
    }
  }, [signed])  
  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  
  return (
    <ConversionToolContext.Consumer>
      { value =>
        <div className="h-screen fixed bg-gradient-to-tl from-rose-50 to-teal-50 dark:bg-none dark:bg-gradient-to-br dark:from-gray-700 dark:via-gray-900 dark:to-black">
          <AppBar />
          <div className="flex flex-col h-full items-center justify-center w-screen" >
            { signed ? '': <Disclaimer setSigned={setSigned}/>}
            <Confirm></Confirm>
            {/* <ToastContainer /> */}
            <div className="fixed top-0 left-0 w-fit h-fit mt-[6rem]">
              {/* <TransactionCard /> */}
              {value.get.depositTx}
            </div>
            <div className="grow"></div>
            <ConversionTool />
          {/* <TransactionTableContext.Consumer>
            { value => 
              <Transactions txTable={value.get.txTable}/>
            }
          </TransactionTableContext.Consumer> */}
          </div>
          <footer className="absolute bottom-0 h-[2rem] w-screen text-xs px-4 flex flex-row justify-between">
            <p className="text-gray-400">
              Copyright (the "zeroDAO Site"). Z DAO, LLC ("ZD") <a href="ZeroDao.com" >ZeroDao.com</a>
            </p>
          </footer>
        </div>
        }
    </ConversionToolContext.Consumer>
  );
};

export default Dashboard;
