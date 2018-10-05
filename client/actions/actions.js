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

export const fetchUsers = (page, filterString) => {
    let url = `/users/${page}`;

    if (filterString) {
        url += `/${filterString}`;
    }

    return asyncAction(axios.get(url)
            .then(response => response.data)
            .then(loadUsers));
};

export const loadUsers = users => {
    return {
        type: ActionTypes.LOAD_USERS,
        payload: users
    }
}

export const updateUser = (userId, email, password, isAdmin) => {
    return asyncAction(axios.put(`/users/${userId}`,  { email, password, isAdmin })
            .then(updateUserSuccess)
            .catch(updateUserFailure));
};

export const updateUserSuccess = () => {
    return {
        type: ActionTypes.UPDATE_USER_SUCCESS
    }
};

export const updateUserFailure = response => {
    return {
        type: ActionTypes.UPDATE_USER_FAILURE,
        payload: response.response.data.message
    }
};

export const deleteUser = userId => {
    return asyncAction(axios.delete(`/users/${userId}`)
            .then(deleteUserSuccess)
            .catch(deleteUserFailure));
};

export const deleteUserSuccess = () => {
    return {
        type: ActionTypes.DELETE_USER_SUCCESS
    }
};

export const deleteUserFailure = response => {
    return {
        type: ActionTypes.DELETE_USER_FAILURE,
        payload: response.response.data.message
    }
};

export const adminCreateUser = (email, password, isAdmin) => {
    return asyncAction(axios.post('/users', { email, password, isAdmin })
            .then(adminCreateUserSuccess)
            .catch(adminCreateUserFailure));
};

export const adminCreateUserSuccess = user => {
    return {
        type: ActionTypes.ADMIN_CREATE_USER_SUCCESS
    }
};

export const adminCreateUserFailure = response => {
    return {
        type: ActionTypes.ADMIN_CREATE_USER_FAILURE,
        payload: response.response.data.message
    }
}