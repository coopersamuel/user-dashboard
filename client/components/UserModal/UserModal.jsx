import React from 'react';
import './UserModal.scss';

class UserModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: this.props.selectedUser.email || '',
            password: this.props.selectedUser.password || '',
            isAdmin: this.props.selectedUser.isAdmin || false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.toggleAdmin = this.toggleAdmin.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.onSubmitUser(this.state)
    }

    toggleAdmin(event) {
        event.preventDefault();

        const currentAdminState = this.state.isAdmin;
        this.setState({
            isAdmin: !currentAdminState
        });
    }

    render() {
        return (
            <div>
                <div className="modal-background"></div>
                <section className="modal-main">
                    <div className="modal-sm active" id="modal-id">
                        <a href="#close" className="modal-overlay"></a>
                        <div className="modal-container">
                            <div className="modal-header">
                                <a className="btn btn-clear float-right" onClick={this.props.close}></a>
                                <div className="modal-title h5">{this.state.email ? 'Edit User' : 'Create User'}</div>
                            </div>
                            <div className="modal-body">
                                <div className="content">
                                    <form onSubmit={this.onSubmit} className="form-group">
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
                                        <div className="my-2">
                                            {this.state.isAdmin &&
                                                <button className="btn btn-sm btn-primary" onClick={this.toggleAdmin}>Admin</button>

                                                ||

                                                <button className="btn btn-sm" onClick={this.toggleAdmin}>Admin</button>
                                            }
                                        </div>
                                        <button className="btn btn-primary my-2">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default UserModal;