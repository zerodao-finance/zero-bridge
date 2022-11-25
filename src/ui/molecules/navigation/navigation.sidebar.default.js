import { RiFileListLine, RiExchangeFundsLine } from "react-icons/ri";
import { MdOutlinePending } from "react-icons/md";
import { BiTransfer } from "react-icons/bi";
import { Link } from "react-router-dom";

export const DefaultNavigationSidebar = ({ changeModule }) => {
  return (
    <div className="min-h-full hidden md:block fixed -right-48 hover:right-0 w-[275px] group rounded-l-[1.25rem] shadow-2xl z-50 bg-gradient-to-b from-zero-green-500 to-zero-green-800 transition-all ease-in-out duration-150 text-badger-white-400 font-bold">
      <div className="flex flex-col gap-3 w-full mt-24">
        <Link to="/transfer">
          <button
            className={
              "pl-7 w-full py-4 decoration-2 decoration-white hover:bg-black/20"
            }
            id="bridge"
            onClick={(e) => changeModule(e.currentTarget.id)}
          >
            <div className="flex flex-row items-center">
              <RiExchangeFundsLine size="22px" />
              <div
                className="pl-3 opacity-0 group-hover:opacity-100 transition duration-150"
                id="bridge"
              >
                Bridge Tool
              </div>
            </div>
          </button>
        </Link>
        <Link to="/manage">
          <button
            className={
              "pl-7 w-full py-4 decoration-2 decoration-white hover:bg-black/20"
            }
            id="manage"
            onClick={(e) => changeModule(e.currentTarget.id)}
          >
            <div className="flex flex-row mx-auto">
              <MdOutlinePending size="22px" />
              <div
                className="pl-3 opacity-0 group-hover:opacity-100 transition duration-150"
                id="manage"
              >
                Pending Transactions
              </div>
            </div>
          </button>
        </Link>
        <Link to="/history">
          <button
            className={
              "pl-7 w-full py-4 decoration-2 decoration-white hover:bg-black/20"
            }
            id="history"
            onClick={(e) => changeModule(e.currentTarget.id)}
          >
            <div className="flex flex-row mx-auto">
              <BiTransfer size="22px" />
              <div
                className="pl-3 opacity-0 group-hover:opacity-100 transition duration-150"
                id="history"
              >
                Completed Transactions
              </div>
            </div>
          </button>
        </Link>
        <button
          className="pl-7 w-full py-4 decoration-2 decoration-white hover:bg-black/20"
          onClick={() => window.open("https://docs.zerodao.com")}
        >
          <div className="flex flex-row mx-auto">
            <RiFileListLine size="22px" />
            <div className="pl-3 opacity-0 group-hover:opacity-100 transition duration-150">
              Documentation
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
