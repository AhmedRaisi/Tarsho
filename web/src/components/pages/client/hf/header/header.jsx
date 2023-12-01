import React from 'react';
import './heade.css'; // Ensure the CSS file name is correct
import { useNavigate } from 'react-router-dom'; 
import { HashLink as Link } from 'react-router-hash-link';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    navigate('/');
  };
  
  return (
    <header className="headerrr">
      <div className="header-content">
        <h1>TarshoClient</h1>
        <nav>
          <Link to="/client">Dashboard</Link>
          <Link smooth to="/clientservices">Services</Link>
          {/* <Link smooth to="/ToDo">N/A</Link> */}
          <Link to="/clientprofile">Profile</Link>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
