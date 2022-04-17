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
        case 'REMOVE':
            return state.filter(t => t.id != action.payload.id);
        case 'REMOVE_ALL':
            return []
        case 'REMOVE_LAST':

            return _.initial(state);
        default:
            return state;
    }
}