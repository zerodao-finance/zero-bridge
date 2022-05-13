import { useState } from "react";
import { CogIcon } from "@heroicons/react/solid";

export const SlippageInput = () => {
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <div className="w-full flex justify-end">
      <CogIcon
        onClick={() => setOpenSettings(!openSettings)}
        className="h-6 w-6 cursor-pointer"
      />

      <div
        className={
          "bg-badger-black-400 absolute z-20 mt-8 select-none " +
          (openSettings ? "" : "hidden")
        }
      >
        <span>Transaction settings</span>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Slippage tolerance ?
        </label>
        <div>
          <button> text </button>
          <input
            type="email"
            name="email"
            id="email"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300"
            placeholder="John Doe"
          />
        </div>
      </div>
    </div>
  );
};
