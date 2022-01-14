import hash from 'object-hash'
import _ from "lodash"

class Storage {
    backend = window.localStorage

    async set(transferRequest, status){
        const key = hash(transferRequest);
        const data = {data: {...transferRequest}, date: Date.now(), status: "pending", key: key}
        const serialized = JSON.stringify(data)
        try {
            await this.backend.setItem(`request:${key}`, serialized)
            return key
        } catch (e) {
            return new Error("Error setting transfer request")
        }
    }

    async getTransferRequests(){
        const returnArr = []
        const entries = Object.entries(this.backend).filter(([k, v]) => k.startsWith('request:'))
        for (const [key, value] of entries){
            returnArr.push(JSON.parse(value))
        }

        return _.partition(returnArr, ['status', 'pending'])
    }

    async updateTransferRequest(_key, _status){
        try {
            const data = this.backend.getItem(`request:${_key}`)
            const parsed = JSON.parse(data)
            const updated = _.set(parsed, 'status', _status)
            const serialized = JSON.stringify(updated)
            this.backend.setItem(`request:${_key}`, serialized)
        } catch ( error ) {
            return new Error("Error updating transfer request")
        }
    }

    async deleteTransferRequest(_key){
        try {
            this.backend.removeItem(`request:${_key}`)
        } catch (error) {
            return new Error("Error removing transfer request")
        }
    }
}

const storage = new Storage()
export default storage