import ConversionTool from "../organisms/ConversionTool";
import Transactions from "../organisms/Transactions";
import AppBar from "../organisms/AppBar";
import { ToastContainer, toast } from 'react-toastify'
import TransactionCard from "../molecules/TransactionCard"
import { useState } from 'react'
const Dashboard = () => {

  const [ transactions, addTransaction ] = useState([])

  const pushTransaction = () => {
    if (transactions.length <= 2) addTransaction([...transactions, <TransactionCard />]) 
  }
  

  return (
        <div className="h-screen fixed bg-gradient-to-tr from-sky-50 via-gray-100 to-gray-50">
          <AppBar />
          <div className="flex flex-col h-full items-center justify-center">
            {/* <ToastContainer /> */}
            <div className="fixed top-0 left-0 w-[40rem] h-[40rem] mt-[6rem]" onClick={pushTransaction}>
              {transactions}
            </div>
            <div className="grow"></div>
            <ConversionTool />
            <Transactions />
          </div>
        </div>
  );
};

export default Dashboard;
