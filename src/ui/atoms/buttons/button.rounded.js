export const PrimaryRoundedButton = ({ active, label, action }) => {
	const getClass = () => {
		if (active) {
			return 'transition ease-in-out duration-150 px-2 py-1 hover:bg-badger-yellow-400/10 active:bg-badger-yellow-400/40 font-bold w-full rounded-xl border border-badger-yellow-400 text-badger-yellow-400 w-full truncate text-[13px] md:text-[15px]';
		}
		return 'transition ease-in-out duration-150 px-2 py-1 font-bold w-full rounded-xl border border-badger-yellow-400/10 text-badger-yellow-400/10 w-full truncate text-[13px] md:text-[15px]'; 
	};
	return (
		<>
			<button
				onClick={
					active
						? action
						: () => {
								return;
						  }
				}
				className={getClass()}
			>
				{label}
			</button>
		</>
	);
};
