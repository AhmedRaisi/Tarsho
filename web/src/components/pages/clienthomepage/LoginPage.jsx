import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './LoginPage.css'; // Import CSS for styling

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Dummy function to handle login - Replace with real authentication logic
  const handleLogin = (event) => {
    event.preventDefault();
    // Add logic to validate user credentials
    // For now, just navigate to the client or provider page
    navigate('/client'); // Or '/provider' based on user role
  };

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <h2>Login</h2>
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
  );
};

export default LoginPage;
