import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import List from '../../components/list/list';
import './board.scss';
import index from '../../reducers';

//hardcode for now
const lists = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

const getColumn = (array, column) => {
    let subArray = [];
    
    _.forEach(array, (list, index) => {
        if ((index - column) % 4 === 0) {
            subArray.push(list);
        }
    });

    return subArray;
}

const Board = (props) => {
    return (
        <div className='container-fluid'>
            <div className='row justify-content-center pt-5'>
                <div className='col-10'>
                    <div className='row'>
                        <div className='col-3'>
                            {_.map(getColumn(lists, 0), (list) => {
                                return (
                                    <List name={list} />
                                );
                            })}
                        </div>
                        <div className='col-3'>
                            {_.map(getColumn(lists, 1), (list) => {
                                return (
                                    <List name={list} />
                                );
                            })}
                        </div>
                        <div className='col-3'>
                            {_.map(getColumn(lists, 2), (list) => {
                                return (
                                    <List name={list} />
                                );
                            })}
                        </div>
                        <div className='col-3'>
                            {_.map(getColumn(lists, 3), (list) => {
                                return (
                                    <List name={list} />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Board;