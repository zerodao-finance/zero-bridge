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
            <div className="w-fit">
                <div className="w-fit">
                    <ConvertInput value={value.get.value} onChange={value.set.valueInput} />
                    <span className="text-gray-400 font-bold lg:text-3xl text-xl">BTC</span>
                </div>
                <div className="text-right mr-5 italic font-medium tracking-wider">
                    ~ {formatter.format(value.get.value * 48014.83)}
                </div>
            </div>
        }
        </ConversionToolContext.Consumer>
    )
}

export default Convert