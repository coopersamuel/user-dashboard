import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
    return (
        <header className="navbar">
            <section className="navbar-section">
                <h3>Shaka Demo</h3>
            </section>
            <section className="navbar-section">
                <Link to='/home' className="btn btn-link">User Home</Link>
                <Link to='/away' className="btn btn-link">User Away</Link>
            </section>
        </header>
    );
}

export default Navbar;