import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';
import { Link } from 'react-router-dom';

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
      <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <div className='name-login'>Register</div>

        <form className="register-form" onSubmit={handleRegister}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder='Enter your username' value={username} onChange={e => setUsername(e.target.value)} required />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" placeholder='Enter your password' id="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder='Enter your email' value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          <div className="input-group role-selection">
            <div className='radiobutt'>
              <input type="radio" id="roleClient" value="client"  checked={role === "client"} onChange={e => setRole(e.target.value)} />
              <label htmlFor="roleClient">Client</label>
            </div>
            
            <div className='radiobutt'>
              <input type="radio"  id="roleProvider" value="provider" checked={role === "provider"} onChange={e => setRole(e.target.value)} />
              <label htmlFor="roleProvider">Provider</label>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}
           <div className='button-res'>
          <button type="submit" className="signup-button">Register</button>
          </div>
          <div className='linktopage'>
           Allready user  ? &nbsp; 
          <Link to ="/" className='linktopage'>
            Login account
          </Link>
          </div> 
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
