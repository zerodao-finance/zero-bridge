import { Fragment, useEffect, useState } from "react";
import { CogIcon } from "@heroicons/react/outline";
import OutsideClickHandler from "react-outside-click-handler";
import { Transition } from "@headlessui/react";

const evmRegex = /^0x[a-fA-F0-9]{40}$/;

export const isStringFloat = (strNumber) => {
  const res = !isNaN(strNumber) && strNumber.toString().indexOf(".") != -1;
  return res;
};

export const SlippageInput = ({
  token,
  slippage,
  setSlippage,
  type,
  defaultAddress,
  destinationAddress,
  setDestinationAddress,
}) => {
  const [openSetting, setOpenSetting] = useState(false);
  const [valid, setValid] = useState(true);
  const [addressValid, setAddressValid] = useState(true);

  const autoSlippage = () => {
    switch (token) {
      case "renBTC":
        setSlippage("0.0");
        break;
      case "USDC":
        setSlippage("10.0");
        break;
      case "USDC.e":
        setSlippage("10.0");
        break;
      case "USDT":
        setSlippage("10.0");
        break;
      case "ETH":
        setSlippage("10.0");
        break;
      case "AVAX":
        setSlippage("10.0");
        break;
      default:
        setSlippage("2.0");
    }
  };

  useEffect(() => {
    if (!valid && !openSetting) {
      autoSlippage();
    }
    if (type !== "transfer") {
      return;
    }
    if (!addressValid && !openSetting) {
      setDestinationAddress(defaultAddress);
    }
  }, [openSetting]);

  // Perform form validation when slippage changes
  useEffect(() => {
    setValid(isStringFloat(slippage));
  }, [slippage]);

  // Reset to default on token switch
  useEffect(() => {
    autoSlippage();
  }, [token]);

  useEffect(() => {
    if (type !== "transfer") {
      return;
    }
    setDestinationAddress(defaultAddress);
  }, [defaultAddress]);

  // Perform validation on destination address
  useEffect(() => {
    setAddressValid(destinationAddress && destinationAddress.match(evmRegex));
  }, [destinationAddress]);

  return (
    <OutsideClickHandler onOutsideClick={() => setOpenSetting(false)}>
      <div className="w-full flex justify-end">
        <button
          onClick={() => setOpenSetting(!openSetting)}
          className="hover:text-neutral-300 transition duration-150"
        >
          <CogIcon className="h-6 w-6" />
        </button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
          show={openSetting}
        >
          <div
            className={
              "bg-badger-black-400 absolute z-20 mt-8 select-none p-4 rounded-lg text-badger-white grid "
            }
          >
            <span className="text-sm font-semibold text-badger-text-secondary">
              Transaction Settings
            </span>
            <div>
              <label htmlFor="slipTolerance" className="text-sm mt-2">
                Slippage Tolerance
              </label>
              <div className="flex mt-1 text-sm">
                <button
                  className="hover:bg-zero-green-500/40 bg-zero-green-500/90 rounded-lg p-2 font-bold text-badger-white-400 px-4"
                  onClick={() => autoSlippage()}
                >
                  Auto
                </button>
                <input
                  type="number"
                  name="slipTolerance"
                  id="slipTolerance"
                  className={
                    "block rounded-lg ml-2 text-right border-1 ring-1 text-badger-black-800 pr-7 font-semibold " +
                    (valid
                      ? "focus:border-badger-gray-200 focus:ring-badger-gray-200 ring-transparent"
                      : "border-error-red-400 ring-error-red-400 focus:ring-error-red-400 focus:border-error-red-400")
                  }
                  placeholder="0.1"
                  value={slippage}
                  onChange={(e) => setSlippage(e.target.value)}
                />
                <div className="absolute pt-3 right-3 pr-3 flex items-center pointer-events-none text-badger-black-800 font-bold">
                  %
                </div>
              </div>
              {type == "transfer" && (
                <div className="mt-4">
                  <label htmlFor="slipTolerance" className="text-sm mt-2">
                    Destination Address
                  </label>
                  <div className="flex mt-1 text-sm">
                    <button
                      className="hover:bg-zero-green-500/40 bg-zero-green-500/90 rounded-lg p-2 font-bold text-badger-white-400"
                      onClick={() => setDestinationAddress(defaultAddress)}
                    >
                      Default
                    </button>
                    <input
                      type="text"
                      name="destinationAddress"
                      id="destinationAddress"
                      className={
                        "block rounded-lg ml-2 border-1 ring-1 text-badger-black-800 pr-4 w-full font-semibold " +
                        (addressValid
                          ? "focus:border-badger-gray-200 focus:ring-badger-gray-200 ring-transparent"
                          : "border-error-red-400 ring-error-red-400 focus:ring-error-red-400 focus:border-error-red-400")
                      }
                      placeholder="0.1"
                      value={destinationAddress || ""}
                      onChange={(e) => {
                        setDestinationAddress(e.target.value);
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </Transition>
      </div>
    </OutsideClickHandler>
  );
};
