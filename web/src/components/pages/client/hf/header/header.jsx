<<<<<<< HEAD
import React from 'react'
import './heade.css' // Ensure the CSS file name is correct
import { useNavigate } from 'react-router-dom'
import { HashLink as Link } from 'react-router-hash-link'

const Header = () => {
  const navigate = useNavigate()
=======
import React from 'react';
import './heade.css'; // Ensure the CSS file name is correct
import { useNavigate } from 'react-router-dom'; 
import { HashLink as Link } from 'react-router-hash-link';
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

  return (
<<<<<<< HEAD
    <header className='headerrr'>
      <div className='header-content'>
        <h1>TarshoClient</h1>
=======
    <header className="headerrr">
      <div className="header-content">
       <h1>
         <span style={{ color: 'white' }}>Tarsho</span>
         <span style={{ color: '#8fae87' }}>Client</span>
        </h1>

>>>>>>> 04e559fade30c18b4cb0a6ecd8c9b1b24cfaf934
        <nav>
          <Link to='/client'>Dashboard</Link>
          <Link smooth to='/clientservices'>
            Services
          </Link>
          {/* <Link smooth to="/ToDo">N/A</Link> */}
<<<<<<< HEAD
          <Link to='/clientprofile'>Profile</Link>
          <button onClick={handleLogout} className='logout-button'>
            Logout
          </button>
=======
          <RouterLink to={`/client/client/${userId}`}>Profile</RouterLink> {/* Use userId in the link */}
          <button onClick={handleLogout} className="logout-button">Logout</button>
>>>>>>> 04e559fade30c18b4cb0a6ecd8c9b1b24cfaf934
        </nav>
      </div>
    </header>
  )
}

export default Header
