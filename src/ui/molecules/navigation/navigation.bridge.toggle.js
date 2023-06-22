import React from "react";
import { Link } from "react-router-dom";

function NavigationBridgeToggle() {
  return (
    <div
      className={`w-full rounded-t-lg grid grid-cols-2 mb-8 bg-badger-gray-400 align-center font-light text-sm text-center`}
    >
      <Link to="/transfer">
        <div
          data-testid="nav-transfer-toggle"
          className={`py-3 transition ease-in-out duration-150 font-bold border-b-2 ${
            window.location.hash.includes("/transfer")
              ? "text-zero-green-400 border-zero-green-500"
              : "border-transparent hover:bg-zero-green-500/10 text-badger-gray-600"
          }`}
        >
          TRANSFER
        </div>
      </Link>
      <Link to="/release">
        <div
          data-testid="nav-release-toggle"
          className={`py-3 transition ease-in-out duration-150 font-bold border-b-2 ${
            window.location.hash.includes("/release")
              ? "text-zero-green-400 border-zero-green-500"
              : "border-transparent hover:bg-zero-green-500/10 text-badger-gray-600"
          }`}
        >
          RELEASE
        </div>
      </Link>
    </div>
  );
}

export default NavigationBridgeToggle;
