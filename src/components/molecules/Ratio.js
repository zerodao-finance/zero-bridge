import { useState } from "react"
import { FaBtc, FaEthereum } from 'react-icons/fa'
import { ConversionToolContext } from '../../context/Context'



const Ratio = () => {
    return (
        <ConversionToolContext.Consumer>
            { value =>
                <div className="flex flex-col gap-2 xl:w-2/12 pl-4 self-center xl:self-end">
                <p className="font-medium tracking-wider text-xl w-max capitalize text-slate-400">Adjust Ratio</p>
                <div className="flex flex-row">
                    <input type="number" step="1" className="z-30 form-input appearance-none rounded-md ring-1 ring-emerald-300 text-center focus:ring-0 border-0 w-16 min-w-16 mr-10 py-1 font-medium text-lg tracking-wide" value={value.get.ratio} onChange={value.set.ratioInput}/>
                    <span className="self-center flex flex-row gap-4 text-emerald-500"><FaBtc className="fill-emerald-300 scale-150"/> per <FaEthereum className="fill-emerald-300 scale-150"/> </span>
                </div>
                <input type="range" className="z-40 overflow-hidden form-range appearance-none h-1 focus:outline-none focus:ring-0 focus:shadow-none rounded-full bg-slate-400 w-[15rem]" id="range_select" name="ratio" min="0" max="100" step="1" value={value.get.ratio} onChange={value.set.ratioRange}/>
            </div>
            }
        </ConversionToolContext.Consumer>
    )
}
export default Ratio