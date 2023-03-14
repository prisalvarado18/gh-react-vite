import React from "react";
import Menu from "./Menu";
import '../styles/LoggedinHeader.css';

const LoggedinHeader = () => {
    return (
        <header className='header-loggedin'>
            <img src="./src/assets/cara_logo_black.png" className='logo-header-loggedin' alt="cara logo black" />
        </header>
    );
};

export default LoggedinHeader;