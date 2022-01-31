import { useState } from "react"
import { TransferTool } from './transfer'
import { ReleaseTool } from './release'



const buttonConfig = {
    "clicked" : "bg-white dark:text-white text-black dark:bg-gray-700 h-full p-3 rounded-t-[20px]",
    "disabled" : "bg-gray-200 dark:bg-gray-800 h-full p-3 text-gray-500 cursor-pointer hover:text-white transition-all delay-150",
}
export const Mechanism = ({ _transactionSender, _context }) => {
    const [tool, toggle] = useState("transfer")
    const toggleTool = (_tool) => {
        toggle(_tool)
    }
    const [ isLoading, sign ] = _transactionSender()

    return (
                <div className='flex flex-col container h-fit bg-white shadow-xl rounded-[30px] justify-center place-items-center gap-3 first:gap-0 w-fit pb-4 dark:bg-gray-700 text-white '>
                    {  
                    isLoading &&
                    <CgSpinnerTwoAlt className="fixed animate-spin w-[3rem] h-[3rem] text-emerald-300" />
                    }
                    <p className="text-lg font-light text-black tracking-wider w-full bg-emerald-300 text-center shadow-md rounded-t-md">Bridge Funds</p>
                        { 
                        <div className={`h-full w-full grid grid-cols-2 grid-flow-rows mb-8 bg-gray-200 dark:bg-gray-800 pt-3 align-center font-light tracking-wider text-sm text-center`}>
                            
                            <div className={tool === "transfer" ? buttonConfig["clicked"] : buttonConfig["disabled"]} onClick={() => toggleTool("transfer")}>
                                Transfer
                            </div>
                            <div className={tool === "release" ? buttonConfig["clicked"] : buttonConfig["disabled"]} onClick={() => toggleTool("release")}>
                                Release
                            </div>
                            
                        </div>
                        }
                        {
                            tool === "transfer" && <TransferTool _isLoading={isLoading} _action={sign} _context={_context}/>
                        }
                        {
                            tool === "release" && <ReleaseTool _isLoading={isLoading} _context={_context} />
                        }
                </div>
                
    )
}