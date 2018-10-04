import * as ActionTypes from '../actions/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN:
            return {
                isLoggedIn: true,
                loginError: null
            };

        case ActionTypes.LOGOUT:
            return {
                isLoggedIn: false,
                loginError: null
            };

        case ActionTypes.LOGIN_FAILURE:
            return {
                isLoggedIn: false,
                loginError: action.payload
            };

        default:
            return state;
    }
}