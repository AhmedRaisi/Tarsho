import React from 'react';
import './styles.css'; // Importing CSS
import { HashLink as Link } from 'react-router-hash-link'; // Importing HashLink

const Header = () => (
  <header className="header">
    <div className="header-content">
      <h1>Tarsho</h1>
      <nav>
        <Link smooth to="/#home">Home</Link>
        <Link smooth to="/#about">About</Link>
        <Link smooth to="/#services">Services</Link>
        <Link smooth to="/#contact">Contact</Link>
        <Link smooth to="/#services">Login</Link>
      </nav>
    </div>
  </header>
);

export default Header;
