export const PrimaryRoundedButton = ({ active, label, action }) => {
	const getClass = () => {
		if (active) {
			return 'transition ease-in-out duration-150 px-2 py-1 hover:bg-main-green/10 font-bold w-full rounded-xl border border-main-green text-main-green w-full truncate text-[13px] md:text-[15px]';
		}
		return 'transition ease-in-out duration-150 px-2 py-1 hover:bg-alert-red/10 font-bold w-full rounded-xl border border-alert-red text-alert-red w-full truncate text-[13px] md:text-[15px]';
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
