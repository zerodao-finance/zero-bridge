export class GlobalStateHelper {
    constructor (state, dispatch) {
        this.state = state
        this.dispatch = dispatch
    }

    update(module, effect, data) {
        this.dispatch({ type: "UPDATE", module: module, effect: effect, data: data})
        return
    }

    getModuleModeState(module) {
        const { processing, signed, gatewayRecieved } = this.state[module].mode

        return {
            processing, signed, gatewayRecieved
        }
    }

    getModuleGatewayProps(module) {
        const { address, requestData } = this.state[module].mode.gatewayData
        return { gatewayAddress: address, transferRequest: requestData }
    }

}