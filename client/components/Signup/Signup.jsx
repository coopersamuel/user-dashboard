import React from 'react';
import Form from '../Form/Form';

const Signup = (props) => {
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
            </div>
        </div>
    );
}

export default Signup;