export function USDConversion(input) {
    /**
     * Convert renBTC to USD
     */
    return input
}

const ConvertInput = ({ unitConversion, value, onChange, onClick }) => {

    var formatter = new Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD"
    })
    
    return ( 
    <div className="w-fit p-2">
        <input id="transfer-amount" className="dark:bg-gray-600 dark:text-white form-input text-center border-0 focus:ring-0 text-md font-medium text-gray-600 bg-transparent caret-green-500 z-40 w-fit max-w-[5rem] rounded-xl bg-gray-100" type="number" value={value} onChange={onChange} onClick={onClick}/>
    </div>
    )
}


export default ConvertInput