import React from 'react';
import { NavLink } from 'react-router';
import "./NavlinksStyle.css"

const Navlinks = () => {
    return (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/bills">Bills</NavLink></li>
            <li><NavLink to="/profile">Profile</NavLink></li>
          
        </>
    );
};

export default Navlinks;