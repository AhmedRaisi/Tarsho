<<<<<<< HEAD
import React from 'react'
import './headstyles.css' // Ensure the CSS file name is correct
import { useNavigate } from 'react-router-dom'
import { HashLink as Link } from 'react-router-hash-link' // Importing HashLink for smooth scrolling
import { Link as RouterLink } from 'react-router-dom' // Importing Link for standard navigation

const Header = () => {
  const navigate = useNavigate()
=======
import React from 'react';
import './headstyles.css'; // Ensure the CSS file name is correct
import { useNavigate } from 'react-router-dom'; 
import { Link as RouterLink } from 'react-router-dom'; // Importing Link for standard navigation

const Header = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage

>>>>>>> 04e559fade30c18b4cb0a6ecd8c9b1b24cfaf934

  const handleLogout = () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('token')
    navigate('/')
  }

  // Make sure to return the JSX
  return (
<<<<<<< HEAD
    <header className='headerr'>
      <div className='header-content'>
        <h1>TarshoProvider</h1>
        <nav>
          <RouterLink to='/provider'>Dashboard</RouterLink>
          <RouterLink to='/providerservices'>Services</RouterLink>
          <Link smooth to='/#ToDo'>
            N/A
          </Link>
          <RouterLink to='/providerprofile'>Profile</RouterLink>
          <button onClick={handleLogout} className='logout-button'>
            Logout
          </button>
=======
    <header className="headerr">
      <div className="header-content">
      <h1>
         <span style={{ color: 'white' }}>Tarsho</span>
         <span style={{ color: '#cc7832' }}>Provider</span>
        </h1>
        <nav>
          <RouterLink to="/provider">Dashboard</RouterLink>
          <RouterLink to="/providerservices">Services</RouterLink>
          {/* <Link smooth to="/#ToDo">N/A</Link> */}
          {userId && <RouterLink to={`/provider/provider/${userId}`}>Profile</RouterLink>} {/* Use userId in the link */}
          <button onClick={handleLogout} className="logout-button">Logout</button>
>>>>>>> 04e559fade30c18b4cb0a6ecd8c9b1b24cfaf934
        </nav>
      </div>
    </header>
  )
}

export default Header
