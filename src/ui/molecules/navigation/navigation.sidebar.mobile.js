/* This example requires Tailwind CSS v2.0+ */
import { RiFileListLine, RiExchangeFundsLine } from "react-icons/ri";
import { MdOutlinePending } from "react-icons/md";
import { BiTransfer } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export function MobileNavigationSidebar() {
  const navigate = useNavigate();

  function action(e) {
    if (e.target.id === "bridge") {
      navigate(`/transfer`);
    } else {
      navigate(`/${e.target.id}`);
    }
  }

  return (
    <nav className="space-y-8" aria-label="Sidebar">
      <div onClick={action} className="flex flex-row gap-3 " id="bridge">
        <RiExchangeFundsLine className="h-[1.2rem] w-[1.2rem]" />
        <button onClick={action} id="bridge">
          Bridge Tool
        </button>
      </div>
      <div onClick={action} className="flex flex-row gap-3 " id="manage">
        <MdOutlinePending className="h-[1.2rem] w-[1.2rem]" />

        <button onClick={action} id="manage">
          Manage Transactions
        </button>
      </div>
      <div onClick={action} className="flex flex-row gap-3 " id="history">
        <BiTransfer className="h-[1.2rem] w-[1.2rem]" />

        <button onClick={action} id="history">
          History
        </button>
      </div>
      <div className="flex flex-row gap-3 ">
        <RiFileListLine className="h-[1.2rem] w-[1.2rem]" />
        <a href="https://docs.zerodao.com" target="_blank">
          <button>Documentation</button>
        </a>
      </div>
    </nav>
  );
}
