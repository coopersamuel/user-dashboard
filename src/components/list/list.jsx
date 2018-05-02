import React from 'react';
import Card from '../card/card';
import './list.scss';

class List extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='card mb-4 list-card'>
                <div className='card-header'>
                    {this.props.name}
                </div>
                <div className='card-body'>
                    <Card />
                </div>
            </div>
        );
    }
}

export default List;