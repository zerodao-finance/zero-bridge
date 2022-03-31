import { PrimaryRoundedButton } from '../../atoms/buttons/button.rounded';

export const BridgeBurnSubmit = ({ action }) => {
	return <PrimaryRoundedButton active={false} label={'Release Funds'} action={action} />;
};
