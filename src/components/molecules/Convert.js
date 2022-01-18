import ConvertInput from '../atoms/Input'
import { FaBitcoin } from 'react-icons/fa'
import {useBridgeContext} from '../../core/instance'
const Convert = () => {
    
    var formatter = new Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD"
    })
    
    const {state, dispatch} = useBridgeContext()



    
    return (

        
            <div className="w-fit self-center px-0 py-0">
                <div className="w-fit flex items-center justify-between gap-10 dark:bg-gray-600 bg-gray-50 px-2 rounded-2xl">
                    <div>
                        <p className="text-[10px] text-gray-500 whitespace-nowrap mb-1">FROM</p>
                        <span className="flex items-center gap-2">
                            <FaBitcoin className="w-max h-[2rem] fill-gray-400"/>
                            <p className="dark:text-white text-gray-500">BTC</p>
                        </span>
                    </div>
                    <ConvertInput value={state.value} onChange={(e) => dispatch({type: 'changeValue', event: e})} />
                </div>
                <div className=" xl:mr-5 italic font-medium tracking-wider w-full text-right text-xs text-emerald-300">
                    ~ {formatter.format(state.value * 48014.83)}
                </div>
            </div>
    )
}

export default Convert