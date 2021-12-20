import ConvertInput from '../atoms/Input'
import { ConversionToolContext } from '../../context/Context'

const Convert = () => {
    
    var formatter = new Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD"
    })
    



    
    return (
        <ConversionToolContext.Consumer>
        { value =>
            <div className="w-fit self-center px-10 py-8 xl:px-0 xl:py-0">
                <div className="w-fit flex ">
                    <ConvertInput value={value.get.value} onChange={value.set.valueInput} />
                    <span className="text-gray-400 font-bold text-3xl">BTC</span>
                </div>
                <div className=" xl:mr-5 italic font-medium tracking-wider w-full text-right ">
                    ~ {formatter.format(value.get.value * 48014.83)}
                </div>
            </div>
        }
        </ConversionToolContext.Consumer>
    )
}

export default Convert