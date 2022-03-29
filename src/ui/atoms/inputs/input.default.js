
export const DefaultInput = ({ value, onChange, onClick }) => {  
    if (! value ) {
        value = 0
    }  
    return ( 
    <div className="w-fit p-2">
        <input id="transfer-amount" className="dark:bg-gray-600 dark:text-white form-input text-center border-0 focus:ring-0 text-md font-medium text-gray-600 bg-transparent caret-green-500 z-40 w-fit max-w-[5rem] rounded-xl bg-gray-200" type="number" value={value} onChange={onChange} onClick={onClick}/>
    </div>
    )
}



