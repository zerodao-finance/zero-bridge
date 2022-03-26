export class MintQueueClass {
    constructor ( mint, queue, data, dispatch ) {
        this.store = PersistanceStore
        this.mint = mint
        this.queue = queue
        this.dispatch = dispatch
        this.key = hash(data)
        this.status = "pending"
        this.data = { data: JSON.stringify(data), status: this.status, date: Date.now() }
        this.storeObject()

    }

    async storeObject() {
        this.dispatch({ type: "ADD_DATA", module: "requests", effect: "transfer", payload: { key: this.key, data: this.data }})
        this.queue.push(this, handleTransferEvent)
        await this.store.put(this.key, this.data)
    }

    async updateObject(update) {
        this.status = update
        this.data = { ...this.data, status: this.status}
        this.dispatch({ type: "UPDATE_DATA", module: "requests", effect: "transfer", payload: { reference: this.key, update: this.data}})
        await this.store.put(this.key, this.data)
    }

    async fallbackMint() {
        //TODO: exoose fallback mint methods

    }

}