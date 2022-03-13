import renderer from 'react-test-renderer';
import { BridgeTransferInput } from '../ui/molecules/bridge.transfer/bridge.transfer.input';
import { shallow } from 'enzyme';
import { ethers } from 'ethers';
// import { renderHook } from '@testing-library/react-hooks';
// import { useBridgeDisplay } from '../api/global/interfaces/interfaces.display';

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

    // TODO - use 'renderHook' to use custom hook and get live prices
    // it('should get all live price feeds', () => {
    //     const { result } = renderHook(useBridgeDisplay);
    //     const { btc_usd, ETH, eth_usd, renBTC } = result.current;
        
    //     console.log("\nLive Price Feed: ");
    //     console.log("ETH - USD:", eth_usd);
    //     console.log("BTC - USD:", btc_usd);
    //     console.log("renBTC:", renBTC);
    //     console.log("ETH", ETH);
    // });

    it('should convert user BTC input to USD', () => {
        // Assuming BTC price is 50000 --> 50000000000 ethers
        const btcUsdPrice = 50000000000;
        const btcInputInUsd = formatter.format(
            state.inputValue * ethers.utils.formatUnits(btcUsdPrice, 6)
        );

        expect(btcInputInUsd).toBe("$5,000.00");
    });
})