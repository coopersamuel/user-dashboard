import * as ActionTypes from '../actions/actionTypes';
import { cloneDeep, uniqueId, find } from 'lodash';
import { list } from 'postcss';

export default (state = {}, action) => {
    const listId = uniqueId('list_');
    const cardId = uniqueId('card_');

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

        case ActionTypes.EDIT_LIST: {
            const { listId, name } = action.payload;
            const currentList = state[listId];

            currentList.name = name;

            return {
                ...state,
                [listId]: currentList,
            };
        }

        case ActionTypes.ADD_CARD: {
            const { message, listId } = action.payload;
            const currentList = state[listId];

            currentList.cards.push({
                message: action.payload.message,
                id: cardId, // Every card must have a unique ID,
                labels: {
                    one: false,
                    two: false,
                    three: false
                }
            });

            return {
                ...state,
                [listId]: currentList,
            };
        }

        case ActionTypes.EDIT_CARD: {
            const { listId, cardId, message } = action.payload;
            const currentList = state[listId];
            
            const card = find(currentList.cards, { 'id': cardId });
            card.message = message;

            return {
                ...state,
                [listId]: currentList,
            };
        }

        case ActionTypes.MOVE_CARD: {
            const { dragIndex, dragListId, hoverIndex, hoverListId } = action.payload;
            const dragList = state[dragListId];
            const hoverList = state[hoverListId];

            const dragCard = dragList.cards[dragIndex]; // Get the dragged card
            dragList.cards.splice(dragIndex, 1); // First remove the dragged card from the array

            if (dragListId === hoverListId) {
                // This drag is occuring within the same list
                dragList.cards.splice(hoverIndex, 0, dragCard) // Next, add the dragged card back into the array in the correct spot
            } else {
                // This is a drag to a separate list
                hoverList.cards.splice(hoverIndex, 0, dragCard) // Or, add the dragged card into the new list
            }
            
            return {
                ...state,
                [dragListId]: dragList,
                [hoverListId]: hoverList // In some cases hoverList will be the same list as dragList, but sometimes it won't
            };
        }

        case ActionTypes.TOGGLE_LABEL: {
            const { listId, cardId, label } = action.payload;
            const currentList = state[listId];
            
            const card = find(currentList.cards, { 'id': cardId });
            card.labels[label] = !card.labels[label];   // Toggle the label

            return {
                ...state,
                [listId]: currentList,
            };
        }

        default:
            return state;
    }
}