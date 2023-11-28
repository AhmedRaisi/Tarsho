import React from 'react';
import './footstyles.css'; // Importing CSS

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <p>&copy; {new Date().getFullYear()} Tarsho. All Rights Reserved.</p>
    </div>
  </footer>
);

export default Footer;
