import { combineReducers } from 'redux';
import createUserReducer from './createUserReducer';
import loginReducer from './loginReducer';
import usersReducer from './usersReducer';
import updateUserReducer from './updateUserReducer';
import deleteUserReducer from './deleteUserReducer';

export default combineReducers({
    createUserReducer,
    loginReducer,
    usersReducer,
    updateUserReducer,
    deleteUserReducer
});