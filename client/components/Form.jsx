import React from 'react';

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state);
    }

    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)} className="form-group">
                <div className="form-group">
                    <label className="form-label">Email</label>
                    <input 
                        className="form-input mb-2" type="text" 
                        placeholder="username@email.com" 
                        value={this.state.email}
                        onChange={event => this.setState({ email: event.target.value })}
                    />
                    <label className="form-label">Password</label>
                    <input 
                        className="form-input mb-2" type="password" 
                        placeholder="Password" 
                        value={this.state.password} 
                        onChange={(event) => this.setState({ password: event.target.value })} 
                    />
                </div>
                <button className="btn btn-primary my-2">Submit</button>
            </form>
        );
    }
}

export default Form;