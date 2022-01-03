import { ConversionToolContext } from '../../context/Context'
const Result = () => {
    return (
        <ConversionToolContext.Consumer>
            { value =>
            <div className='flex flex-row justify-evenly divide-x-[.008rem] divide-emerald-300'>
                <div className="flex flex-col gap-2 w-[8rem]">
                    <p className="text-xl  text-emerald-300 truncate text-center">{value.get.ETH}</p>
                    <p className="text-sm text-center text-black dark:text-white">ETH</p>
                </div>
                <div className="flex flex-col gap-2 w-[8rem]">
                    <p className="text-xl text-emerald-300 text-center">{value.get.renBTC}</p>
                    <p className="text-sm text-center text-black dark:text-white">renBTC</p>
                </div>
            </div>
            }
        </ConversionToolContext.Consumer>
    )
}
export default Result