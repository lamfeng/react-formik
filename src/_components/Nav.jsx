import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <NavLink exact to="/" className="nav-item nav-link">Home</NavLink>
                <NavLink to="/users" className="nav-item nav-link">Users</NavLink>
                <NavLink to="/demo1" className="nav-item nav-link">Demo 1</NavLink>
                <NavLink to="/demo2" className="nav-item nav-link">Demo 2</NavLink>
                <NavLink to="/demo3" className="nav-item nav-link">Demo 3</NavLink>
                <NavLink to="/demo4" className="nav-item nav-link">Demo 4</NavLink>
            </div>
        </nav>
    );
}

export { Nav };