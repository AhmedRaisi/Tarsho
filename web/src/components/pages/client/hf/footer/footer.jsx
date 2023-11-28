import React from 'react';
import './foostyles.css'; // Importing CSS

const Footer = () => (
  <footer className="footerr">
    <div className="footer-content">
      <p>&copy; {new Date().getFullYear()} Tarsho. All Rights Reserved.</p>
    </div>
  </footer>
);

export default Footer;
