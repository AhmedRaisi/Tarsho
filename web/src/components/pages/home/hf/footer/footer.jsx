import React from 'react';
import './styles.css'; // Importing CSS

const Footer = () => (
  <footer className="footers">
    <div className="footer-content">
      <p>&copy; {new Date().getFullYear()} Tarsho. All Rights Reserved.</p>
    </div>
  </footer>
);

export default Footer;
