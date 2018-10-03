import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
    return (
        <header className="navbar">
            <section className="navbar-section">
                <h5 className="text-bold pt-2">Shaka Demo</h5>
            </section>
            <section className="navbar-section">
                <Link to='/login' className="btn btn-link">Login</Link>
                <Link to='/signup' className="btn btn-link">Signup</Link>
            </section>
        </header>
    );
}

export default Navbar;