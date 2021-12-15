import Convert from './Convert'
import Ratio from './Ratio'
import Result from './Result'
import {RiExchangeFundsFill} from 'react-icons/ri'
import { ConversionToolContext } from '../../context/WalletContext'

const ConvertBox = () => {
    return (
            <ConversionToolContext.Consumer>
                {value =>
                <div className="rounded-full container flex mx-auto py-2 h-max shadow-2xl gap-10 justify-between bg-neutral-100 transition-all duration-100">
                    <div className="flex divide-x gap-10 justify-start py-2 grow">
                        <Convert />
                        <Ratio />
                    </div>
                    <Result />
                    <button className="w-fit" onClick={value.functions.handleSubmit}>
                            <RiExchangeFundsFill className="scale-[5] hover:scale-[5.5] translate-x-1 fill-emerald-300 text-emerald-300"/>
                    </button>
                </div>
                }
            </ConversionToolContext.Consumer>
    )
}
export default ConvertBox