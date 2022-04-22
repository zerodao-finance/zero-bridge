import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import useTransferFees from '../../../api/hooks/transfer-fees'

export const BridgeTransferFee = ({ amount, effect, tokenPrice, setToken, token }) => {

    // Getting Fees - START
    const { getTransferOutput } = useTransferFees();
    const [isFeeLoading, setIsFeeLoading] = useState(false);
    const [fee, setFee] = useState();
    useEffect(async () => {
        if(amount > 0) {
            setIsFeeLoading(true);
            const output = await getTransferOutput({ amount, token });
            setFee(output);
            setIsFeeLoading(false);
        }
    }, [amount, token])
    // Getting Fees - END

    var formatter = new Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD"
    })

    function formatConversionOutput() {
        switch(token) {
            case 'USDC':
                return fee
            default:
                return fee * ethers.utils.formatUnits(tokenPrice, 6);
        }
    }

    return (
      <>
        {amount > 0 && (
          <div className="self-center px-0 py-0 w-full">
              <div className="w-full shadow-inner flex justify-between px-4 py-2 mt-5 text-white rounded-xl dark:bg-badger-gray-500 bg-gray-100">
                  <div className="flex items-center max-w-[100%]">
                    <p className="text-[10px] text-gray-300 whitespace-nowrap">RESULT</p>
                  </div>
                  <div>
                      <span className={`${isFeeLoading && "animate-pulse"}`}>
                          {fee || 0} {token}
                      </span>
                  </div>
              </div>
              <div className=" xl:mr-5 italic tracking-wider w-full text-right text-[10px] text-badger-yellow-neon-400">
                  ~ { tokenPrice && formatter.format(formatConversionOutput()) }
              </div> 
          </div>
        )}
      </>
    )
}
