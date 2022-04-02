import { sdkTransfer, sdkBurn } from "./sdk"
export class SDKHelperClass {
    
    constructor() {

    }

    static newTransfer(...args){
        return new sdkTransfer(...args)
    }

    static newBurn(...args){
        return new sdkBurn(...args)
    }
}