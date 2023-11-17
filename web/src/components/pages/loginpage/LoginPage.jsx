import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; // Assuming the same stylesheet as HomePage

const LoginPage = () => (
  <div className="welcome-container">
    <h1>Login to Our Application</h1>
    <p>Please choose your role to login.</p>
    <div className="login-links">
      <Link to="/client" className="login-button">Client Login</Link>
      <br />
      <Link to="/provider" className="login-button">Provider Login</Link>
    </div>
  </div>
);

export default LoginPage;
