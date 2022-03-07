import renderer from 'react-test-renderer';
import { BridgeComponent } from '../components/organisms/bridge';
import { ConvertInput } from '../components/atoms/inputs';
import { Wrappers } from '../core/systems/bridge';
import { library } from '../components/utils/tokens';
import { ethers } from 'ethers';

describe("Bridge", () => {
    it('renders correctly', () => {
      const bridge = renderer.create(
        <BridgeComponent />
      ).toJSON();
          
        expect(bridge).toMatchSnapshot();
    });

    it('accepts user input', () => {
      const onConvertMock = jest.fn();
      const event = {
        preventDefault() {},
        target: { value: '100' }
      };

      const convertInput = renderer.create(
        <ConvertInput 
          value={event.target.value}
          onChange={onConvertMock}
        />
      ).toJSON();

      expect(convertInput.children[0].props.value).toBe('100');
    })
    it('converts user input', async () => {
      // TODO - define global.wallet's "connection" and "connectWallet"
      const inputVal = '1';
      const token = library['bitcoin'];
      const btcPrice = ethers.utils.formatUnits((await token.priceFeed).toString(), 6);
      const usdFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      });
      usdFormatter.format(inputVal * btcPrice);
    })

    it('completes a transfer', () => {
    //   const { result } = renderHook(() => useTransactionSender());

    //   const mechanism = renderer.create(
    //     <BridgeProvider>
    //       <TransferTool
    //         _isLoading={false}
    //         _action={result.current.sign}
    //         _context={Provider} 
    //       />
    //     </BridgeProvider>
    //   )
    })
});