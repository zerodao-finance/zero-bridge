export const DefaultInput = ({
  value,
  onChange,
  type,
  onClick,
  disabled,
  loading,
  style,
  maxW,
  placeholder,
  withBorder = true,
}) => {
  return (
    <div className={`w-full text-right ${withBorder && "p-2"}`}>
      <input
        className={`${
          disabled
            ? `${
                loading && "animate-pulse"
              } dark:text-gray-300 form-input !outline-offset-0 !outline-1 
				text-right bg-transparent focus:ring-0 text-md font-medium text-gray-600 z-40 w-full rounded-xl`
            : `dark:text-white form-input !outline-offset-0 !outline-1 text-right bg-transparent 
				focus:!outline-badger-yellow-neon-400 focus:ring-0 text-md font-medium text-gray-600 z-40 w-full rounded-xl 
				${
          withBorder
            ? "dark:!border-white dark:focus:!border-badger-yellow-neon-400 border !border-gray-600 focus:!border-badger-yellow-neon-400"
            : "border-0"
        }`
        }`}
        type={type || "number"}
        min="0"
        value={value}
        onChange={onChange}
        onClick={onClick}
        disabled={disabled}
        style={{ maxWidth: maxW }}
        placeholder={placeholder || "0"}
        autoComplete="new-password" // does not allow for autofill
      />
    </div>
  );
};
