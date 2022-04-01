import { DefaultInput } from '../../atoms/inputs/input.default'
import { FaBitcoin } from 'react-icons/fa'
import { ethers } from 'ethers'
export const BridgeTransferInput = ({ amount, effect, tokenPrice }) => {

    var formatter = new Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD"
    })


    return (
        <div className="self-center px-0 py-0 scale-[0.8] md:scale-[1] w-full">
        <div className="w-100 flex items-center justify-between gap-10 dark:bg-gray-600 bg-gray-100 px-2 rounded-2xl">
            <div className="pt-0 pl-[.5rem] pr-[.5rem] pb-[.5rem]">
                <p className="text-[10px] text-gray-500 whitespace-nowrap">FROM</p>
                <span className="flex items-center gap-2">
                    <FaBitcoin className="w-max h-[2rem] fill-gray-400"/>
                    <p className="dark:text-white text-gray-500">
                    BTC
                     </p>
                </span>
            </div>
            <DefaultInput value={amount} onChange={effect}/>
        </div>
        <div className=" xl:mr-5 italic tracking-wider w-full text-right text-[10px] text-main-green">
            ~ { tokenPrice && formatter.format(amount * ethers.utils.formatUnits(tokenPrice, 6)) }
        </div> 
    </div> 
    )
}