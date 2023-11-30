import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

const RegisterModal = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

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
      console.log(response.data);
      onClose();
    } catch (error) {
      console.error(
        'Registration failed:',
        error.response?.data?.msg || error.message
      );
    }
  };

  return (
    <div className="login-modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>Register</h2>
        <form className="login-form" onSubmit={handleRegister}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Role</label>
            <div className='role-radio'>
              <div>
                <input
                  type="radio"
                  id="Provider"
                  value="Provider"
                  checked={role === "Provider"}
                  onChange={() => setRole("Provider")}
                />
                <label htmlFor="Provider">Provider</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="Client"
                  value="Client"
                  checked={role === "Client"}
                  onChange={() => setRole("Client")}
                />
                <label htmlFor="Client">Client</label>
              </div>
            </div>
          </div>
          <button type="submit" className="login-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
