import React from "react";

export const PrimaryRoundedButton = ({ active, label, action }) => {
  const getClass = () => {
    if (active) {
      return "transition ease-in-out duration-150 px-2 py-1 hover:bg-badger-yellow-400/40 bg-badger-yellow-400 font-bold w-full rounded-lg text-badger-black-700 w-full truncate text-sm md:text-base";
    }
    return "cursor-not-allowed transition ease-in-out duration-150 px-2 py-1 font-bold w-full rounded-lg bg-badger-gray-400 text-badger-gray-200 w-full truncate text-sm md:text-base";
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
        data-testid="rounded-button"
      >
        {label}
      </button>
    </>
  );
};
