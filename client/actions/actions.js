import * as ActionTypes from './actionTypes';
import { asyncAction } from '../middleware/asyncMiddleware';
import axios from 'axios';

/**
 * Action Creators
 */

export const createUser = (email, password) => {
    return asyncAction(axios.post('/users', { email, password })
            .then(createUserSuccess)
            .catch(createUserFailure));
};

export const createUserSuccess = user => {
    return {
        type: ActionTypes.CREATE_USER_SUCCESS
    }
};

export const createUserFailure = response => {
    return {
        type: ActionTypes.CREATE_USER_FAILURE,
        payload: response.response.data.message
    }
}

