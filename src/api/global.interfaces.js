import { storeContext } from './global'
import { useContext, useEffect, useState, useMemo } from 'react'
import { ethers } from 'ethers'
import wallet_modal from './walletModal'
import { CHAINS } from './chains'
import _ from 'lodash'
import { createZeroUser, createZeroConnection } from "zero-protocol/dist/lib/zero.js";
import {enableGlobalMockRuntime, createMockKeeper} from "zero-protocol/dist/lib/mock.js"
import { deploymentsFromSigner } from './zero'

// input //
export const useBridgeInput = () => {
    const { state, dispatch } = useContext( storeContext )

    const updateRatio = (e) => {
        dispatch({type: 'SUCCEED_REQUEST', effect: 'input', payload: {effect: "ratio", data: e.target.value}})
    }

    const updateAmount = (e) => {
        dispatch({type: 'SUCCEED_REQUEST', effect: 'input', payload: { effect: "amount", data: e.target.value}})
    }

    const updateModule = (e) => {
        dispatch({type: 'SUCCEED_REQUEST', effect: 'input', payload: { effect: 'isFast', data: !!e.target.checked}})
    }

    var isFast = state.input.isFast
    var ratio = state.input.ratio
    var amount = state.input.amount


    return { ratio, amount, isFast, updateRatio, updateAmount, updateModule }
}

// display //

export const useBridgeDisplay = () => {
    const { state, dispatch } = useContext( storeContext )
    const { input, zero } = state
    
    const [ ETHPrice, setETHPrice ] = useState('0')

    const ln = (v) => (v);

    const contract = useMemo(() => {
        var provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_JSONRPC)
        if (state.wallet.network) {
            return new ethers.Contract(state.wallet.network.swap_address, [ 'function get_dy(uint256, uint256, uint256) view returns (uint256)' ], provider)
        }
    }, [state.wallet.network])

    useEffect(async () => {
        const listener = async () => {
            try {
                setETHPrice(
                    ( 
                        await contract.get_dy(1, 2, ethers.utils.parseUnits("1", 8))
                    ).toString()
                )
            } catch ( e ) {
                console.error(e, "error setting ETH price")
            }
        };

        var invoke = _.throttle(listener, 4000)
        if ( state.wallet.network ) {
            contract.provider.on("block", invoke)
        }

        return () => {
            contract.provider.removeListener( "block", invoke)
            invoke.cancel()
        }
    }, [state.wallet.network])

    useEffect(() => {
        const call = () => {
            try {
                var valueRenBTC = ethers.utils.formatUnits(
                    ln (
                        ethers.utils
                            .parseEther("1")
                            .sub(
                                ethers.BigNumber.from(String(state.input.ratio)).mul(
                                    ethers.utils.parseEther("0.01")
                                )
                            )
                    )
                    .mul(ethers.utils.parseUnits(String(state.input.amount), 8))
                    .div(ethers.utils.parseEther("1")),
                    8
                )


                var valueETH = ethers.utils.formatEther(
                    ethers.BigNumber.from(String(state.input.ratio))
                    .mul(ethers.utils.parseEther("0.01"))
                    .mul(
                        ethers.utils
                        .parseUnits(String(state.input.amount), 8)
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
    }, [state.input.amount, state.input.ratio])


    var ETH = state.display.ETH
    var renBTC = state.display.renBTC
    return { ETH, renBTC }
}

export const NETWORK_ROUTER = {
    137: {
        name: "Polygon",
        swap_address: '0x751B1e21756bDbc307CBcC5085c042a0e9AaEf36',
        },
    42161: {
        name: "Arbitrum",
        swap_address: '0x960ea3e3C7FB317332d990873d354E18d7645590',
    }
}

// zero //

export const useZero = () => {
    const { state, dispatch } = useContext( storeContext )
    const { zero } = state
    const enableMocks = _.memoize(async () => {
        if (process.env.REACT_APP_TEST) {
          await createMockKeeper()
          await enableGlobalMockRuntime()
            console.log('enabled mocks');
        }
    });

    useEffect(async () => {
        await enableMocks();
        if (!zero.zeroUser) {
            let user = createZeroUser(await createZeroConnection('/dns4/lourdehaufen.dynv6.net/tcp/443/wss/p2p-webrtc-star/'))
            await user.conn.start()
            await user.subscribeKeepers()
            user.on('keeper', (address) => {dispatch({type: "SUCCEED_REQUEST", effect: "zero", payload: { effect: "keepers", data: [address, ...zero.keepers]}}) })
            dispatch({ type: "SUCCEED_REQUEST", effect: "zero", payload: { effect: "zeroUser", data: user}})
        }
    }, [])

    var keeper = zero.keepers
    var zeroUser = zero.zeroUser
    return { keeper, zeroUser }
}

// wallet //

export const useWalletConnection = () => {
    const { state, dispatch } = useContext( storeContext )
    const { wallet } = state
    const { isLoading } = wallet
    const { web3Loading, getweb3 } = wallet_modal()
    useEffect(() => {
        const call = async () => {
            try {
                return await getweb3().then(async (response) => {
                    await response.currentProvider.sendAsync({ method: "wallet_addEthereumChain", params: (Object.values(CHAINS).reverse())})
                    let chainId = await response.eth.getChainId()
                    await dispatch({type: "SUCCEED_BATCH_REQUEST", effect: 'wallet', payload: { address: (await response.eth.getAccounts())[0], chainId: chainId, network: NETWORK_ROUTER[chainId], provider: response.currentProvider }})
                })
            }
            catch (err) {
                console.log(err)
                dispatch({ type: "FAIL_REQUEST", effect: 'wallet'})
            }
        }

        if (isLoading) {
            call()
        }

        console.log(wallet)
        
    }, [isLoading])

    const connect = async () => {
        await dispatch({type: "START_REQUEST", effect: 'wallet'})
    }

    const disconnect = async () => {
        await dispatch({type: "RESET_REQUEST", effect: 'wallet'})
    }

    return { connect, disconnect, wallet, isLoading}
}

// transaction //

const useTransaction = () => {
    const { state, dispatch } = useContext( storeContext )
    const { transactions } = state
    const { input } = state
    const { zero } = state

    const sendTransaction = () => {

    }
}

