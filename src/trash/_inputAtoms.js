 import ConvertInput from '../atoms/Input'
 import { library } from '../utils/tokens'
 import { useEffect, useState } from 'react'
 import { ethers, BigNumber } from 'ethers'
 import _ from 'lodash'

 const RequestInput = ({_token, _context}) => {

     const [tokenPrice, setPrice] = useState(null)
     const token = library[_token]
     
     var formatter = new Intl.NumberFormat('en-US', {
         style: "currency",
         currency: "USD"
        })
        
    useEffect(async () => {
        setPrice(ethers.utils.formatUnits((await token.priceFeed).toString(), 6))
    })
    const {state, dispatch} = _context()
    
     return (
        <div className="w-fit self-center px-0 py-0">
            <div className="w-fit flex items-center justify-between gap-10 dark:bg-gray-600 bg-gray-50 px-2 rounded-2xl">
                <div>
                    <p className="text-[10px] text-gray-500 whitespace-nowrap mb-1">FROM</p>
                    <span className="flex items-center gap-2">
                        {token.icon}
                        <p className="dark:text-white text-gray-500">
                        {token.symbol}
                         </p>
                    </span>
                </div>
                <ConvertInput value={state.value} onChange={(e) => dispatch({type: "changeValue", event: e})} />
            </div>
	     <div><label>Pay 0.1% for collateralized quick transfer (1 confirmation) <input type="checkbox" checked={ state.quick } onChange={ (e) => dispatch({type: 'changeQuick' }) } /></label></div>
            <div className=" xl:mr-5 italic font-light tracking-wider w-full text-right text-[10px] text-emerald-500">
                ~ USD { tokenPrice && formatter.format(state.value * tokenPrice)}
            </div> 
        </div> 
     )
 }

 export default RequestInput