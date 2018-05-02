import React from 'react';
import Card from '../card/card';
import { MdMoreHoriz } from 'react-icons/lib/md';
import './list.scss';

class List extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.name ? this.props.name : ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            name: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.newList();
    }

    render() {
        return (
            <div className='card mb-4 list-card'>
                <div className='card-header'>
                    <div className="input-group">
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                <input type="text" className="form-control list-name" placeholder="Create new list" value={this.state.name} onChange={this.handleChange} />
                            </label>
                        </form>
                        <div className="input-group-append pl-2 pt-1">
                            <span>
                                <div className="btn btn-sm btn-light list-menu">
                                    <MdMoreHoriz className="mb-1" />
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
                <div className='card-body'>
                    <Card />
                </div>
            </div>
        );
    }
}

export default List;