import React from 'react';
import Card from '../card/card';
import { map, isEmpty } from 'lodash';
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
                    <form className="input-group" onSubmit={this.handleSubmit}>
                        <input  type="text" className="form-control list-name" 
                                placeholder="Create new list" 
                                value={this.state.name} 
                                onChange={this.handleChange}
                                id={`input_${list.id}`} />
                        <div className="input-group-append pl-2 pt-1">
                            <span>
                                <div className="btn btn-sm btn-light list-menu">
                                    {list.name &&
                                        <MdMoreHoriz className="mb-1" />
                                    ||
                                        <MdAdd className="mb-1" onClick={(event) => {
                                            if (this.state.name) {
                                                this.handleSubmit(event);
                                            }
                                        }} />
                                    }
                                </div>
                            </span>
                        </div>
                    </form>
                </div>
                {list.name && 
                    <div className='card-body'>
                        {map(list.cards, (card) => {
                            return <Card key={card.id} card={card} editCard={this.props.editCard} />;
                        })}
                    </div>
                }
            </div>
        );
    }
}

export default List;