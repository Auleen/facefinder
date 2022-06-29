import React from 'react';
import './Navbar.css'
function Navbar() {
    return ( <><div className='nav'>
    <div className='logo'>
        <h1>🧠BigBrain.</h1>
    </div>
    <div>
        <button className='sgnout'><strong>Sign Out</strong></button>
    </div>
        </div></> );
}

export default Navbar;