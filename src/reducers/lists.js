import * as ActionTypes from '../actions/actionTypes';
import { slice, uniqueId } from 'lodash';

export default (state = {}, action) => {
    const listId = uniqueId('list_');

    switch(action.type) {
        case ActionTypes.ADD_LIST:
            return {
                ...state,
                [listId]: { // Unique ID for the list
                    name: action.payload,
                    id: listId, // The list must be aware of it's own ID
                    cards: []
                }
            };
        default:
            return state;
    }
}