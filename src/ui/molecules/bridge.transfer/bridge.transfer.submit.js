import { PrimaryRoundedButton } from '../../atoms/buttons/button.rounded'
import { useZero } from '../../../api/global/interfaces/interfaces.zero'
import { useEffect, useState } from 'react';
import useTransferFees from '../../../api/hooks/transfer-fees'

export const BridgeTransferSubmit = ({action, amount, token}) => {
  const { keeper } = useZero();
  const { getTransferOutput } = useTransferFees();
  const [buttonLabel, setButtonLabel] = useState('Input Valid Amount');
	const [active, setActive] = useState(false);
	const [transferOutput, setTransferOutput] = useState();

  useEffect(async () => {
    if(amount > 0) {
      const output = await getTransferOutput({ amount, token });
      setTransferOutput(output);
    }
  }, [amount, token])
  
  useEffect(async () => {
		setActive(false);
    if(amount <= 0) {
      setButtonLabel("Input Valid Amount");
    }
		else if(keeper.length > 0) {
			if(transferOutput > 0) {
				setButtonLabel('Transfer Funds');
				setActive(true);
			}
			else {
				setButtonLabel('Result Must Be More Than Zero');
			}
		}
    else {
      setButtonLabel("Awaiting Keeper")
    }
	}, [keeper, transferOutput, amount])

  return (
    <PrimaryRoundedButton active={active} label={buttonLabel} action={action} />
  )
}