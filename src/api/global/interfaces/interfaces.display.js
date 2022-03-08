import { storeContext } from '../global'
import { useContext, useEffect, useState, useMemo } from 'react'
import { ethers } from 'ethers'
import _ from 'lodash'

export const useBridgeDisplay = () => {
    const { state, dispatch } = useContext( storeContext )
    const { input, display, network } = state
    
    const [ ETHPrice, setETHPrice ] = useState('0')
    const [ eth_usd, set_eth_usd ] = useState(0)
    const [ btc_usd, set_btc_usd ] = useState(0) 
    const ln = (v) => (v);

    useEffect(() => {
        const listener = async () => {
            try {
                setETHPrice(
                    ( 
                        await network.priceFeedContract.get_dy(1, 2, ethers.utils.parseUnits("1", 8))
                    ).toString()
                )
            } catch ( e ) {
                console.error(e, "error setting ETH price")
            }
        };

        var invoke = _.throttle(listener, 4000)
        if ( network.priceFeedContract ) {
            network.priceFeedContract.provider.on("block", invoke)
        }

        return () => {
            if (network.priceFeedContract) {
                network.priceFeedContract.provider.removeListener( "block", invoke )
                invoke.cancel()

            }
        }
    }, [network.priceFeedContract])

    useEffect( () => {
        const listener = async () => {
            try {
                set_btc_usd(await network.priceFeedContract.get_dy(1, 0, 1e8))
                set_eth_usd(await network.priceFeedContract.get_dy(2, 0, 1e18))
            } catch (e) {
                console.log(e)
            }
        }
        var invoke = _.throttle(listener, 10000)

        if ( network.priceFeedContract ) {
            network.priceFeedContract.provider.on('block', invoke)
        }

        return () => {
            if (network.priceFeedContract) {
                network.priceFeedContract.provider.removeListener(  'block', invoke )
                invoke.cancel()
            }
        }
    }, [network.priceFeedContract])

    useEffect(() => {
        const call = () => {
            try {
                var valueRenBTC = ethers.utils.formatUnits(
                    ln (
                        ethers.utils
                            .parseEther("1")
                            .sub(
                                ethers.BigNumber.from(String(input.ratio)).mul(
                                    ethers.utils.parseEther("0.01")
                                )
                            )
                    )
                    .mul(ethers.utils.parseUnits(String(input.amount), 8))
                    .div(ethers.utils.parseEther("1")),
                    8
                )


                var valueETH = ethers.utils.formatEther(
                    ethers.BigNumber.from(String(input.ratio))
                    .mul(ethers.utils.parseEther("0.01"))
                    .mul(
                        ethers.utils
                        .parseUnits(String(input.amount), 8)
                        .mul(ETHPrice)
                    )
                    .div(ethers.utils.parseEther("1", 18))
                    .div(ethers.utils.parseUnits("1", 8))
                )


                dispatch({type: "SUCCEED_BATCH_REQUEST", effect: "display", payload: { ETH: valueETH, renBTC: valueRenBTC} })
            } catch (e) {
                console.log(e)
                dispatch({type: "FAIL_REQUEST", effect: 'display', payload: "Cannot set ETHPrice," })
            }
        }

        call()
    }, [input.amount, input.ratio])


    var ETH = display.ETH
    var renBTC = display.renBTC
    return { 
        ETH, 
        renBTC,
        btc_usd,
        eth_usd
    }

}
