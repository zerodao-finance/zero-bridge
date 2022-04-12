import { DefaultInput } from '../../atoms/inputs/input.default'
import { ethers } from 'ethers'
import TokenDropdown from '../../atoms/dropdowns/dropdown.tokens'

export const BridgeTransferInput = ({ amount, effect, tokenPrice, setToken, token }) => {
    // How to use 'TokenDropdown' component
    // Create 'useState' variables and pass it to 'TokenDropdown' 
    // (props are 'token' and 'setToken' where 'token' is a string of the token symbol)

    // Additional Props: 'tokensRemoved' which is an array of tokens you do not want in dropdown
    // Default Dropdown Items: ETH, WBTC, ibBTC, renBTC, USDC

    var formatter = new Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD"
    })

    return (
        <div className="self-center px-0 py-0 w-full">
            <div className="w-100 flex items-center justify-between gap-5 dark:bg-badger-gray-500 bg-gray-100 px-2 rounded-2xl">
                <div className="flex items-center pl-2">
                    <p className="text-[10px] text-gray-300 whitespace-nowrap">TO</p>
                    <TokenDropdown token={token} setToken={setToken} /> 
                </div>
                <DefaultInput value={amount} onChange={effect}/>
            </div>
            <div className=" xl:mr-5 italic tracking-wider w-full text-right text-[10px] text-badger-yellow-neon-400">
                ~ { tokenPrice && formatter.format(amount * ethers.utils.formatUnits(tokenPrice, 6)) }
            </div> 
        </div> 
    )
}