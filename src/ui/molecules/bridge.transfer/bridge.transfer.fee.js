import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import useTransferFees from '../../../api/hooks/transfer-fees'
import useTransferCalculate from '../../../api/hooks/transfer-calculate';

export const BridgeTransferFee = ({ amount, effect, tokenPrice, setToken, token }) => {
    // How to use 'TokenDropdown' component
    // Create 'useState' variables and pass it to 'TokenDropdown' 
    // (props are 'token' and 'setToken' where 'token' is a string of the token symbol)

    // Additional Props: 'tokensRemoved' which is an array of tokens you do not want in dropdown
    // Default Dropdown Items: ETH, WBTC, ibBTC, renBTC, USDC

    // Getting Fees - START
    const { getTransferFee } = useTransferFees();
    const [isFeeLoading, setIsFeeLoading] = useState(false);
    const [fee, setFee] = useState();
    useEffect(async () => {
        if(amount > 0) {
            setIsFeeLoading(true);
            const output = await getTransferFee({ amount, token });
            setFee(output);
            setIsFeeLoading(false);
        }
    }, [amount, token])
    // Getting Fees - END

    const { calculateAmount } = useTransferCalculate();

    var formatter = new Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD"
    })

    return (
      <>
        {amount > 0 && (
          <div className="self-center px-0 py-0 w-full">
<<<<<<< HEAD
              <div className="w-full shadow-inner flex items-center justify-between px-4 py-2 mt-5 text-white rounded-xl dark:bg-badger-gray-500 bg-gray-100">
                  <div className="flex flex-col gap-2 max-w-[100%]">
                    <p className="text-[10px] text-gray-300 whitespace-nowrap">FEES</p>
                    <p className="text-[10px] text-gray-300 whitespace-nowrap">RESULT</p>
                  </div>
                  <div className="flex flex-col max-w-[100%] text-sm">
                    <div className={`${isFeeLoading && "animate-pulse"} flex justify-between gap-1`}>
                          <div>{(amount - fee).toFixed(8) || 0}</div>
                          <div>BTC</div>
                      </div>
                      <div className={`${isFeeLoading && "animate-pulse"} flex justify-between gap-1`}>
                          <div>{calculateAmount(fee) || 0}</div>
                          <div>{token}</div>
                      </div>
=======
              <div className="w-full shadow-inner flex justify-between px-4 py-2 mt-5 text-white rounded-xl dark:bg-badger-gray-500 bg-gray-100">
                  <div className="flex items-center max-w-[100%]">
                    <p className="text-[10px] text-gray-300 whitespace-nowrap">RESULT</p>
                  </div>
                  <div>
                      <span className={`${isFeeLoading && "animate-pulse"}`}>
                          {fee || 0} BTC
                      </span>
>>>>>>> 3c20ce5d278daecc6758c5c416738b86e066f175
                  </div>
              </div>
              <div className=" xl:mr-5 italic tracking-wider w-full text-right text-[10px] text-badger-yellow-neon-400">
                  ~ { tokenPrice && formatter.format(fee * ethers.utils.formatUnits(tokenPrice, 5)) }
              </div> 
          </div>
        )}
      </>
    )
}
