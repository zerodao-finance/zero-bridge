import { ethers } from "ethers";
import { useState } from "react";
import { CogIcon } from "@heroicons/react/outline";
import OutsideClickHandler from "react-outside-click-handler";
import { useSlippageFetchers } from "../../../api/global/interfaces/interfaces.slippage";
import fixtures from "zero-protocol/lib/fixtures";

export const SlippageInput = ({ amount, token, slippage, setSlippage }) => {
  const [openSettings, setOpenSettings] = useState(false);

  const autoSlippage = async () => {
    const tokenAddr = fixtures.ETHEREUM[token];

    switch (tokenAddr) {
      case fixtures.ETHEREUM["renBTC"]:
        setSlippage(0.0);
        break;
      default:
        setSlippage(2.0);
    }
  };

  return (
    <OutsideClickHandler onOutsideClick={() => setOpenSettings(false)}>
      <div className="w-full flex justify-end">
        <CogIcon
          onClick={() => setOpenSettings(!openSettings)}
          className="h-6 w-6 cursor-pointer"
        />
        <div
          className={
            "bg-badger-black-400 absolute z-20 mt-8 select-none p-4 rounded-lg text-badger-white grid " +
            (openSettings ? "" : "hidden")
          }
        >
          <span className="text-sm font-semibold text-badger-text-secondary">
            Transaction settings
          </span>
          <label htmlFor="slipTolerance" className="text-sm mt-2">
            Slippage tolerance ?
          </label>
          <div className="flex mt-1 text-sm">
            <button
              className="hover:bg-badger-yellow-400/40 bg-badger-yellow-400 rounded-lg p-2 font-bold text-badger-black-700"
              onClick={() => autoSlippage()}
            >
              Auto
            </button>
            <input
              type="number"
              name="slipTolerance"
              id="slipTolerance"
              className="block rounded-lg ml-2 text-right focus:border-badger-gray-200 focus:ring-1 focus:ring-badger-gray-200 text-badger-black-800 pr-7 font-semibold"
              placeholder="0.1"
              value={slippage.toFixed(1)}
              onChange={(e) => setSlippage(e.target.value)}
            />
            <div className="absolute pt-3 right-3 pr-3 flex items-center pointer-events-none text-badger-black-800 font-bold">
              %
            </div>
          </div>
        </div>
      </div>
    </OutsideClickHandler>
  );
};
