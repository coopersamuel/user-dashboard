import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions/actions'

const asyncMiddleware = store => next => action => {
    // Run this middleware for every action that requires async
    if(action.async) {
        action.promise
        .then(value => {
            store.dispatch(value);
        });
    } else {
        return next(action);
    }
}

export const asyncAction = (promise) => ({
    type: actionTypes.PROMISE,
    async: true,
    promise
});

export default asyncMiddleware;