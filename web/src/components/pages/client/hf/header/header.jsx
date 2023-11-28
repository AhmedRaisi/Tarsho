import React from 'react';
import './heade.css'; // Ensure the CSS file name is correct
import { useNavigate } from 'react-router-dom'; 
import { HashLink as Link } from 'react-router-hash-link'; // Importing HashLink for smooth scrolling
import { Link as RouterLink } from 'react-router-dom'; // Importing Link for standard navigation

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    navigate('/');
  };
  
  // Make sure to return the JSX
  return (
    <header className="headerrr">
      <div className="header-content">
        <h1>TarshoClient</h1>
        <nav>
          <RouterLink to="/client">Dashboard</RouterLink>
          <Link smooth to="/#ToDo">Services</Link>
          <Link smooth to="/#ToDo">Messages</Link>
          <RouterLink to="/clientsettings">Settings</RouterLink>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
