import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const ClientHomePage = () => (
  <div className="welcome-container">
    <h1>Welcome to Our Application!</h1>
    <p>Get started by logging in.</p>
    <Link to="/login" className="login-button">Login</Link>
    <Link to="/" className="login-button">Back to Home</Link>
  </div>
);

export default ClientHomePage;


