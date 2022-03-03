import renderer from 'react-test-renderer';
import { BridgeComponent } from '../components/organisms/bridge';

describe("Bridge", () => {
    it('renders correctly', () => {
        const bridge = renderer
          .create(<BridgeComponent />)
          .toJSON();
          
        expect(bridge).toMatchSnapshot();
    });
});