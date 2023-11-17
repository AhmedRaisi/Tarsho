import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const HomePage = () => (
  <div className="welcome-container">
    <h1>Welcome to Our Application!</h1>
    <p>Get started by logging in.</p>
    <Link to="/login" className="login-button">Login</Link>
  </div>
);

export default HomePage;
