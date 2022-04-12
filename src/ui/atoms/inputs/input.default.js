export const DefaultInput = ({ value, onChange, type, onClick }) => {
	if (!value) {
		value = 0;
	}
	return (
		<div className="w-full text-right p-2">
			<input
				id="transfer-amount"
				className="dark:text-white form-input !outline-offset-0 !outline-1 text-right bg-transparent border !border-gray-600 focus:!border-badger-yellow-neon-400 focus:!outline-badger-yellow-neon-400 dark:focus:!border-badger-yellow-neon-400 dark:!border-white focus:ring-0 text-md font-medium text-gray-600 z-40 w-full rounded-xl"
				type={ type || 'number' }
				min="0"
				value={value}
				onChange={onChange}
				onClick={onClick}
				style={{width: "130px"}}
			/>
		</div>
	);
};
