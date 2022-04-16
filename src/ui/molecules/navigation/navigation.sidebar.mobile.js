/* This example requires Tailwind CSS v2.0+ */
import { RiFileListLine, RiExchangeFundsLine } from 'react-icons/ri';
import { MdOutlinePending } from 'react-icons/md';
import { BiTransfer } from 'react-icons/bi';

export function MobileNavigationSidebar({ changeModule }) {
	function navigate(e){
        changeModule(e.target.id)
    }

	return (
		<nav className="space-y-8" aria-label="Sidebar">
			<div onClick={navigate} className="flex flex-row gap-3 " id="bridge">
				<RiExchangeFundsLine className="h-[1.2rem] w-[1.2rem]" />
				<button onClick={navigate} id="bridge">Bridge Tool</button>
			</div>
			<div onClick={navigate} className="flex flex-row gap-3 " id="manage">
				<MdOutlinePending className="h-[1.2rem] w-[1.2rem]" />

				<button onClick={navigate} id="manage">Manage Transactions</button>
			</div>
			<div onClick={navigate} className="flex flex-row gap-3 " id="history">
				<BiTransfer className="h-[1.2rem] w-[1.2rem]" />

				<button onClick={navigate} id="history">History</button>
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
