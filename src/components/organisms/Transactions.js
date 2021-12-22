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

  

const Transactions = ({txTable, refreshTable}) => {

    const max = txTable.length
    const [page, changePage] = useState(0)

    const nextPage = () => {
        if (page < max % page )changePage(page + 5 )
    }

    const previousPage = () => {
        if (page > 0) changePage(page - 5)
    }

    useEffect(async () => {
        if ( !txTable[0] ) refreshTable()

      })

      
    if (txTable[0]) console.log(txTable.slice(0, 5))
    return (
        <div className="shrink p-10 bg-neutral-100 shadow-xl rounded-xl bottom-0">
            <Table>
              {txTable[0] && txTable.slice(page, (page+6 > max ? max : page+6)).map((tx) => (
                  <tr >
                    <td className="px-6 py-4 whitespace-nowrap">{moment(new Date()).format("MM-DD-YYYY HH:mm")}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{tx.underwriter}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{ethers.FixedNumber.fromBytes(tx["amount"])._value}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-green-300">{tx["status"]}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{"44444"}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{"44444"}</td>
                    {/* <td className="px-6 py-4 whitespace-nowrap"><a style={ { color: 'black', textDecoration: 'none' } } href={'https://arbiscan.io/tx/' + row.arbiscan}>{ row.arbiscan }</a></td> */}
                    </tr>
                ))}
            </Table>
            <div className="w-full h-[100px] z-40 flex flex-row justify-between items-start text-xl p-2 text-emerald-400">
                <button onClick={previousPage}>Prev Page</button> 
                <button onClick={nextPage}>Next Page</button> 

            </div>
        </div>
    )
}
export default Transactions