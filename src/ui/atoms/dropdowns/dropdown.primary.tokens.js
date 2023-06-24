import { Fragment, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { ReactComponent as BTC } from "../../../assets/svg-coins/btc.svg";
import { ReactComponent as ZEC } from "../../../assets/svg-coins/zec.svg";
import { classNames } from "../../../api/utils/textUtilities";
import { determineIcon } from "./dropdown.tokens";

function PrimaryTokenDropdown({
  primaryToken,
  setPrimaryToken,
  tokensRemoved = [],
  tokensDisabled = [],
}) {
  const items = [
    {
      text: "BTC",
      icon: BTC,
    },
    {
      text: "ZEC",
      icon: ZEC,
    },
  ];

  const renderTokens = () => {
    return items.filter((el) => !tokensRemoved.includes(el.text));
  };

  useEffect(() => {}, [primaryToken]);

  return (
    <Menu as="div" className="relative inline-block text-left max-w-[100%]">
      <Menu.Button
        className="inline-flex w-full rounded-md px-4 py-2 bg-transparent text-sm font-medium text-badger-white-400 items-center focus:outline-none justify-between"
        style={{ minWidth: "150px" }}
      >
        <span className="flex items-center max-w-[100%]">
          {determineIcon({ token: primaryToken, items })}
          <p className="dark:text-badger-white-400 text-gray-500">
            {primaryToken}
          </p>
        </span>
        {renderTokens().length > 1 && (
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        )}
      </Menu.Button>

      {renderTokens().length > 1 && (
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            data-testid="token-dropdown"
            className="z-50 origin-top-right absolute w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
          >
            {renderTokens().map((item, index) => (
              <div
                key={index}
                onClick={(e) => {
                  if (!tokensDisabled.includes(e.target.innerText)) {
                    setPrimaryToken(e.target.innerText);
                  }
                }}
              >
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={classNames(
                        active && !tokensDisabled.includes(item.text)
                          ? "bg-zero-green-500 text-white"
                          : "text-neutral-700",
                        tokensDisabled.includes(item.text)
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer",
                        `font-medium flex items-center px-4 py-2 text-sm transition duration-150 ${
                          index === 0 ? "rounded-t-md" : ""
                        } ${
                          index === renderTokens().length - 1
                            ? "rounded-b-md"
                            : ""
                        }`
                      )}
                    >
                      <item.icon
                        key={`${index}-${item.text}`}
                        className="mr-3 h-6 w-6"
                        aria-hidden="true"
                      />
                      <span>{item.text}</span>
                    </div>
                  )}
                </Menu.Item>
              </div>
            ))}
          </Menu.Items>
        </Transition>
      )}
    </Menu>
  );
}

export default PrimaryTokenDropdown;
