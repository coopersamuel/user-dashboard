import * as ActionTypes from '../actions/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.CREATE_USER_SUCCESS:
            return {
                createUserError: false,
                message: 'User was successfully created'
            };
        
        case ActionTypes.CREATE_USER_FAILURE:
            return {
                createUserError: true,
                message: action.payload
            };

        default:
            return state;
    }
}