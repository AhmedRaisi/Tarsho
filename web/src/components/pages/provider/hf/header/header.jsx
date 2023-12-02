import React from 'react';
import './headstyles.css'; // Ensure the CSS file name is correct
import { useNavigate } from 'react-router-dom'; 
import { Link as RouterLink } from 'react-router-dom'; // Importing Link for standard navigation

const Header = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage


  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    navigate('/');
  };
  
  // Make sure to return the JSX
  return (
    <header className="headerr">
      <div className="header-content">
        <h1>TarshoProvider</h1>
        <nav>
          <RouterLink to="/provider">Dashboard</RouterLink>
          <RouterLink to="/providerservices">Services</RouterLink>
          {/* <Link smooth to="/#ToDo">N/A</Link> */}
          {userId && <RouterLink to={`/provider/provider/${userId}`}>Profile</RouterLink>} {/* Use userId in the link */}
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
