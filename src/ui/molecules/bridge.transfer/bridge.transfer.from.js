import { ReactComponent as BTC } from '../../../assets/svg-coins/btc.svg'
import { DefaultInput } from '../../atoms';

function BridgeTransferFrom() {
    return (
        <div className="w-100 flex items-center justify-between gap-5 dark:bg-badger-gray-500 bg-gray-100 px-2 rounded-2xl" style={{minHeight: "58px"}}>
            <div className="flex items-center pl-2">
                <p className="text-[10px] text-gray-300 whitespace-nowrap">FROM</p>
                <div className="inline-flex justify-center w-full rounded-md px-4 py-2 bg-transparent text-sm font-medium text-white items-center focus:outline-none">
                    <span className="flex items-center gap-2">
                        <BTC className="w-max h-[2rem] fill-gray-400" />
                        <p className="dark:text-white text-gray-500">
                            BTC
                        </p>
                    </span>
                </div>
            </div>
            {/* TODO: Make this input dynamic to the other input field or delete the input completely */}
            {/* <DefaultInput />  */}
        </div>
    )
}

export default BridgeTransferFrom;