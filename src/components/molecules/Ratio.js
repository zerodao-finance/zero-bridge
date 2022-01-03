import { useState } from "react"
import { FaBtc, FaEthereum } from 'react-icons/fa'
import { ConversionToolContext } from '../../context/Context'



const Ratio = () => {
    return (
        <ConversionToolContext.Consumer>
            { value =>
                <div className="flex flex-col gap-2 self-center text-black dark:text-white">
                    <div className="flex flex-row w-full justify-between px-5">
                        <span className="flex items-center"><FaEthereum className="fill-gray-900 dark:fill-gray-300 h-[1.3rem] w-max text-xs"/><p className="text-xs">{`${value.get.ratio}%`}</p></span>
                        <span className="flex items-center font-bold">ren<FaBtc className="fill-gray-900 dark:fill-gray-300 h-[1.3rem] w-max"/><p className="text-xs">{`${100-value.get.ratio}%`}</p></span> 
                    </div>
                    <input type="range" className="z-40 overflow-hidden form-range appearance-none h-1 focus:outline-none focus:ring-0 focus:shadow-none rounded-full bg-slate-400 w-[15rem]" id="range_select" name="ratio" min="0" max="100" step="1" value={value.get.ratio} onChange={value.set.ratioRange}/>
                </div>
            }
        </ConversionToolContext.Consumer>
    )
}
export default Ratio