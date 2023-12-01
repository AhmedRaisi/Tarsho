// LoginModal.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { Link } from 'react-router-dom';

const LoginModal = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [Log, setLog]=useState(false);
  const navigate = useNavigate();

  const handleLogin = async event => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:4000/api/users/login',
        {
          username,
          password,
        }
      );

      console.log('Login response:', response.data);
      onClose(); // Close the modal

      const userRole = response.data.role; // Assuming the role is returned in the login response
      localStorage.setItem('userId', response.data.userId); // Assuming the user ID is in the response

      // Navigate based on the user's role
      if (userRole === 'client') {
        navigate('/client');
      } else if (userRole === 'provider') {
        navigate('/provider');
      } else {
        console.error('Unknown role');
      }
    } catch (error) {
      console.error(
        setLog(true),
        'Login failed:',
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
        <div className='name-login'>Login</div>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder='Enter your Username'
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
              placeholder='Enter your Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <div className='button-res'>
            <button type="submit" className="login-button">
              Login
            </button>
          <div className='linktopage'>
           New user  ? &nbsp; 
          <Link to ="/register" className='linktopage'>
            Rigester account
          </Link>
          </div>  
            {Log ? <span>Invalid Credentials</span> : ""}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
