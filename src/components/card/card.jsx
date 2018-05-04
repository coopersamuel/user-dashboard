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
            listId: props.listId
        }
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
	isDragging: monitor.isDragging(),
}))
class Card extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: this.props.card.message ? this.props.card.message : ''
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
        if (this.state.message) {
            this.props.editCard(this.state.message, this.props.card.id);
        }
    }

    render() {
        let { card, isDragging, connectDragSource, connectDropTarget } = this.props;

        return connectDragSource(connectDropTarget(
            <div className='card note-card mb-3'>
                <div className='card-header'>
                    <form className="input-group" onSubmit={this.handleSubmit}>
                        <input  type="text" className="form-control card-message" 
                                placeholder="Add a card" 
                                onChange={this.handleChange}
                                value={this.state.message}
                                id={`input_${card.id}`} />
                        <div className="input-group-append pl-2 pt-1">
                            <span>
                                <div className="btn btn-sm btn-light card-menu">
                                    {card.message &&
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
        ));
    }
}

export default Card;