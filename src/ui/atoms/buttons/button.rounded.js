export const PrimaryRoundedButton = ({ active, label, action }) => {
	const getClass = () => {
		if (active) {
			return 'transition ease-in-out duration-150 px-2 py-1 hover:bg-badger-yellow-400/80 active:bg-badger-yellow-400/40 font-bold w-full rounded-md bg-badger-yellow-400 text-badger-black-800 w-full truncate text-[13px] md:text-[15px]';
		}
		return 'transition ease-in-out duration-150 px-2 py-1 font-bold w-full rounded-md text-badger-gray-200 bg-badger-gray-400 w-full truncate text-[13px] md:text-[15px]'; 
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
