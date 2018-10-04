import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route } from 'react-router-dom';

import Navbar from '../Navbar/Navbar';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Dashboard from '../Dashboard/Dashboard';
import { createUser } from '../../actions/actions';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.onSignup = this.onSignup.bind(this);
    }

    onSignup({ email, password}) {
        this.props.createUser(email, password);
    }

    render() {
        return (
            <div className="container grid-lg my-2">
                <Navbar />
                <div className="columns">
                    <div className="column col-6 centered">
                        <Route 
                            path='/login'
                            render={(props) => <Login {...props} onLogin={null} />}
                        />
                        <Route 
                            path='/signup' 
                            render={(props) => <Signup {...props} onSignup={this.onSignup} isLoggedIn={this.props.isLoggedIn} errors={this.props.createUserError} />} 
                        />
                        <Route 
                            path='/dashboard' 
                            render={(props) => <Dashboard {...props} />} 
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
        isLoggedIn: state.loginReducer
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        createUser
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);