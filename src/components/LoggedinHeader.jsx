import React from "react";
import Menu from "./Menu";
import '../styles/LoggedinHeader.css';
import CaraLogoBlack from "../assets/cara_logo_black.png";

const LoggedinHeader = () => {
    return (
        <header className='header-loggedin'>
            <img src={CaraLogoBlack} className='logo-header-loggedin' alt="cara logo black" />
        </header>
    );
};

export default LoggedinHeader;