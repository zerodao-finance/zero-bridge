


 
  
export const Table = ({children}) => {
    return (
        <table className="table-fixed divide-y divide-gray-200 dark:text-white text-gray-500 w-[30rem] lg:w-[50rem] h-[15rem] m-6">
            <thead className=" items-center w-full">
                <tr className="uppercase justify-evenly max-w-fit min-w-full px-2">
                    <th className="font-medium text-xs font-medium uppercase tracking-wider truncate w-[14.28%]" >Date</th>
                    <th className="font-medium text-xs font-medium uppercase tracking-wider truncate w-[14.28%]" >Underwriter</th>
                    <th className="font-medium text-xs font-medium uppercase tracking-wider truncate w-[14.28%]" >Amount</th>
                    <th className="font-medium text-xs font-medium uppercase tracking-wider truncate w-[14.28%]" >Status</th>
                    <th className="font-medium text-xs font-medium uppercase tracking-wider text-orange-300 truncate w-[14.28%]" >RENBTC</th>
                    <th className="font-medium text-xs font-medium uppercase tracking-wider text-blue-300 truncate w-[14.28%]" >ARBETH</th>
                    <th className="font-medium text-xs font-medium uppercase tracking-wider truncate w-[14.28%]" >Arbiscan</th>
                </tr>
            </thead>
            <tbody className=" items-center w-full">
                {children}    
            </tbody>
            
        </table>
    )
}
