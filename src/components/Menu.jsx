import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import Header from './Header';
import OtroHeader from './OtroHeader';
import LoggedinHeader from './LoggedinHeader';
import '../styles/Menu.css';

const Menu = () => {
  const navigate = useNavigate();

  const onLogoutClick = () => {
    navigate("/gh-react-vite/");
    localStorage.clear();
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <LoggedinHeader />
      <button className="menu-button" onClick={toggleMenu}>
        Menu
      </button>
      <nav className={`menu ${isOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <Link to="/gh-react-vite/">Login</Link>
          </li>
          <li>
            <Link to="/gh-react-vite/users">Users</Link>
          </li>
          <li>
            <button className="link-button" onClick={onLogoutClick}>
              Log Out
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Menu;
