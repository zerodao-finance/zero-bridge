export const BridgeBurnResult = ({ BTC }) => {
    BTC = 30
    return (
        <div className="w-fit self-center">
            <div className="text-main-green flex flex-row gap-2">
                <p>
                    {BTC}
                </p>
                <p>
                    BTC
                </p> 
            </div>
        </div>
    )
}