import * as ActionTypes from '../actions/actionTypes';
import { cloneDeep, uniqueId, find } from 'lodash';

export default (state = {}, action) => {
    const listId = uniqueId('list_');
    const cardId = uniqueId('card_');

    let newState = cloneDeep(state);

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
            newState[action.payload.listId].name = action.payload.name;
            return newState;
        case ActionTypes.ADD_CARD:
            newState[action.payload.listId].cards.push({
                message: action.payload.message,
                id: cardId, // Every card must have a unique ID
            });
            return newState;
        case ActionTypes.EDIT_CARD:
            const card = find(newState[action.payload.listId].cards, { 'id': action.payload.cardId });
            card.message = action.payload.message;
            return newState;
        default:
            return state;
    }
}