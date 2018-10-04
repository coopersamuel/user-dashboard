import * as ActionTypes from './actionTypes';
import { asyncAction } from '../middleware/asyncMiddleware';
import axios from 'axios';

/**
 * Action Creators
 */

export const createUser = (email, password) => {
    return asyncAction(axios.post('/users', { email, password })
            .then(response => response.data)
            .then(createUserSuccessActions)
            .catch(createUserFailure));
};

const createUserSuccessActions = data => {
    return dispatch => {
        dispatch(createUserSuccess());
        dispatch(login(data));
    }
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

export const login = data => {
    return {
        type: ActionTypes.LOGIN,
        payload: data
    }
};

export const logout = () => {
    return {
        type: ActionTypes.LOGOUT
    }
};

export const authenticateUser = (email, password) => {
    return asyncAction(axios.post('/authenticate', { email, password })
            .then(response => response.data)
            .then(login)
            .catch(loginFailure));
};

export const loginFailure = response => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        payload: response.response.data.message
    }
};