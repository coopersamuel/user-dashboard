import * as ActionTypes from './actionTypes';

/*
* Action creators
*/

export const addList = (listName) => {
    return {
        type: ActionTypes.ADD_LIST,
        payload: listName
    };
}

export const editList = (name, listId) => {
    return {
        type: ActionTypes.EDIT_LIST,
        payload: {
            name,
            listId
        }
    };
}

export const addCard = (message, listId) => {
    return {
        type: ActionTypes.ADD_CARD,
        payload: {
            message,
            listId
        }
    };
}

export const editCard = (message, listId, cardId) => {
    return {
        type: ActionTypes.EDIT_CARD,
        payload: {
            message,
            listId,
            cardId
        }
    };
}

export const moveCard = (dragIndex, dragListId, hoverIndex, hoverListId) => {
    return {
        type: ActionTypes.MOVE_CARD,
        payload: {
            dragIndex,
            dragListId,
            hoverIndex,
            hoverListId
        }
    };
}