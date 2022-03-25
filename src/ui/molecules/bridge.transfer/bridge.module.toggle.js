
export const BridgeModuleToggle = ({ isFast, action}) => {
    
    return (
        <div className="flex flex-row gap-3 items-center mb-3">
            <label htmlFor="quick" className="text-gray-600 dark:text-gray-100 text-sm">
                Collateralize Quick Transfer
            </label>

            <input name="quick" type="checkbox" className="rounded-md border-green-300 ring-[1px] ring-emerald-200 ring-offset-[1px]" checked={isFast} onChange={ action } />
	    </div>
    )
}