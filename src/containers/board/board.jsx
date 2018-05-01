import React from 'react';
import { connect } from 'react-redux';

import List from '../../components/list/list';
import './board.scss';

const Board = (props) => {
    return (
        <div className='container-fluid'>
            <div className='row justify-content-center pt-5'>
                <div className='col-10'>
                    <div className='card-columns'>
                        <List />
                        <List />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Board;