import { DefaultInput } from '../../atoms/inputs/input.default'
import { FaEthereum } from 'react-icons/fa'
import { ethers } from 'ethers'

export const BridgeBurnInput = ({ destination, amount, updateDestination, effect, tokenPrice }) => {

    var formatter = new Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD"
    })


    return (<>
        <div className="w-fit self-center px-0 py-0 scale-[0.8] md:scale-[1]">
        <div className="w-fit flex items-center justify-between gap-10 dark:bg-gray-600 bg-gray-100 px-2 rounded-2xl">
            <div>
                <p className="text-[10px] text-gray-500 whitespace-nowrap mb-1">FROM</p>
                <span className="flex items-center gap-2">
                    <FaEthereum className="w-max h-[2rem] fill-gray-400"/>
                    <p className="dark:text-white text-gray-500">
                    ETH
                     </p>
                </span>
            </div>
            <DefaultInput value={amount} onChange={effect}/>
        </div>
        <div className=" xl:mr-5 italic tracking-wider w-full text-right text-[10px] text-badger-yellow-neon-400">
            ~ { tokenPrice && formatter.format(amount * ethers.utils.formatUnits(tokenPrice, 6)) }
        </div> 
    </div> 
        <div className="w-fit self-center px-0 py-0 scale-[0.8] md:scale-[1]">
        <div className="w-fit flex items-center justify-between gap-10 dark:bg-gray-600 bg-gray-100 px-2 rounded-2xl">
            <DefaultInput value={destination} onChange={updateDestination} type={ 'text' }/>
        </div>
    </div> 
    
    </>)
}
