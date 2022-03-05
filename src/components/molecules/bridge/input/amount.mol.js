import { ConvertInput } from '../../../atoms/inputs'
import { FaBitcoin } from 'react-icons/fa'
import { library } from '../../../utils/tokens'
import { useEffect, useState } from 'react'
import { ethers, BigNumber } from 'ethers'
import _ from 'lodash'

export const Input = ({amount, effect, tokenPrice}) => {

    
    var formatter = new Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD"
       })
    
    return (
       <div className="w-fit self-center px-0 py-0">
           <div className="w-fit flex items-center justify-between gap-10 dark:bg-gray-600 bg-gray-50 px-2 rounded-2xl">
               <div>
                   <p className="text-[10px] text-gray-500 whitespace-nowrap mb-1">FROM</p>
                   <span className="flex items-center gap-2">
                       <FaBitcoin className="w-max h-[2rem] fill-gray-400"/>
                       <p className="dark:text-white text-gray-500">
                       BTC
                        </p>
                   </span>
               </div>
               <ConvertInput value={amount} onChange={effect} />
           </div>
           <div className=" xl:mr-5 italic font-light tracking-wider w-full text-right text-[10px] text-emerald-500">
               ~ USD { tokenPrice && formatter.format(amount * ethers.utils.formatUnits(tokenPrice, 6)) }
           </div> 
       </div> 
    )
}
