import Convert from './Convert'
import Ratio from './Ratio'
import Result from './Result'
import {RiExchangeFundsFill} from 'react-icons/ri'
import { ConversionToolContext } from '../../context/Context'

const ConvertBox = () => {
    return (
            <ConversionToolContext.Consumer>
                {value =>
                <div className="rounded-[100px] xl:rounded-full container flex flex-col xl:flex-row  mx-auto py-2 h-max shadow-2xl gap-10 justify-between bg-neutral-100 dark:bg-gray-700 dark:text-white transition-all duration-100 min-w-full">
                    <div className="flex flex-col xl:flex-row divide-y xl:divide-x xl:divide-y-0 xl:gap-10 justify-start py-2 grow">
                        <Convert />
                        <Ratio />
                    </div>
                    <Result />
                    <button className="w-fit self-center" onClick={value.set.handleSubmit}>
                            <RiExchangeFundsFill className="scale-[5] hover:scale-[5.5] translate-x-1 fill-emerald-300 text-emerald-300 "/>
                    </button>
                </div>
                }
            </ConversionToolContext.Consumer>
    )
}
export default ConvertBox
