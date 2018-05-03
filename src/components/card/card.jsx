import React from 'react';
import { MdMoreHoriz, MdAdd } from 'react-icons/lib/md';
import './card.scss';

class Card extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: this.props.card ? this.props.card.message : ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            message: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        //this.props.editList(this.state.name, this.props.list.id);
        console.log('new card');
    }

    render() {
        let { card } = this.props;

        return (
            <div className='card note-card mb-3'>
                <div className='card-header'>
                    <form className="input-group" onSubmit={this.handleSubmit}>
                        <input  type="text" className="form-control card-message" 
                                placeholder="Add a card" 
                                onChange={this.handleChange}
                                value={this.state.message} />
                        <div className="input-group-append pt-1">
                            <span>
                                <div className="btn btn-sm btn-light card-menu">
                                    {card &&
                                        <MdMoreHoriz className="mb-1" />
                                    ||
                                        <MdAdd className="mb-1" onClick={(event) => {
                                            if (this.state.message) {
                                                this.handleSubmit(event);
                                            }
                                        }} />
                                    }
                                </div>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Card;