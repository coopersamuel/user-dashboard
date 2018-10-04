import { combineReducers } from 'redux';
import createUserReducer from './createUserReducer';
import loginReducer from './loginReducer';
import usersReducer from './usersReducer';

export default combineReducers({
    createUserReducer,
    loginReducer,
    usersReducer
});