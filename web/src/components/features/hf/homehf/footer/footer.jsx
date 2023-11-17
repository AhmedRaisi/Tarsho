import React from 'react';
import './styles.css'; // Importing CSS

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <p>&copy; {new Date().getFullYear()} My Application. All Rights Reserved.</p>
      {/* Add any additional footer content here */}
    </div>
  </footer>
);

export default Footer;
