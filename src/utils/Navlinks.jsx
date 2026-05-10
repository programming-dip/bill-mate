import React from 'react';
import { NavLink } from 'react-router';

const Navlinks = () => {
    return (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink>Item 2</NavLink></li>
            <li><NavLink>Item 3</NavLink></li>
          
        </>
    );
};

export default Navlinks;