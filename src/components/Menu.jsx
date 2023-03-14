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
      <button className={`menu-button ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <img className={isOpen ? 'move-left' : ''} src="./src/assets/cutlery-icon.png" alt="cutlery icon" />
      </button>
      <nav className={`menu ${isOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <img src="./src/assets/users-icon.png" alt="users icon" />
            <Link to="/gh-react-vite/users">Users</Link>
          </li>
          <li>
            <img src="./src/assets/products-icon.png" alt="products icon" />
            <Link to="/gh-react-vite/products">Products</Link>
          </li>
          <li>
            <img src="./src/assets/orders-icon.png" alt="orders icon" />
            <Link to="/gh-react-vite/orders">Orders</Link>
          </li>
          <li>
            <img src="./src/assets/status-icon.png" alt="status icon" />
            <Link to="/gh-react-vite/status">Status</Link>
          </li>
          <li>
            <img src="./src/assets/profile-icon.png" alt="profile icon" />
            <Link to="/gh-react-vite/profile">Profile</Link>
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
