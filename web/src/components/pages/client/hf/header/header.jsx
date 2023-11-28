import React from 'react';
import './heade.css'; // Ensure the CSS file name is correct
import { HashLink as Link } from 'react-router-hash-link'; // Importing HashLink for smooth scrolling
import { Link as RouterLink } from 'react-router-dom'; // Importing Link for standard navigation

const Header = () => (
  <header className="headerr">
    <div className="header-content">
      <h1>TarshoClient</h1>
      <nav>
      <RouterLink to="/client">
          Dashboard
        </RouterLink>
        <Link smooth to="/#about">
          Services
        </Link>
        <Link smooth to="/#messages">
          Messages
        </Link>
        <RouterLink to="/clientsettings">
          Settings
        </RouterLink>
        <Link smooth to="/#logout">
          Logout
        </Link>
      </nav>
    </div>
  </header>
);

export default Header;
