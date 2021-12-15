import { useState } from "react"
import { FaBtc, FaEthereum } from 'react-icons/fa'
import { ConversionToolContext } from '../../context/WalletContext'



const Ratio = () => {
    const [ratio, setRatio] = useState(0)
    const adjust = (event) => {
        setRatio(event.target.value)
    }

    const inputChange = (event) => {
        isNaN(event.target.value) || event.target.value > 100 ? "" : setRatio(event.target.value)
    }


    return (
        <ConversionToolContext.Consumer>
            { value =>
                <div className="flex flex-col gap-2 w-2/12 pl-4 self-end">
                <p className="font-medium tracking-wider text-xl w-max capitalize text-slate-400">Adjust Ratio</p>
                <div className="flex flex-row">
                    <input type="number" step="1" className="form-input focus:ring-0 border-0 w-14 p-0 font-medium text-lg tracking-wide" value={value.data.ratio} onChange={value.functions.typeRatio}/>
                    <span className="self-center flex flex-row gap-4 text-emerald-500"><FaEthereum className="fill-emerald-300 scale-150"/> per <FaBtc className="fill-emerald-300 scale-150"/> </span>
                </div>
                <input type="range" className="overflow-clip form-range appearance-none h-1 focus:outline-none focus:ring-0 focus:shadow-none rounded-full bg-slate-400 w-[15rem]" id="range_select" name="ratio" min="0" max="100" step="1" value={value.data.ratio} onChange={value.functions.setRatio}/>
            </div>
            }
        </ConversionToolContext.Consumer>
    )
}
export default Ratio