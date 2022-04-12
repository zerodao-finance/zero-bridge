/* This example requires Tailwind CSS v2.0+ */
import { RiFileListLine, RiExchangeFundsLine } from 'react-icons/ri';
import { MdOutlinePending } from 'react-icons/md';
import { BiTransfer } from 'react-icons/bi';

export function MobileNavigationSidebar({ changeModule }) {
	return (
		<nav className="space-y-8" aria-label="Sidebar">
			<div className="flex flex-row gap-3 ">
				<RiExchangeFundsLine className="h-[1.2rem] w-[1.2rem]" />
				<button onClick={() => { changeModule('bridge') }}>Bridge Tool</button>
			</div>
			<div className="flex flex-row gap-3 ">
				<MdOutlinePending className="h-[1.2rem] w-[1.2rem]" />

				<button onClick={() => { changeModule("manage") }}>Manage Transactions</button>
			</div>
			<div className="flex flex-row gap-3 ">
				<BiTransfer className="h-[1.2rem] w-[1.2rem]" />

				<button onClick={() => { changeModule("history")}}>History</button>
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
