import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash' 
export const NotificationReducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return [
                ...state,
                {
                    ...action.payload
                }
            ];
            break
        case 'UPDATE':
            var t = _.find(state, function (i) { return i.id == action.payload.id })
            console.log(t)
            var updated = { ...t, ...action.payload.update }
            console.log(updated)
            var l = state.filter(t => t.id != action.payload.id );
            console.log([...l, updated])
            return [ ...l, updated ]
        case 'REMOVE':
            return state.filter(t => t.id != action.payload.id);
            break
        case 'REMOVE_ALL':
            return []
            break
        case 'REMOVE_LAST':
            return _.initial(state);
            break
        default:
            return state;
            break
    }
}