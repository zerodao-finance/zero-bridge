import { PrimaryRoundedButton } from '../../atoms/buttons/button.rounded';

export const BridgeBurnSubmit = ({ action }) => {
	return <PrimaryRoundedButton active={true} label={'Release Funds'} action={action} />;
};
