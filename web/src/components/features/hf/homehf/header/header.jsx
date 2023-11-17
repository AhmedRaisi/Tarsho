import React from 'react';
import './styles.css'; // Importing CSS

const Header = () => (
  <header className="header">
    <div className="header-content">
      <h1>Tarsho</h1> 
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/services">Services</a>
        <a href="/contact">Contact</a>
        <a href="/login">Login</a>
      </nav>
    </div>
  </header>
);

export default Header;
