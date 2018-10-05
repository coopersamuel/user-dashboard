import React from 'react';

const UserTile = (props) => {
    const { _id, isAdmin, email } = props.user;

    return (
        <div className="tile">
            <div className="tile-content">
                <p className="tile-title">{email}</p>
            </div>
            {isAdmin && 
                <span className="chip mt-1">Admin</span>
            }
            <div className="tile-action mx-1">
                <button 
                    className="btn btn-primary"
                    onClick={() => props.onUpdateUser(props.user)}
                >
                    Edit
                </button>
            </div>
            <div className="tile-action mx-1">
                <button className="btn btn-error">Remove</button>
            </div>
        </div>
    );
}

export default UserTile;