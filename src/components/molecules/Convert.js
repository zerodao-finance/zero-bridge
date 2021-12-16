import ConvertInput from '../atoms/Input'
import { useState } from 'react'
// import { ConversionToolContext } from '../../context/WalletContext'
import { ContractContext, Web3Context, ConversionToolContext } from '../../context/Context'

const Convert = () => {
    const [input, setInput] = useState(0.0)
    const [unit, switchUnit] = useState("BTC")
    var formatter = new Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD"
    })
    function setValue(event) {
        if (!isNaN(event.nativeEvent.data) || '.'){
            event.target.value == '' ? setInput(0.0) :
            setInput(event.target.value)
            return
        } else {
            return
        }
    }



    function clear() {
        if (input == 0) {
            setInput('')
        }
    }
    return (
        <ConversionToolContext.Consumer>
        { value =>
            <div className="w-fit">
                <div className="w-fit">
                    <ConvertInput value={value.get.value} onChange={value.set.valueInput} onClick={clear}/>
                    <span className="text-gray-400 font-bold lg:text-3xl text-xl">{unit}</span>
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