export function USDConversion(input) {
    /**
     * Convert renBTC to USD
     */
    return input
}

const ConvertInput = ({ unitConversion, value, onChange, onClick }) => {
    
    return <input className="form-input text-right border-0 focus:ring-0 text-5xl font-medium text-gray-400 px-auto caret-green-500 bg-transparent z-40 w-full max-w-[13rem]" type="number" value={value} onChange={onChange} onClick={onClick}/>
}


export default ConvertInput