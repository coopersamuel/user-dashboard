import React from 'react';

const Dashboard = (props) => {
    return (
        <div className="empty">
            <p className="empty-title h5">Welcome to the dashboard!</p>
            {props.isAdmin &&
                <div className="empty-action">
                    <button className="btn btn-primary">Send a message</button>
                </div>

                ||

                <p className="empty-subtitle">There's not much else you can do.</p>
            }
        </div>
    );
}

export default Dashboard;