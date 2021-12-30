import Table from '../molecules/Table'
import { ethers } from 'ethers';
import moment from 'moment';
import { useEffect, useState } from 'react'


const rows = ['0.001', '0.002', '0.003', '0.003', '0.004', '0.005', '0.006'].map((v) => ({
    amount: v,
    underwriter: ethers.Wallet.createRandom().address,
    arbiscan: ethers.utils.hexlify(ethers.utils.randomBytes(32)),
    date: moment(new Date()).format('MM-DD-YYYY HH:mm'),
    actualRen: v * 0.95,
    actualArbEth: v * 0.05
  }));

  

const Transactions = ({txTable}) => {

    const max = txTable.length
    const [page, changePage] = useState(0)

    const nextPage = () => {
        if (((page+1)*5) < max ) changePage(page+1 )
        console.log(max)
        console.log(page, (max % page), max)
        console.log("next page from", page)
    }

    const previousPage = () => {
        if (page > 0) changePage(page - 1)
        console.log("previous page from", page)
    }

   

      
    return (
        <div className="hidden xl:block shrink p-10 bg-neutral-100 shadow-xl rounded-xl bottom-0 mx-28 dark:bg-gray-700 dark:text-white">
            <Table className="flex">
              {txTable[0] && txTable.slice(page*5, ((page*5)+6 > max ? max : (page*5)+6)).map((tx) => (
                  <tr key={tx['date']}>
                    <td className="lg:px-6 lg:py-4 whitespace-nowrap"><p className="flex">{moment(tx['date']).format('YYYY-MM-DD HH:mm:ss a')}</p></td>
                    <td className="lg:px-6 lg:py-4 whitespace-nowrap"><p className="flex">{tx.underwriter}</p></td>
                    <td className="lg:px-6 lg:py-4 whitespace-nowrap"><p className="flex">{ethers.FixedNumber.fromBytes(tx["amount"])._value}</p></td>
                    <td className={`lg:px-6 lg:py-4 whitespace-nowrap ${tx['status'] == "success" ? "text-green-300" : "text-orange-300"}`}><p className="flex">{tx["status"]}</p></td>
                    <td className="lg:px-6 lg:py-4 whitespace-nowrap"><p className="flex">{tx["ETH"]}</p></td>
                    <td className="lg:px-6 lg:py-4 whitespace-nowrap"><p className="flex">{tx["renBTC"]}</p></td>
                    <td className="lg:px-6 lg:py-4 whitespace-nowrap"><a  href={'https://arbiscan.io/tx/' + tx.contractAddress}><p className="flex">{ tx.contractAddress }</p></a></td>
                </tr>
                ))}
            </Table>
            <div className="w-full h-[100px] flex flex-row justify-between items-start text-xl p-2 text-emerald-400">
                <button onClick={() => previousPage()} className="">Prev Page</button> 
                <button onClick={() => nextPage()}>Next Page</button> 

            </div>
            
        </div>
    )
}
export default Transactions