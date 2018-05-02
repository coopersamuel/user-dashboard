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

export const addCard = () => {
    return {
        // stuff here 
    };
}