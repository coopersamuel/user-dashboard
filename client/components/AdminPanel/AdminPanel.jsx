import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import UserTile from '../UserTile/UserTile';
import UserModal from '../UserModal/UserModal';
import Pagination from '../Pagination/Pagination';
import { fetchUsers, updateUser } from '../../actions/actions';

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

    render() {
        if (!this.props.users) {
            return <div></div>;
        }

        const { totalPages, totalEntries, currentPage, users } = this.props;

        return (
            <div>
                {users.map(user => {
                    return (
                        <UserTile key={user._id} user={user} onUpdateUser={this.openUpdateModal} /> 
                    );
                })}
                <div className="column col-6 col-mx-auto">
                    <Pagination numPages={totalPages} totalEntries={totalEntries} currentPage={currentPage} onPageClick={this.fetchPage} />                
                </div>
                <button onClick={() => this.setState({ showModal: !this.state.showModal })}>MODAL</button>
                {this.state.showModal &&
                    <UserModal onSubmitUser={this.submitUpdateUser} selectedUser={this.state.selectedUserToUpdate} close={this.closeModal} />
                }
                {this.props.updateUserStatus.updateUserError &&
                    <div className="toast toast-error">
                        {this.props.updateUserStatus.message}
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
        updateUserStatus: state.updateUserReducer 
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchUsers,
        updateUser
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);