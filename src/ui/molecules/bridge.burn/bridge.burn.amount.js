import { useState } from 'react'
import { DefaultInput } from '../../atoms/inputs/input.default'
import { FaEthereum } from 'react-icons/fa'
import { ethers } from 'ethers'
import TokenDropdown from '../../atoms/dropdowns/dropdown.tokens'

export const BridgeBurnInput = ({ destination, amount, setToken, token, updateDestination, effect, tokenPrice }) => {
    var formatter = new Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD"
    })

    const formattedAmount = () => {
        switch(token) {
            case 'USDC':
                return formatter.format(amount)
            default:
                return formatter.format(amount * ethers.utils.formatUnits(tokenPrice, 5))
        }
    }

    return (
        <>
            <div className="w-fit self-center scale-[0.8] md:scale-[1] z-10">
                <div className="w-fit flex items-center justify-between gap-2 dark:bg-badger-gray-500 bg-gray-100 p-2 rounded-2xl">
                    <div className="flex items-center pl-2">
                        <p className="text-[10px] text-gray-300 whitespace-nowrap mt-1">FROM</p>
                        {/* Look in bridge.transfer.js for how to use TokenDropdown */}
                        <TokenDropdown token={token} setToken={setToken} tokensRemoved={["ETH", "BTC"]} />
                    </div>
                    <DefaultInput value={amount} onChange={effect}/>
                </div>
                <div className=" xl:mr-5 italic tracking-wider w-full text-right text-[10px] text-badger-yellow-neon-400">
                    ~ { tokenPrice && formattedAmount() }
                </div> 
                {/* </div> 
                    <div className="w-fit self-center px-0 py-0 scale-[0.8] md:scale-[1]">
                    <div className="w-fit flex items-center justify-between gap-10 dark:bg-badger-gray-500 bg-gray-100 px-2 rounded-2xl">
                        <DefaultInput value={destination} onChange={updateDestination} type={ 'text' }/>
                    </div>
                </div>  */}
            </div>
        
        </>
    )
}
