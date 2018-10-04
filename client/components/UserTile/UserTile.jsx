import React from 'react';

const UserTile = (props) => {
    const { _id, isAdmin, email } = props.user;

    return (
        <div className="tile">
            <div className="tile-content">
                <p className="tile-title">{email}</p>
            </div>
            <div className="tile-action">
                <button className="btn btn-primary">Join</button>
            </div>
        </div>
    );
}

export default UserTile;