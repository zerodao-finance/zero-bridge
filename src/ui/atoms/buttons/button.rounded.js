import * as React from "react"; // Needs to be here for testing

export const PrimaryRoundedButton = ({ active, label, action, className }) => {
  const getClass = () => {
    if (active) {
      return "hover:bg-zero-green-500/60 bg-zero-green-500 text-badger-white-400";
    }
    return "cursor-not-allowed bg-badger-gray-400 text-badger-gray-200";
  };
  return (
    <>
      <button
        data-testid="rounded-button"
        onClick={
          active
            ? action
            : () => {
                return;
              }
        }
        className={`${getClass()} ${className} px-3 py-1 transition ease-in-out duration-150 font-medium rounded-lg w-full truncate text-sm md:text-base`}
        disabled={!active}
      >
        {label}
      </button>
    </>
  );
};
