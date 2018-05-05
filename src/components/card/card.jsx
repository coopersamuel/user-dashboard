import React from 'react';
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import ItemTypes from '../../constants/itemTypes';
import { MdMoreHoriz, MdAdd } from 'react-icons/lib/md';
import './card.scss';

const cardSource = {
    beginDrag(props) {
        return {
            id: props.card.id,
            index: props.index,
            listId: props.listId,
            listLength: props.listLength
        }
    },
    canDrag(props, monitor) {
        return !!props.card.message;
    },
    isDragging(props, monitor) {
        return props.card.id === monitor.getItem().id;
    },
}

const cardTarget = {
	hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index
        const dragList = monitor.getItem().listId
        const hoverIndex = props.index
        const hoverList = props.listId

		// Don't replace items with themselves
		if (dragIndex === hoverIndex && dragList === hoverList) {
			return
        }
        
        // Don't replace an "Add a card" trailing card
        // unless it's the only card in the list
        if (!props.card.message && hoverIndex !== 0) {
			return
        }

		// Determine rectangle on screen
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

		// Determine mouse position
		const clientOffset = monitor.getClientOffset()

		// Get pixels to the top
		const hoverClientY = clientOffset.y - hoverBoundingRect.top

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%

		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return
        }

		// Time to actually perform the action
		props.moveCard(dragIndex, dragList, hoverIndex, hoverList)

		// Note: we're mutating the monitor item here!
		// Generally it's better to avoid mutations,
		// but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().listId = hoverList
        monitor.getItem().index = hoverIndex
    },
}

@DropTarget(ItemTypes.CARD, cardTarget, connect => ({
	connectDropTarget: connect.dropTarget(),
}))
@DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))
class Card extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: this.props.card.message ? this.props.card.message : '',
            submitted: this.props.card.message ? true : false
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

        this.setState({
            submitted: true
        });

        if (this.state.message) {
            this.props.editCard(this.state.message, this.props.card.id);
        }
    }

    render() {
        let { card, listId, menuCard, isDragging, connectDragSource, connectDropTarget } = this.props;

        return connectDragSource(connectDropTarget(
            <div className={`card note-card mb-3 ${isDragging ? 'dragging' : ''} ${menuCard === card.id ? 'card-menu' : ''}`}>
                <div className='card-header'>
                    <div id={`draggable_${card.id}`}>
                        <form className="input-group" onSubmit={this.handleSubmit}>
                            <input  type="text" className="form-control card-message" 
                                    placeholder="Add a card" 
                                    onChange={this.handleChange}
                                    value={this.state.message}
                                    id={`input_${card.id}`}
                                    disabled={this.state.submitted}
                                    onBlur={(event) => {
                                        if (this.state.message) {
                                            this.handleSubmit(event);
                                        }
                                    }} />
                            <div className="input-group-append pl-2 pt-1">
                                <span>
                                    <div className={`btn btn-sm btn-light card-menu ${menuCard === card.id ? 'disabled' : ''}`} onClick={(event) => {
                                        if (card.message) {
                                            this.props.onMenuClick(listId, card.id);
                                            this.setState({ menu: true });
                                        } else {
                                            if (this.state.message) {
                                                this.handleSubmit(event);
                                            } else {
                                                document.getElementById(`input_${card.id}`).focus();
                                            }
                                        }
                                    }}>
                                        {card.message &&
                                            <MdMoreHoriz className="mb-1" />
                                        ||
                                            <MdAdd className="mb-1" />
                                        }
                                    </div>
                                </span>
                            </div>
                        </form>
                    </div>
                    <div className={menuCard === card.id ? `show-menu container` : 'collapse-menu'}>
                        <div className="row justify-content-center">
                            <div className="col-4"><span class="badge badge-pill label one"> </span></div>
                            <div className="col-4"><span class="badge badge-pill label two"> </span></div>
                            <div className="col-4"><span class="badge badge-pill label three"> </span></div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-5">
                                <span className="btn btn-sm btn-light menu-button" onClick={() => {
                                    this.setState({ submitted: false }, () => document.getElementById(`input_${card.id}`).focus());
                                }}>
                                    Edit Card
                                </span>
                            </div>
                            <div className="col-5">
                                <span className="btn btn-sm btn-light menu-button" onClick={() => console.log('delete this card')}>Delete Card</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ));
    }
}

export default Card;