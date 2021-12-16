import Table from '../molecules/Table'
import { ethers } from 'ethers';
import moment from 'moment';


const rows = ['0.001', '0.002', '0.003', '0.003', '0.004', '0.005', '0.006'].map((v) => ({
    amount: v,
    underwriter: ethers.Wallet.createRandom().address,
    arbiscan: ethers.utils.hexlify(ethers.utils.randomBytes(32)),
    date: moment(new Date()).format('MM-DD-YYYY HH:mm'),
    actualRen: v * 0.95,
    actualArbEth: v * 0.05
  }));

  

const Transactions = () => {
    return (
        <div className="shrink p-10 bg-neutral-100 shadow-xl rounded-xl bottom-0">
            <Table>
                {rows.map((row) => (
                    <tr key={row.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{row.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.underwriter}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-green-300">Completed</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.actualRen.toFixed(5)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.actualArbEth.toFixed(5)}</td>
                    <td className="px-6 py-4 whitespace-nowrap"><a style={ { color: 'black', textDecoration: 'none' } } href={'https://arbiscan.io/tx/' + row.arbiscan}>{ row.arbiscan }</a></td>
                    </tr>
                ))}
            </Table>
        </div>
    )
}
export default Transactions