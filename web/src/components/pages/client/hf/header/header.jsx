import React from 'react';
import './heade.css'; // Importing CSS
import { HashLink as Link } from 'react-router-hash-link'; // Importing HashLink

const Header = () => (
  <header className="headerr">
    <div className="header-content">
      <h1>TarshoClient</h1>
      <nav>
        <Link smooth to="/#home">
          Dashboard
        </Link>
        <Link smooth to="/#about">
          Services
        </Link>
        <Link smooth to="/#services">
          Messages
        </Link>
        <Link smooth to="/#contact">
          Settings
        </Link>
        <Link smooth to="/#services">
          Logout
        </Link>
      </nav>
    </div>
  </header>
);

export default Header;
