import { Table } from '../../molecules/history'
import { ethers } from 'ethers';
import moment from 'moment';
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi'
import { useEffect, useState } from 'react'


const rows = ['0.001', '0.002', '0.003', '0.003', '0.004', '0.005', '0.006'].map((v) => ({
    amount: v,
    underwriter: ethers.Wallet.createRandom().address,
    arbiscan: ethers.utils.hexlify(ethers.utils.randomBytes(32)),
    date: moment(new Date()).format('MM-DD-YYYY HH:mm'),
    actualRen: v * 0.95,
    actualArbEth: v * 0.05
  }));

// import tools from '../../utils/_utils'

export const Transactions = () => {
     const [ txTable, updateTxTable ] = useState([]);
     useEffect(() => {
       (async () => {
         updateTxTable(await tools.storage.getAllTransferRequests());
       })().catch((err) => console.error(err));
     }, []);

    const max = txTable.length
    const [page, changePage] = useState(0)

    const nextPage = () => {
        if (((page+1)*3) < max ) changePage(page+1 )
        console.log(max)
        console.log(page, (max % page), max)
        console.log("next page from", page)
    }

    const previousPage = () => {
        if (page > 0) changePage(page - 1)
        console.log("previous page from", page)
    }

   

      
    return (
        <div className="dark:bg-gray-700 dark:text-white bg-white rounded-xl shadow-xl flex flex-col items-center animate-swing-in-top-fwd">
            <p className="font-light text-xl tracking-widest capitalize relative-top mb-2 dark:text-black place-self-start pt-2 pl-2 w-full bg-emerald-300 shadow-lg rounded-t-md">Past Transactions</p>
            <Table>
              {txTable[0] && txTable.slice(page*3, ((page*3)+4 > max ? max : (page*3)+4)).map((tx) => (
                  <tr key={tx['date']} className="w-full text-center gap-2 items-center w-full group hover:bg-white hover:shadow-xl transition-all duration-200 delay-200 py-2 mt-3">
                    <th className="text-[10px] w-[14.28%]">{moment(tx['date']).format('YYYY-MM-DD HH:mm:ss a')}</th>
                    <td className="text-xs col w-[14.28%] group-hover:w-max"><p className="truncate">{tx.data.underwriter}</p></td>
                    <td className="text-xs w-[14.28%]"><p className="truncate">{ethers.utils.formatUnits(ethers.BigNumber.from(tx.data["amount"]), 8)}</p></td>
                    <td className={`text-xs w-[14.28%] ${tx['status'] == "success" ? "text-green-300" : "text-orange-300"}`}><p className="truncate">{tx["status"]}</p></td>
                    <td className="text-xs w-[14.28%m]"><p className="truncate">{tx["ETH"]}</p></td>
                    <td className="text-xs w-[14.28%]"><p className="truncate">{tx["renBTC"]}</p></td>
                    <td className="text-xs w-[14.28%] group-hover:w-fit"><p className="truncate">{ tx.data.contractAddress }</p></td>
                </tr>
                ))}
            </Table>
            <div className="flex flex-row justify-evenly w-full items-start text-sm items-center text-emerald-400 mb-2">
                <button onClick={() => previousPage()} className=""><BiCaretLeft className="w-[1.2rem] h-[1.2rem]"/></button> 
                {page+1}
                <button onClick={() => nextPage()}><BiCaretRight className="w-[1.2rem] h-[1.2rem]"/></button> 

            </div>
            
        </div>
    )
}

