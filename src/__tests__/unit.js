import renderer from 'react-test-renderer';
import { BridgeTransferInput } from '../ui/molecules/bridge.transfer/bridge.transfer.input';
import { shallow } from 'enzyme';
import { ethers } from "ethers";

describe('Unit Testing for zeroBRIDGE', () => {
    // Utils
    const formatter = new Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD"
    });

    // State
    const state = {
        inputValue: 0
    };

    // Rendererings
    const bridgeInput = renderer.create(
        <BridgeTransferInput value={state.inputValue} />
    );

    // Tests
    it('renders input correctly', () => {
        expect(bridgeInput).toMatchSnapshot();
    });

    it('should render input with state of 0', () => {
        const bridgeInputRoot = bridgeInput.root;
        expect(bridgeInputRoot._fiber.pendingProps.value).toBe(0);
    });

    it('should accept user input', () => {
        expect(state.inputValue).toEqual(0);

        const inputWrapper = shallow(<BridgeTransferInput value={state.inputValue} />);
        inputWrapper.simulate('change', state.inputValue = 0.1);

        expect(state.inputValue).toEqual(0.1);
    });

    it('should convert BTC input to USD', () => {
        const btcUsdPrice = 50000;
        const btcInputInUsd = formatter.format(
            state.inputValue * ethers.utils.formatUnits(btcUsdPrice, 6)
        );

        expect(btcInputInUsd).toBe("$5000.00");
    });
})