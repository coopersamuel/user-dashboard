import React from 'react';
import Form from '../Form/Form';
import { Redirect } from 'react-router';

const Login = (props) => {
    if (props.isLoggedIn && props.isAdmin) {
        // User is logged in as an admin
    } else if (props.isLoggedIn) {
        // User is logged in, but not an admin
        return <Redirect to='/dashboard' />
    }

    return (
        <div>
            <div className="card">
                <div className="card-header">
                    <div className="card-title h5">Login</div>
                    <div className="card-subtitle text-gray">Login with an email and password</div>
                </div>
                <div className="card-body">
                    <Form onSubmit={props.onLogin} />
                </div>
                {!!props.errors &&
                    <div className="card-footer">
                        <div>
                            <div className="toast toast-error">
                                {props.errors}
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default Login;