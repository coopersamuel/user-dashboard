import * as ActionTypes from '../actions/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.LOAD_USERS:
            return action.payload;

        default:
            return state;
    }
}