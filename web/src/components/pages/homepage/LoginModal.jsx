// LoginModal.jsx
import React, { useState } from 'react';
import './styles.css'; // Import specific styles for the modal

const LoginModal = ({ role, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    // Add your login logic here
    console.log(`Login as ${role}:`, username, password);
    onClose(); // Close the modal after login
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
