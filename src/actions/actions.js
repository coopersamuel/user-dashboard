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

export const addCard = () => {
    return {
        // stuff here 
    };
}