import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import { ethers } from 'ethers'
export const Confirmation = ({transferRequest, back, status}) => {
    transferRequest
    
    return (
        <>
        {transferRequest &&
                        <div className="flex flex-col container h-max bg-white shadow-xl rounded-[30px] justify-center place-items-center gap-3 w-fit pb-4 relative dark:bg-gray-700 dark:text-white">
                            {/* <Confirm /> */}
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
                        </div>
        }
        </>
    )
}