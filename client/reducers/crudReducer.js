import * as ActionTypes from '../actions/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {

        // Create user
        case ActionTypes.CREATE_USER_SUCCESS:
            return {
                error: false,
                message: 'User was successfully created'
            };
        
        case ActionTypes.CREATE_USER_FAILURE:
            return {
                error: true,
                message: action.payload
            };

        // Update user
        case ActionTypes.UPDATE_USER_SUCCESS:
            return {
                error: false,
                message: 'User was successfully updated'
            };
        
        case ActionTypes.UPDATE_USER_FAILURE:
            return {
                error: true,
                message: action.payload
            };

        // Admin create user
        case ActionTypes.ADMIN_CREATE_USER_SUCCESS:
            return {
                error: false,
                message: 'User was successfully created'
            };
        
        case ActionTypes.ADMIN_CREATE_USER_FAILURE:
            return {
                error: true,
                message: action.payload
            };

        // Delete user
        case ActionTypes.DELETE_USER_SUCCESS:
            return {
                error: false,
                message: 'User was successfully deleted'
            };
        
        case ActionTypes.DELETE_USER_FAILURE:
            return {
                error: true,
                message: action.payload
            };

        default:
            return state;
    }
}