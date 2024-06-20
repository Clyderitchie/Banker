import React from 'react';
import { Link } from 'react-router-dom';

import './nav.css';

function Nav() {

    return (
        <>
            <nav id="navbar" className="navbar navbar-expand-lg bg-body-tertiary border-bottom border-black mb-5">
                <div className="container-fluid d-flex justify-content-start">
                    <Link className="navbar-brand" to='/home'>Teller Central</Link>
                </div>
                <div className="collapse navbar-collapse d-flex justify-content-end">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to='/profiles'>Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/menus'>Menu</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/settings'>Settings</Link>
                        </li>
                    </ul>
                </div>

            </nav>
        </>
    )
};

export default Nav;