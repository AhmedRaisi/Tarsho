import React, { useState } from 'react';
import axios from 'axios'; // Make sure Axios is installed
import './styles.css'; // Assuming you have a common stylesheet

const RegisterModal = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); // Optional, depends on your requirements
  const [role, setRole] = useState(''); // Optional, if you have different user roles

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      // Make a POST request to the register endpoint
      const response = await axios.post('/api/users/register', { 
        username, 
        password,
        email, // Include if using email
        role // Include if using roles
      });

      console.log(response.data); // Handle the response
      onClose(); // Close the modal after successful registration
    } catch (error) {
      console.error('Registration failed:', error.response?.data?.msg || error.message);
      // Handle registration failure
    }
  };

  return (
    <div className="login-modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>Register</h2>
        <form className="login-form" onSubmit={handleRegister}>
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
          {/* Include additional fields as needed */}
          <button type="submit" className="login-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
