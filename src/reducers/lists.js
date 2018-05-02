import * as ActionTypes from '../actions/actionTypes';
import { cloneDeep, uniqueId } from 'lodash';

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
        case ActionTypes.EDIT_LIST:
            let newState = cloneDeep(state);
            newState[action.payload.listId].name = action.payload.name;
            return newState;
        default:
            return state;
    }
}