import * as ActionTypes from '../actions/actionTypes';

export default (state = null, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN:
            return true;

        // TODO - Logout case

        default:
            return state;
    }
}