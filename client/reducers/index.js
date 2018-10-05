import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import usersReducer from './usersReducer';
import crudReducer from './crudReducer';

export default combineReducers({
    crudReducer,
    loginReducer,
    usersReducer,
});