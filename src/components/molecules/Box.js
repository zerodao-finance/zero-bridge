import Convert from './Convert'
import Ratio from './Ratio'
import Result from './Result'
import {RiExchangeFundsFill} from 'react-icons/ri'
import { AiOutlineArrowDown, AiOutlineClose } from 'react-icons/ai' 
import {CgSpinnerTwoAlt} from 'react-icons/cg'
import { ConversionToolContext } from '../../context/Context'
import { ethers } from 'ethers'
import { Confirm } from '../organisms/Confirm'

import {useState, Fragment} from 'react'
import { useTransactionSender, _BridgeMonitor, _ErrorNotifications } from '../../core/instance'

const ConvertBox = () => {

    const [ isLoading, sign ] = useTransactionSender()

    return (
                <div className='flex flex-col container h-fit bg-white shadow-xl rounded-[30px] justify-center place-items-center gap-3 w-fit pb-4 dark:bg-gray-700 text-white '>
                    { 
                    isLoading &&
                    <CgSpinnerTwoAlt className="fixed animate-spin w-[3rem] h-[3rem] text-emerald-300" />
                    }
                    <p className="text-lg font-light text-black tracking-wider w-full bg-emerald-300 text-center shadow-md rounded-t-md">Bridge Funds</p>
                    <div className={`container h-max flex flex-row place-content-center w-[25rem] gap-5 justify-around pr-[4.5rem] items-center px-8 ${isLoading && 'invisible'}`}>
                        <p className="text-[10px] text-gray-300 whitespace-nowrap">transfer amount</p>
                        <div className="flex flex-col">
                            <Convert />
                        </div>
                    </div>
                    <div className={`${isLoading && 'invisible'} flex flex-col justify-center place-items-center mt-5`}>
                        <Ratio />
                        <AiOutlineArrowDown className="mt-3 fill-black dark:fill-white"/>
                    </div>
                    <div className={`container h-max flex flex-row  place-content-center w-[25rem] gap-5 justify-around pr-[4.5rem] items-center px-8 pt-10 ${isLoading && 'invisible'}`}>
                        <p className="text-[10px] text-gray-300 whitespace-nowrap">result</p>
                        <div className="flex flex-col w-full">
                            <Result />
                        </div>
                    </div>
                    <button className={`rounded-full bg-emerald-300 dark:bg-emerald-500 text-white px-3 py-2 mt-4 hover:scale-90 transition-all font-fine duration-150 hover:ring-2 ring-emerald-700 tracking-wider ${isLoading && 'invisible'}`} onClick={sign}>
                        Initiate & Sign
                    </button>
                </div>
                
    )
}


export const ConfirmBox = ({transferRequest, back, status}) => {
    transferRequest
    
    return (
        <>
        {transferRequest &&
            <ConversionToolContext.Consumer>
                {value =>
                        <div className="flex flex-col container h-max bg-white shadow-xl rounded-[30px] justify-center place-items-center gap-3 w-fit pb-4 relative dark:bg-gray-700 dark:text-white">
                            <Confirm />
                            <AiOutlineClose className="absolute top-1 left-1 hover:scale-150 dark:stroke-white" onClick={back}/>
                            <p className=" text-lg font-light text-black  tracking-wider w-full bg-emerald-300 text-center shadow-md rounded-t-md">Confirm Transaction</p>
                            <div className="grid grid-flow-rows grid-cols-2 justify-items-start items-center auto-rows-min min-w-[20rem] max-w-fit mx-10 gap-4">
                                    <p className="text-sm w-fit">asset:</p>
                                    <p className="text-xs w-fit truncate w-2/3 hover:w-full transition-all duration-150">{transferRequest.asset}</p>
                                    <p className="text-sm w-fit">to:</p>
                                    <p className="text-xs w-fit truncate w-2/3 hover:w-full transition-all duration-150">{transferRequest.to}</p>
                                    <p className="text-sm w-fit">underwriter:</p>
                                    <p className="text-xs w-fit truncate w-2/3 hover:w-full transition-all duration-150">{transferRequest.underwriter}</p>
                                    <p className="text-sm w-fit">transfer amount:</p>
                                    <p className="text-xs w-fit truncate w-2/3 ">{ethers.utils.formatUnits(ethers.BigNumber.from(transferRequest.amount), 8)}</p>
                            </div>
                            <p className="capitalize font-thin">fees</p>
                            <div className="grid grid-flow-rows grid-cols-2 justify-items-start items-center auto-rows-min min-w-[20rem] max-w-fit mx-10 gap-4">
                                    <p className="text-sm w-fit">RenVM Fee:</p>
                                    <p className="text-xs w-fit truncate w-2/3 text-red-400">{`-${(0.001 + (ethers.utils.formatUnits(ethers.BigNumber.from(transferRequest.amount), 8) * .15)) }`}</p>
                                    <p className="text-sm w-fit">Zero Arbitrum Fee:</p>
                                    <p className="text-xs w-fit truncate w-2/3 text-red-400">{`-${(0.0015 + (ethers.utils.formatUnits(ethers.BigNumber.from(transferRequest.amount), 8) * .3)) }`}</p>
                                    <p className="text-sm w-fit">Curve Fee:</p>
                                    <p className="text-xs w-fit truncate w-2/3 text-red-400">{`-${ethers.utils.formatUnits(ethers.BigNumber.from(transferRequest.amount), 8) * .04 }`}</p>
                            </div>
                            <div className="flex flex-col p-3 gap-2 rounded-md ring-[1px] ring-gray-300"> 
                                <p className="text-sm w-full text-center font-thin underline">BTC deposit address</p>
                                <p className="text-sm font-light text-center w-full truncate w-full transition-all duration-150 cursor-copy select-all">{transferRequest.gatewayAddress ? transferRequest.gatewayAddress : <CgSpinnerTwoAlt className="mx-auto animate-spin font w-[1.3rem] h-[1.3rem] text-emerald-300" />}</p>
                            </div>
                            <div className="w-2/3 ring-orange-500 ring-2 rounded-md self-center text-center text-[13px] text-gray-100 animate-scale-in-hor-center">
                                <p className="text-orange-500 h-fit">{status ? status : "REMINDER !" }</p>
                                <p className="text-black dark:text-white">Deposit the exact amount of BTC to the Deposit Address</p>
                                
                            </div>
                            <button className="rounded-full bg-emerald-300 dark:bg-emerald-500 text-white px-3 py-2 mt-4 hover:scale-90 transition-all font-fine duration-150 hover:ring-2 ring-emerald-700 tracking-wider" onClick={value.set.submitTxn}>
                                Confirm Transaction
                            </button>
                        </div>
                    }
            </ConversionToolContext.Consumer>
        }
        </>
    )
}


export default ConvertBox
