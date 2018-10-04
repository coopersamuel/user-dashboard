import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import UserTile from '../UserTile/UserTile';
import Pagination from '../Pagination/Pagination';
import { fetchUsers } from '../../actions/actions';

class AdminPanel extends React.Component {
    constructor(props) {
        super(props);

        this.fetchPage = this.fetchPage.bind(this);
    }

    componentDidMount() {
        this.props.fetchUsers(1);
        console.log('called');
    }

    fetchPage(page) {
        console.log('made it');
        console.log(page);
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
                        <UserTile key={user._id} user={user} /> 
                    );
                })}
                <Pagination numPages={totalPages} totalEntries={totalEntries} currentPage={currentPage} onPageClick={this.fetchPage} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        users: state.usersReducer.docs,
        currentPage: state.usersReducer.page,
        totalPages: state.usersReducer.pages,
        totalEntries: state.usersReducer.total
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchUsers
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);