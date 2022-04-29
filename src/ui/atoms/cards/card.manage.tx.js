export const ManageTransactionCard = ({ data, type }) => {
  function truncateAddress(address) {
    return address.slice(0, 6) + "..." + address.slice(-4);
  }
  return (
    <div
      key={data.id}
      className="bg-gray-300 rounded-md shadow-md text-xs max-w-[300px] px-4 py-1 flex flex-col gap-1"
    >
      <div className="grid grid-cols-2 justify-items-center">
        <p className="text-md font-bold">{data.type} :</p>
        <p className="text-emerald-500">
          {truncateAddress(data._data.contractAddress).toUpperCase()}
        </p>
      </div>
      <hr className="border-black" />
      <div className="grid grid-cols-2">
        <span>to:</span>
        <span className="text-xs">
          {truncateAddress(data._data.to).toUpperCase()}
        </span>
        <span> amount </span>
        <span> {data._data.amount} </span>
      </div>
    </div>
  );
};
