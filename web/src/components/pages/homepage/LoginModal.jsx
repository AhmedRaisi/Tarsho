// LoginModal.jsx
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import './styles.css'; // Import specific styles for the modal

const LoginModal = ({ role, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Make a POST request to the login endpoint
      const response = await axios.post('/api/users/login', { 
        username, 
        password,
        role // Include role if your backend logic needs it
      });

      // Log the response (e.g., token) for now
      console.log(response.data);

      // Close the modal
      onClose();
    } catch (error) {
      console.error('Login failed:', error.response?.data?.msg || error.message);
      // Handle login failure (e.g., show an error message)
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
