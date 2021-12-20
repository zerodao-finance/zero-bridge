


 
  
const Table = ({children}) => {
    return (
        <table className="table-auto divide-y divide-gray-200 ">
            <thead>
                <tr className="uppercase">
                    <th className="font-medium px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">Date</th>
                    <th className="font-medium px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">Underwriter</th>
                    <th className="font-medium px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">Amount</th>
                    <th className="font-medium px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">Status</th>
                    <th className="font-medium px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider text-orange-300" scope="col">RENBTC</th>
                    <th className="font-medium px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider text-blue-300" scope="col">ARBETH</th>
                    <th className="font-medium px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">Arbiscan</th>
                </tr>
            </thead>
            <tbody>
                {children}    
            </tbody>
            
        </table>
    )
}
export default Table