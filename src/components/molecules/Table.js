
const people = [
    {
      name: 'Jane Cooper',
      title: 'Regional Paradigm Technician',
      department: 'Optimization',
      role: 'Admin',
      email: 'jane.cooper@example.com',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    // More people...
  ]

 
  
const Table = ({children}) => {
    return (
        <table className="table-auto divide-y divide-gray-200 min-w-full">
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