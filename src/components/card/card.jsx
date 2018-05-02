import React from 'react';
import { MdMoreHoriz, MdAdd } from 'react-icons/lib/md';
import './card.scss';

class Card extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: this.props.card ? this.props.card.message : ''
        };
    }

    render() {
        let { card } = this.props;

        return (
            <div className='card note-card mb-3'>
                <div className='card-header'>
                    <div className="input-group">
                        <form>
                            <label>
                                <input  type="text" className="form-control card-message" 
                                        placeholder="Add a card" 
                                        value={this.state.message} />
                            </label>
                        </form>
                        <div className="input-group-append pt-1">
                            <span>
                                <div className="btn btn-sm btn-light card-menu">
                                    {card &&
                                        <MdMoreHoriz className="mb-1" />
                                    ||
                                        <MdAdd className="mb-1"  />
                                    }
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;