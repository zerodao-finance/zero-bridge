


 
  
const Table = ({children}) => {
    return (
        <table className="table-auto divide-y divide-gray-200 hidden xl:block dark:text-white text-gray-500">
            <thead>
                <tr className="uppercase">
                    <th className="font-medium lg:px-6 lg:py-3 text-center text-xs font-medium uppercase tracking-wider" scope="col">Date</th>
                    <th className="font-medium lg:px-6 lg:py-3 text-center text-xs font-medium uppercase tracking-wider" scope="col">Underwriter</th>
                    <th className="font-medium lg:px-6 lg:py-3 text-center text-xs font-medium uppercase tracking-wider" scope="col">Amount</th>
                    <th className="font-medium lg:px-6 lg:py-3 text-center text-xs font-medium uppercase tracking-wider" scope="col">Status</th>
                    <th className="font-medium lg:px-6 lg:py-3 text-center text-xs font-medium uppercase tracking-wider text-orange-300" scope="col">RENBTC</th>
                    <th className="font-medium lg:px-6 lg:py-3 text-center text-xs font-medium uppercase tracking-wider text-blue-300" scope="col">ARBETH</th>
                    <th className="font-medium lg:px-6 lg:py-3 text-center text-xs font-medium uppercase tracking-wider" scope="col">Arbiscan</th>
                </tr>
            </thead>
            <tbody className="">
                {children}    
            </tbody>
            
        </table>
    )
}
export default Table