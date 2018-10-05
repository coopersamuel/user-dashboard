import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import UserTile from '../UserTile/UserTile';
import UserModal from '../UserModal/UserModal';
import Pagination from '../Pagination/Pagination';
import { fetchUsers, updateUser, deleteUser } from '../../actions/actions';

class AdminPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            selectedUserToUpdate: {}
        };

        this.fetchPage = this.fetchPage.bind(this);
        this.openUpdateModal = this.openUpdateModal.bind(this);
        this.submitUpdateUser = this.submitUpdateUser.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    componentDidMount() {
        // Fetch the first page of users when the component mounts
        this.props.fetchUsers(1);
    }

    fetchPage(page) {
        this.props.fetchUsers(page);
    }

    openUpdateModal(user) {
        this.setState({
            showModal: true,
            selectedUserToUpdate: user
        });
    }

    submitUpdateUser(user) {
        const { email, password, isAdmin } = user;
        const userId = this.state.selectedUserToUpdate._id;
        this.props.updateUser(userId, email, password, isAdmin);

        // Refetch the users
        this.props.fetchUsers(this.props.currentPage);

        this.closeModal();
    }

    closeModal() {
        this.setState({
            showModal: false,
            selectedUserToUpdate: {}
        });
    }

    deleteUser(user) {
        this.props.deleteUser(user._id);

        // Refetch the users
        this.props.fetchUsers(this.props.currentPage);
    }

    render() {
        if (!this.props.users) {
            return <div></div>;
        }

        const { totalPages, totalEntries, currentPage, users } = this.props;

        return (
            <div>
                <div className="tile">
                    <div className="tile-content">
                        <p className="tile-title">Filter Users</p>
                    </div>
                    <div className="tile-action mx-1">
                        <button 
                            className="btn"
                            onClick={() => this.setState({ showModal: !this.state.showModal })}
                        >
                            + Add User
                        </button>
                    </div>
                </div>
                {users.map(user => {
                    return (
                        <UserTile key={user._id} user={user} onUpdateUser={this.openUpdateModal} onDeleteUser={this.deleteUser} /> 
                    );
                })}
                <div className="column col-6 col-mx-auto">
                    <Pagination numPages={totalPages} totalEntries={totalEntries} currentPage={currentPage} onPageClick={this.fetchPage} />                
                </div>
                {this.state.showModal &&
                    <UserModal onSubmitUser={this.submitUpdateUser} selectedUser={this.state.selectedUserToUpdate} close={this.closeModal} />
                }
                {this.props.updateUserStatus.updateUserError &&
                    <div className="toast toast-error">
                        {this.props.updateUserStatus.message}
                    </div>
                }
                {this.props.deleteUserStatus.deleteUserError &&
                    <div className="toast toast-error">
                        {this.props.deleteUserStatus.message}
                    </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        users: state.usersReducer.docs,
        currentPage: parseInt(state.usersReducer.page),
        totalPages: state.usersReducer.pages,
        totalEntries: state.usersReducer.total,
        updateUserStatus: state.updateUserReducer, 
        deleteUserStatus: state.deleteUserReducer
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchUsers,
        updateUser,
        deleteUser
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);