import { ConversionToolContext } from '../../context/WalletContext'
const Result = () => {
    return (
        <ConversionToolContext.Consumer>
            { value =>
            <div className='flex flex-row divide-x lg:mx-11 lg:py-2 grow lg:px-5'>
                <div className="flex flex-col px-10 self-end gap-5 mx-2">
                    <p className="lg:text-3xl text-xl text-emerald-300 truncate w-20 lg:w-40 text-center">{value.data.eth}</p>
                    <p className="text-xl text-center">ETH</p>
                </div>
                <div className="flex flex-col px-10 self-end gap-5 mx-2">
                    <p className="lg:text-3xl text-xl text-emerald-300 text-center">{value.data.renBTC}</p>
                    <p className="lg:text-xl text-lg text-center">renBTC</p>
                </div>
            </div>
            }
        </ConversionToolContext.Consumer>
    )
}
export default Result