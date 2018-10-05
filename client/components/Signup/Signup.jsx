import React from 'react';
import Form from '../Form/Form';
import { Redirect } from 'react-router';

const Signup = (props) => {
    if (props.isLoggedIn) {
        return <Redirect to='/dashboard' />
    }

    return (
        <div>
            <div className="card">
                <div className="card-header">
                    <div className="card-title h5">Signup</div>
                    <div className="card-subtitle text-gray">Signup with an email and password</div>
                </div>
                <div className="card-body">
                    <Form onSubmit={props.onSignup} />
                </div>
                {props.errors.error &&
                    <div className="card-footer">
                        <div>
                            <div className="toast toast-error">
                                {props.errors.message}
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default Signup;