import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';
import './styles.scss';

const App = () => {
    let store = createStore(rootReducer, composeWithDevTools());

    return (
        <Provider store={store}>
            <div>
                Boilerplate!
            </div>
        </Provider>
    );
}

render(<App />, document.getElementById("root"));