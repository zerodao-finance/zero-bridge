import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { ReactComponent as ETH } from '../../../assets/svg-coins/eth.svg'
import { ReactComponent as renBTC } from '../../../assets/svg-coins/renbtc.svg'
import { ReactComponent as WBTC } from '../../../assets/svg-coins/wbtc.svg'
import { ReactComponent as ibBTC } from '../../../assets/svg-coins/ibbtc.svg'
import { ReactComponent as USDC } from '../../../assets/svg-coins/usdc.svg'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

/* 
* How to use 'TokenDropdown' component
* Create 'useState' variables and pass it to 'TokenDropdown' 
* (props are 'token' and 'setToken' where 'token' is a string of the token symbol)

* Additional Props: 'tokensRemoved' which is an array of tokens you do not want in dropdown
* Default Dropdown Items: ETH, WBTC, ibBTC, renBTC, USDC
*/
function TokenDropdown({ token = "renBTC", setToken, tokensRemoved = [] }) {
    const items = [
        {
            text: "renBTC",
            icon: renBTC
        },
        {
            text: "WBTC",
            icon: WBTC
        },
        {
            text: "ibBTC",
            icon: ibBTC
        },
        {
            text: "ETH",
            icon: ETH
        },
        {
            text: "USDC",
            icon: USDC
        }
    ]

    const determineIcon = (_token) => {
        const icon = items.map((item, index) => {
            if(item.text.toLowerCase() === _token.toLowerCase()){
                return <item.icon key={index} className="h-[2rem] fill-gray-400 w-fit mr-3" />;
            }
        })
        return icon;
    }

  return (
    <Menu as="div" className="relative inline-block text-left max-w-[100%]">
        <Menu.Button className="inline-flex justify-center w-full rounded-md px-4 py-2 bg-transparent text-sm font-medium text-white items-center focus:outline-none justify-between" style={{minWidth: "150px"}}>
            <span className="flex items-center max-w-[100%]">
                {determineIcon(token)}
                <p className="dark:text-white text-gray-500">
                    {token}
                </p>
            </span>
            <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right py-1 absolute right-16 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
            {items.filter(el => !tokensRemoved.includes(el.text)).map((item, index) => (
                <div key={index} onClick={(e) => setToken(e.target.innerText)}>
                    <Menu.Item>
                        {({ active }) => (
                        <div
                            className={classNames(
                            active ? 'bg-badger-yellow-200 text-gray-900' : 'text-gray-700',
                                'flex items-center px-4 py-2 text-sm cursor-pointer'
                            )}
                        >
                            <item.icon key={`${index}-${item.text}`} className="mr-3 h-6 w-6 group-hover:text-gray-500 text-gray-400" aria-hidden="true" />
                            <span>{item.text}</span>
                        </div>
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
