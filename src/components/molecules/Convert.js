import ConvertInput from '../atoms/Input'
import { ConversionToolContext } from '../../context/Context'
import { FaBitcoin } from 'react-icons/fa'
const Convert = () => {
    
    var formatter = new Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD"
    })
    



    
    return (
        <ConversionToolContext.Consumer>
        { value =>
            <div className="w-fit self-center px-0 py-0">
                <div className="w-fit flex items-center justify-between gap-10">
                    <FaBitcoin className="w-max h-[2rem] fill-yellow-400"/>
                    <ConvertInput value={value.get.value} onChange={value.set.valueInput} />
                </div>
                <div className=" xl:mr-5 italic font-medium tracking-wider w-full text-right text-xs text-emerald-300">
                    ~ {formatter.format(value.get.value * 48014.83)}
                </div>
            </div>
        }
        </ConversionToolContext.Consumer>
    )
}

export default Convert