export const DefaultInput = ({ value, onChange, onClick }) => {
	if (!value) {
		value = 0;
	}
	return (
		<div className="w-full text-right p-2">
			<input
				id="transfer-amount"
				className="dark:text-white form-input !outline-offset-0 !outline-1 text-right bg-transparent border !border-gray-600 focus:!border-[#2D9548] focus:!outline-[#2D9548] dark:focus:!border-[#2D9548] dark:!border-white focus:ring-0 text-md font-medium text-gray-600 z-40 w-full rounded-xl"
				type="number"
				min="0"
				value={value}
				onChange={onChange}
				onClick={onClick}
			/>
		</div>
	);
};
