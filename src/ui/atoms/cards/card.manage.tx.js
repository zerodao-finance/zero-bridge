import { usePopup } from "../../../api/transaction/status";
import * as React from "react";
import { defaultTo } from "lodash";
import { getStatus } from "../../../api/transaction/status";
import { AiOutlineConsoleSql } from "react-icons/ai";

export const ManageTransactionCard = ({ data, type }) => {
  const [details, toggle] = React.useState(false);
  const { openModal } = usePopup();
  function truncateAddress(address) {
    return address.slice(0, 6) + "..." + address.slice(-4);
  }

  if (!details)
    return (
      <div
        key={data.id}
        className="bg-gray-300 rounded-md shadow-md text-xs max-w-[300px] px-4 py-1 flex flex-col gap-1"
        onClick={(e) => toggle(true)}
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
        <div className="underline cursor-pointer"> click for details </div>
      </div>
    );

  if (details) return <Details data={data} toggle={toggle} />;
};

function Details({ data, toggle }) {
  const { passed } = getStatus(data);
  console.log(passed ? passed : "no function available");
  return (
    <div
      onClick={() => toggle(false)}
      className="bg-gray-300 rounded-md shadow-md text-xs max-w-[300px] px-4 py-1 flex flex-col gap-1"
      key={data.id}
    >
      {passed ? (
        <div>
          <span>
            <p>target: {passed.target}</p>
            <p>current: {passed.confs}</p>
          </span>
          <button
            onClick={() => {
              passed.fallbackMint();
            }}
          >
            Fallback Mint
          </button>
        </div>
      ) : (
        <div className="h-[60px] flex items-center justify-center content-center animate-pulse">
          loading
        </div>
      )}
    </div>
  );
}
