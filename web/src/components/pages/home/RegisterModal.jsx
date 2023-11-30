import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

const RegisterModal = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async event => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:4000/api/users/register',
        {
          username,
          password,
          email,
          role,
        }
      );
      console.log('Registration successful:', response.data);
      onClose(); // Close the modal
    } catch (error) {
      console.error('Registration failed:', error.response?.data?.msg || error.message);
      setError(error.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="register-modal">
      <div className="register-modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>Register</h2>
        <form className="register-form" onSubmit={handleRegister}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} required />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          <div className="input-group role-selection">
            <div>
              <input type="radio" id="roleClient" value="client" checked={role === "client"} onChange={e => setRole(e.target.value)} />
              <label htmlFor="roleClient">Client</label>
            </div>
            
            <div>
              <input type="radio" id="roleProvider" value="provider" checked={role === "provider"} onChange={e => setRole(e.target.value)} />
              <label htmlFor="roleProvider">Provider</label>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
