import React from 'react';
import { Route, Redirect } from 'react-router-dom';


import Dashboard from '../Dashboard/Dashboard';

// This component is a simple Auth wrapper to render routes
// that are behind the "auth" wall.
class Auth extends React.Component {
    render() {
        if (this.props.isLoggedIn) {
            // The user is logged in, render routes
            return (
                <div>
                    <Route 
                        path='/dashboard' 
                        render={(props) => <Dashboard {...props} isLoggedIn={this.props.isLoggedIn} userInformation={this.props.userInformation} />} 
                    />
                </div>
            );
        } else {
            return <Redirect to='/' />
        }
    }
}

export default Auth;