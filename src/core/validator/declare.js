import { Validator } from '../tools'

class SignatureVerify extends Validator {
    constructor(){
        super()
    }
    async check(args) {
        if (args.keeper && args.wallet) return true
        else return false
    }
}

