import * as ActionTypes from '../actions/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN:
            return {
                isLoggedIn: true,
                loginError: null,
                isAdmin: action.payload.isAdmin,
                email: action.payload.email
            };

        case ActionTypes.LOGOUT:
            return {
                isLoggedIn: false,
                loginError: null,
                isAdmin: null,
                email: null
            };

        case ActionTypes.LOGIN_FAILURE:
            return {
                isLoggedIn: false,
                loginError: action.payload,
                isAdmin: null,
                email: null
            };

        default:
            return state;
    }
}