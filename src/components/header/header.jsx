import React from 'react';
import './header.scss';

const Header = (props) => {
    return (
        <div className='header'>
            <div className='container'>
                <div className='row title-container justify-content-center align-items-center'>
                    <div className='col-3'>
                        <div className='title text-center'>frello</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;