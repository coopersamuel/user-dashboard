import * as ActionTypes from '../actions/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_USER_SUCCESS:
            return {
                updateUserError: false,
                message: 'User was successfully updated'
            };
        
        case ActionTypes.UPDATE_USER_FAILURE:
            return {
                updateUserError: true,
                message: action.payload
            };

        default:
            return state;
    }
}