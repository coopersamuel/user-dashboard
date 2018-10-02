import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './components/App/App';

import rootReducer from './reducers';
import './styles.scss';

const Root = () => {
    let store = createStore(rootReducer, composeWithDevTools());

    return (
        <Provider store={store}>
            <Router>
                <Route path='/' component={App} />
            </Router>
        </Provider>
    );
}

render(<Root />, document.getElementById("root"));