import { useState, useEffect } from 'react'
import _ from 'lodash'
import { NETWORK_ROUTER } from '../../tools'
import { useNetwork } from '../wallet'



export function useETH(props){
    const { connection, connectWallet } = global.wallet
    const [ network, networks, switchNetwork ] = useNetwork()
    const [ETH, setETH] = useState('0')
    useEffect(async () => {
        const listener = async () => {
          try {
            setETH(
              (
                await tools.contract.get_dy(1, 2, ethers.utils.parseUnits("1", 8))
              ).toString()
            );
          } catch (e) {
            console.error(e, "Error setting ETH price");
          }
        };
        var invoke = _.throttle(listener, 2000)
        if (connection && network) {
            console.log("network", network, connection)
            // let contract = (NETWORK_ROUTER[network]).contract
            // contract.provider.on("block", invoke);
        }
        return () => {
          tools.contract.provder.removeListener("block", invoke)
          invoke.cancel()
        }
      }, [network]);
    return ETH
}