import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route } from 'react-router-dom';

import Navbar from '../Navbar/Navbar';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Dashboard from '../Dashboard/Dashboard';
import Auth from '../Auth/Auth';
import { createUser, authenticateUser, logout } from '../../actions/actions';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.onSignup = this.onSignup.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    onSignup({ email, password}) {
        this.props.createUser(email, password);
    }

    onLogin({ email, password }) {
        this.props.authenticateUser(email, password);
    }

    onLogout() {
        this.props.logout();
    }

    render() {
        return (
            <div className="container grid-lg my-2">
                <Navbar isLoggedIn={this.props.isLoggedIn} onLogout={this.onLogout} />
                <div className="columns">
                    <div className="column col-6 centered">
                        <Route 
                            path='/login'
                            render={(props) => <Login {...props} onLogin={this.onLogin} isLoggedIn={this.props.isLoggedIn} isAdmin={null} errors={this.props.loginError} />}
                        />
                        <Route 
                            path='/signup' 
                            render={(props) => <Signup {...props} onSignup={this.onSignup} isLoggedIn={this.props.isLoggedIn} errors={this.props.errors} />} 
                        />
                    </div>
                    <div className="column col-12">
                        <Route render={(props) => <Auth {...props} isLoggedIn={this.props.isLoggedIn} userInformation={this.props.userInformation} />} />
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        errors: state.crudReducer,
        isLoggedIn: state.loginReducer.isLoggedIn ? state.loginReducer.isLoggedIn : null,
        loginError: state.loginReducer.loginError ? state.loginReducer.loginError : null,
        userInformation: { isAdmin: state.loginReducer.isAdmin, email: state.loginReducer.email }
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        createUser,
        authenticateUser,
        logout
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);