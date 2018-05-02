import React from 'react';
import Card from '../card/card';
import { map } from 'lodash';
import { MdMoreHoriz, MdAdd } from 'react-icons/lib/md';
import './list.scss';

class List extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.list.name ? this.props.list.name : ''
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
        this.props.editList(this.state.name, this.props.list.id);
    }

    render() {
        let { list } = this.props;

        return (
            <div className='card mb-4 list-card'>
                <div className='card-header'>
                    <div className="input-group">
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                <input  type="text" className="form-control list-name" 
                                        placeholder="Create new list" 
                                        value={this.state.name} 
                                        onChange={this.handleChange}
                                        id={`input_${list.id}`} />
                            </label>
                        </form>
                        <div className="input-group-append pl-2 pt-1">
                            <span>
                                <div className="btn btn-sm btn-light list-menu">
                                    {list.name &&
                                        <MdMoreHoriz className="mb-1" />
                                    ||
                                        <MdAdd className="mb-1" onClick={this.handleSubmit} />
                                    }
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
                {list.name && 
                    <div className='card-body'>
                        {map(list.cards, (card) => {
                            return <Card card={card} />;
                        })}

                        <Card card={null} />
                    </div>
                }
            </div>
        );
    }
}

export default List;