import { PrimaryRoundedButton } from '../../atoms/buttons/button.rounded';
import { useEffect } from 'react';

const btcRegex = /^(?:[13]{1}[a-km-zA-HJ-NP-Z1-9]{26,33}|bc1[a-z0-9]{39,59})$/

export const BridgeBurnSubmit = ({ action, destination }) => {
	const active = () => {
		return destination.match(btcRegex);
	}

	useEffect(async () => {
		console.log(destination);
	}, [destination])

	return <PrimaryRoundedButton active={active()} label={active() ? 'Release Funds' : 'Enter Valid Recipient Address'} action={action} />;
};
