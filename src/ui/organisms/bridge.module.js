import { BridgeTransferModule } from "../molecules/bridge.transfer";
import { BridgeBurnModule } from "../molecules/bridge.burn/bridge.burn";
import { BridgeLoadingWallet } from "../molecules/bridge.transfer/bridge.loading.wallet";
import { useBridgeInput } from "../../api/global/interfaces/interface.bridge.transfer";
import { useBridgePage } from "../../api/global/interfaces/interface.bridge";
import Disclaimer from "./Disclaimer";
import { Route, Routes, Link } from "react-router-dom";
import { SlippageInput } from "../molecules/bridge.gateway/slippage.input.gateway";

export const BridgeModule = ({ wallet }) => {
  const { getTransferMode, getTransferSlippageProps } = useBridgeInput();
  const { getBridgePageProps } = useBridgePage();
  const { tcSigned } = getBridgePageProps();

  return !tcSigned ? (
    <Disclaimer />
  ) : (
    <div className="h-fit w-fit pb-8 grid bg-badger-black-500 rounded-lg justify-center text-badger-white-400 min-w-[370px]">
      <div
        className={`w-full rounded-t-lg grid grid-cols-2 mb-8 bg-badger-gray-400 align-center font-light text-sm text-center max-h-11 min-w-[370px]`}
      >
        <Link to="/transfer">
          <div
            className={`py-2.5 rounded-tl-lg cursor-pointer ${
              window.location.hash.includes("/transfer")
                ? "transition ease-in-out duration-150 text-black border-b-2 border-badger-yellow-400 dark:text-badger-yellow-400 font-bold"
                : "transition ease-in-out duration-150 text-black border-b-2 border-transparent hover:bg-badger-yellow-400/10 dark:text-badger-gray-600 font-bold"
            }`}
          >
            TRANSFER
          </div>
        </Link>
        <Link to="/release">
          <div
            className={`py-2.5 rounded-tr-lg cursor-pointer ${
              window.location.hash.includes("/release")
                ? "transition ease-in-out duration-150 text-black border-b-2 border-badger-yellow-400 dark:text-badger-yellow-400 font-bold"
                : "transition ease-in-out duration-150 text-black border-b-2 border-transparent hover:bg-badger-yellow-400/10 dark:text-badger-gray-600 font-bold"
            }`}
          >
            RELEASE
          </div>
        </Link>
      </div>
      <span className="grid px-8">
        {wallet ? (
          <BridgeLoadingWallet />
        ) : (
          <>
            <Routes>
              <Route
                path="/transfer/*"
                element={
                  <div className="grid">
                    <span className="w-full select-none">
                      <SlippageInput {...getTransferSlippageProps()} />
                    </span>
                    <BridgeTransferModule {...getTransferMode()} />
                  </div>
                }
              />
              <Route
                path="/release/*"
                element={
                  <div className="grid">
                    <span className="w-full select-none">
                      <SlippageInput {...getTransferSlippageProps()} />
                    </span>
                    <BridgeBurnModule />
                  </div>
                }
              />
            </Routes>
          </>
        )}
      </span>
    </div>
  );
};
