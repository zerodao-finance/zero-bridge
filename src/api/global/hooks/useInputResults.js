import { storeContext } from '../global';
import { useContext, useEffect } from 'react';
import { ethers } from 'ethers';
import _ from 'lodash';

export const useInputResults = (input, module) => {
	const { state, dispatch } = useContext(storeContext);
	const { btc_eth } = state.priceFeeds.data;
	const ln = v => v;

	useEffect(() => {
		const call = () => {
			try {
				var valueRenBTC = parseFloat(
					ethers.utils.formatUnits(
						ln(
							ethers.utils
								.parseEther('1')
								.sub(ethers.BigNumber.from(String(input.ratio)).mul(ethers.utils.parseEther('0.01')))
						)
							.mul(ethers.utils.parseUnits(String(input.amount), 8))
							.div(ethers.utils.parseEther('1')),
						8
					)
				).toFixed(4);

				var valueETH = parseFloat(
					ethers.utils.formatEther(
						ethers.BigNumber.from(String(input.ratio))
							.mul(ethers.utils.parseEther('0.01'))
							.mul(ethers.utils.parseUnits(String(input.amount), 8).mul(btc_eth))
							.div(ethers.utils.parseEther('1', 18))
							.div(ethers.utils.parseUnits('1', 8))
					)
				).toFixed(5);

				if (parseFloat(valueETH) > 0 && parseFloat(valueETH) < 0.0001) {
					valueETH = '< 0.0001';
				} else {
					valueETH = parseFloat(valueETH).toFixed(4);
				}

				dispatch({
					type: 'UPDATE',
					module: module,
					effect: 'display',
					data: { ETH: valueETH, renBTC: valueRenBTC }
				});
			} catch (e) {
				console.error(e);
				dispatch({ type: 'FAIL_REQUEST', effect: 'display', payload: 'Cannot set ETHPrice,' });
			}
		};
		if(input.amount){
			call();
		}
	}, [input.amount, input.ratio]);
};
