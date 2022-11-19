/* This example requires Tailwind CSS v2.0+ */
import { RiFileListLine, RiExchangeFundsLine } from "react-icons/ri";
import { MdOutlinePending } from "react-icons/md";
import { BiTransfer } from "react-icons/bi";
import { Link } from "react-router-dom";

export function MobileNavigationSidebar({ changeModule }) {
  return (
    <nav aria-label="Sidebar" className="text-badger-white-400">
      <Link to="/transfer">
        <div
          className="flex flex-row gap-3 py-3 items-center"
          id="bridge"
          onClick={(e) => changeModule(e.currentTarget.id)}
        >
          <RiExchangeFundsLine className="h-[1.2rem] w-[1.2rem]" />
          <button id="bridge">Bridge Tool</button>
        </div>
      </Link>
      <Link to="/manage">
        <div
          className="flex flex-row gap-3 py-3 items-center"
          id="manage"
          onClick={(e) => changeModule(e.currentTarget.id)}
        >
          <MdOutlinePending className="h-[1.2rem] w-[1.2rem]" />
          <button id="manage">Pending Transactions</button>
        </div>
      </Link>
      <Link to="/history">
        <div
          className="flex flex-row gap-3 py-3 items-center"
          id="history"
          onClick={(e) => changeModule(e.currentTarget.id)}
        >
          <BiTransfer className="h-[1.2rem] w-[1.2rem]" />

          <button id="history">Completed Transactions</button>
        </div>
      </Link>
      <div className="flex flex-row gap-3 py-3 items-center">
        <RiFileListLine className="h-[1.2rem] w-[1.2rem]" />
        <a href="https://docs.zerodao.com" target="_blank" rel="noreferrer">
          <button>Documentation</button>
        </a>
      </div>
    </nav>
  );
}
