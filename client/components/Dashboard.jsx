import React from 'react';
import AdminPanel from './AdminPanel';

const Dashboard = (props) => {
    if (!props.userInformation) {
        return <div></div>;
    }

    return (
        <div>
            <div className="empty">
                <p className="empty-title h5">Welcome to the dashboard {props.userInformation.email}!</p>
                {props.userInformation.isAdmin &&
                    <p className="empty-subtitle">As an admin, you can edit and delete users</p>

                    ||

                    <p className="empty-subtitle">There's not much else you can do.</p>
                }
            </div>
            {props.userInformation.isAdmin &&
                <div>
                    <div className="divider"></div>
                    <AdminPanel />
                </div>
            }
        </div>
    );
}

export default Dashboard;