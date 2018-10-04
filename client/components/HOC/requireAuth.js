import React from 'react';
import { Redirect } from 'react-router';

// This higher order component is used to require authentication 
// before routing to the wrapped component

export default (WrappedComponent) => {
    class RequireAuth extends React.Component {
        render() {
            if (this.props.isLoggedIn) {
                return <WrappedComponent {...this.props} />;
            } else {
                return <Redirect to='/' />
            }
        }
    }
    
    return RequireAuth;
}