import React from 'react';
import _ from 'lodash';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addList, editList } from '../../actions/actions';

import List from '../../components/list/list';
import { MdSentimentVerySatisfied } from 'react-icons/lib/md';
import './board.scss';
import index from '../../reducers';

const getColumn = (collection, column) => {
    /*
    *   This function handles organizing the collection of lists that is stored in state into four separate arrays for display
    *   This is necessary to display in a masonry-esque format
    */

    let subArray = [];
    const keys = _.keys(collection);
    
    _.forEach(keys, (listId, index) => {
        if ((index - column) % 4 === 0) {
            subArray.push(collection[listId]);
        }
    });

    return subArray;
}

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.addTrailingList = this.addTrailingList.bind(this);
    }

    async addTrailingList() {
        // Add an empty list
        await this.props.addList(null);
        
        // Place the cursor in the new list
        const id = _.findLast(this.props.lists).id;
        const nextForm = document.getElementById(`input_${id}`);
        nextForm.focus();
    }

    render() {
        const { lists } = this.props;

        return (
            <div className='container-fluid'>
                <div className='row justify-content-center pt-5'>
                    {!_.isEmpty(this.props.lists) &&
                        <div className='col-10'>
                            <div className='row'>
                                {_.times(4, (index) => {
                                    /* Print out four of these */
                                    return (
                                        <div className='col-3'>
                                            {_.map(getColumn(lists, index), (list) => {
                                                return (
                                                    <List list={list} editList={(name, id) => {
                                                        if (!list.name) {
                                                            this.addTrailingList();
                                                        } else {
                                                            document.getElementById(`input_${id}`).blur();
                                                        }
                                                        
                                                        this.props.editList(name, id);
                                                    }} />
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    }
                    {_.isEmpty(this.props.lists) && 
                        <div className='instructions mt-5'>
                            <div className='text-center py-4'><MdSentimentVerySatisfied size={60} /></div>
                            <div>Welcome to frello! Let's start with your first list</div>
                            <div className='text-center pt-4'>
                                <button className='btn btn-light' onClick={() => this.addTrailingList()}>Create list</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        lists: state.lists
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addList,
        editList
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);