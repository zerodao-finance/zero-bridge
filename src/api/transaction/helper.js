import { v4 as uuidv4 } from 'uuid';
import async from 'async'

export class TransactionHelper {
    static ADD = "ADD"
    static COMPLETE = "COMPLETE"
    static KILL = "KILL"
    static DB_ADD_COMPLETED = "DB_ADD_COMPLETED"
    static DB_ADD_PENDING = "DB_ADD_PENDING"
    queue = async.queue( function(task, callback ) {
        callback(null, task)
    })

    constructor(state, dispatch) {
        this.state = state
        this.dispatch = dispatch
    }

    createRequest(_type, _data) {
        var id = uuidv4()
        const data = {
            type: "ADD",
            payload: {
                type: _type,
                data: {
                    id: id,
                    type: _type,
                    dispatch: this.dispatch,
                    get complete() {
                        this.dispatch({
                            type: "COMPLETE",
                            payload: {
                                type: this.type,
                                id: this.id,
                                data: this
                            }
                        })
                        return id
                    },
                    _data
                }
            }
        }
        this.dispatch(data)
        return data
    }

    //callbacks

    completeRequest(_type, _data, _id) {
        this.dispatch({
            type: "COMPLETE",
            payload: {
                type: _type,
                id: _id,
                data: _data
            }
        })
    }
}