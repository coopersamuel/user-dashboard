import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './components/App/App';

import { asyncMiddleware } from './middleware';
import rootReducer from './reducers';
import './styles.scss';

const Root = () => {
    let middleware = composeWithDevTools(applyMiddleware(asyncMiddleware, thunk));
    let store = createStore(
        rootReducer, 
        middleware
    );

    return (
        <Provider store={store}>
            <Router>
                <Route path='/' component={App} />
            </Router>
        </Provider>
    );
}

render(<Root />, document.getElementById("root"));