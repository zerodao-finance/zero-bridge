import { v4 as uuidv4 } from 'uuid';

export class TransactionHelper {
    static ADD = "ADD"
    static COMPLETE = "COMPLETE"
    static KILL = "KILL"
    static DB_ADD_COMPLETED = "DB_ADD_COMPLETED"
    static DB_ADD_PENDING = "DB_ADD_PENDING"

    constructor(state, dispatch) {
        this.state = state
        this.dispatch = dispatch
    }

    createRequest(_type, _data) {
        var id = uuidv4()
        this.dispatch({
            type: "ADD",
            payload: {
                type: _type,
                data: {
                    id: id,
                    type: _type,
                    complete: () => {
                        this.completeRequest(_type, _data, id)
                    },
                    _data
                }
            }
        })
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