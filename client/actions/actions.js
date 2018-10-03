import * as ActionTypes from './actionTypes';
import { asyncAction } from '../middleware/asyncMiddleware';
import axios from 'axios';

/**
 * Action Creators
 */

export const createUser = (email, password) => {
    return asyncAction(axios.post('/users', { email, password })
            .then(createUserSuccess(response.data))
            .catch(createUserFailure(response.data)));
};

export const createUserSuccess = user => {
    // Set state to show that the user was successfully created
};