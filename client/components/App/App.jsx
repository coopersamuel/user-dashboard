import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route } from 'react-router-dom';

import Navbar from '../Navbar/Navbar';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Dashboard from '../Dashboard/Dashboard';
import requireAuth from '../HOC/requireAuth';
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
                            render={(props) => <Signup {...props} onSignup={this.onSignup} isLoggedIn={this.props.isLoggedIn} errors={this.props.createUserError} />} 
                        />
                        <Route 
                            path='/dashboard' 
                            render={(props) => {
                                const DashboardWithAuth = requireAuth(Dashboard);
                                return <DashboardWithAuth {...props} isLoggedIn={this.props.isLoggedIn} isAdmin={this.props.isAdmin} />;
                            }} 
                        />
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        createUserError: state.createUserReducer,
        isLoggedIn: state.loginReducer.isLoggedIn ? state.loginReducer.isLoggedIn : null,
        loginError: state.loginReducer.loginError ? state.loginReducer.loginError : null,
        isAdmin: state.loginReducer.isAdmin
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