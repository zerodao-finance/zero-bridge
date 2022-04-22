export const PrimaryRoundedButton = ({ active, label, action }) => {
	const getClass = () => {
		if (active) {
			return 'transition ease-in-out duration-150 px-2 py-1 hover:bg-badger-yellow-400/40 bg-badger-yellow-400 font-bold w-full rounded-lg text-badger-black-800 w-full truncate text-[13px] md:text-[15px]';
		}
		return 'transition ease-in-out duration-150 px-2 py-1 font-bold w-full rounded-lg bg-badger-gray-400 text-badger-gray-200 w-full truncate text-[13px] md:text-[15px]'; 
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
