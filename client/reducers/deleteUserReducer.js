import * as ActionTypes from '../actions/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.DELETE_USER_SUCCESS:
            return {
                deleteUserError: false,
                message: 'User was successfully deleted'
            };
        
        case ActionTypes.DELETE_USER_FAILURE:
            return {
                deleteUserError: true,
                message: action.payload
            };

        default:
            return state;
    }
}