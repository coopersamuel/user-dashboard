import React from 'react';
import { render } from 'react-dom';
import './styles.scss';

const App = () => {
    return (
        <div>Hello world!</div>
    );
}

render(<App />, document.getElementById("root"));