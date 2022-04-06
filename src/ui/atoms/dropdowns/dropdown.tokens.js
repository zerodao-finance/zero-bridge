import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { FaBitcoin, FaEthereum } from 'react-icons/fa'
import { IoLogoUsd } from 'react-icons/io'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function TokenDropdown({ token = "BTC", setToken, tokensRemoved = [] }) {
    const items = [
        {
            text: "BTC",
            icon: FaBitcoin
        },
        {
            text: "WBTC",
            icon: FaBitcoin
        },
        {
            text: "ibBTC",
            icon: FaBitcoin
        },
        {
            text: "renBTC",
            icon: FaBitcoin
        },
        {
            text: "ETH",
            icon: FaEthereum
        },
        {
            text: "USDC",
            icon: IoLogoUsd
        }
    ]

    const determineIcon = () => {
        const icon = items.map((item) => {
            if(item.text === token){
                return <item.icon className="w-max h-[2rem] fill-gray-400" />;
            }
        })
        return icon;
    }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md px-4 py-2 bg-transparent text-sm font-medium text-white items-center focus:outline-none">
            <span className="flex items-center gap-2">
                {determineIcon()}
                <p className="dark:text-white text-gray-500">
                    {token}
                </p>
            </span>
            <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
            {items.filter(el => !tokensRemoved.includes(el.text)).map((item) => (
                <div className="py-1" onClick={(e) => setToken(e.target.innerText)}>
                    <Menu.Item>
                        {({ active }) => (
                        <a
                            href="#"
                            className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'group flex items-center px-4 py-2 text-sm'
                            )}
                        >
                            <item.icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                            {item.text}
                        </a>
                        )}
                    </Menu.Item>
                </div>
            ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default TokenDropdown;