import { combineReducers } from 'redux';
import createUserReducer from './createUserReducer';
import loginReducer from './loginReducer';

export default combineReducers({
    createUserReducer,
    loginReducer
});