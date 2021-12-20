import { ConversionToolContext } from '../../context/Context'
const Result = () => {
    return (
        <ConversionToolContext.Consumer>
            { value =>
            <div className='flex flex-row divide-x xl:mx-11 xl:py-2 grow xl:px-5  '>
                <div className="flex flex-col self-end gap-5 ">
                    <p className="text-3xl  text-emerald-300 truncate w-20 w-40 text-center">{value.get.ETH}</p>
                    <p className="text-xl text-center">ETH</p>
                </div>
                <div className="flex flex-col px-10 self-end gap-5 mx-2 ">
                    <p className="text-3xl text-emerald-300 text-center">{value.get.renBTC}</p>
                    <p className="text-xl text-center">renBTC</p>
                </div>
            </div>
            }
        </ConversionToolContext.Consumer>
    )
}
export default Result