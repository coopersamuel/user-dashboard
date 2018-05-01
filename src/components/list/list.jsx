import React from 'react';
import './list.scss';

class List extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='card list-card'>
                <div className='card-header'>
                    List Name
                </div>
                <div className='card-body'>
                    Cards Here
                </div>
            </div>
        );
    }
}

export default List;