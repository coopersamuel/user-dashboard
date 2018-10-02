import React from 'react';
import Navbar from '../Navbar/Navbar';

import { Route } from 'react-router-dom';

const App = (props) => {
    return (
        <div>
            <Navbar />
            <Route path='/home' component={() => <div>Hello</div>} />
            <Route path='/away' component={() => <div>Goodbye</div>} />
        </div>
    );
}

export default App;