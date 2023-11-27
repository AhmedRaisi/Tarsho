// LoginModal.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const LoginModal = ({ role, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/users/login', {
        username,
        password
      });

      console.log(response.data); // Log the response (e.g., token)
      onClose(); // Close the modal

      // Navigate based on the role
      if (role === 'client') {
        navigate('/client/ClientHomePage');
      } else if (role === 'provider') {
        navigate('/provider/ProviderHomePage');
      }

    } catch (error) {
      console.error('Login failed:', error.response?.data?.msg || error.message);
    }
  };

  return (
    <div className="login-modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>Login as {role.charAt(0).toUpperCase() + role.slice(1)}</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
