import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const ClientHomePage = () => (
  <div className="welcome-container">
    <h1>Welcome Client</h1>
    <Link to="/" className="login-button">Back to Home</Link>
  </div>
);

export default ClientHomePage;


