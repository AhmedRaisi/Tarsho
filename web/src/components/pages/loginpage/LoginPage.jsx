import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css'; // Assuming the same stylesheet as HomePage
import Header from '../../features/hf/homehf/header/header.jsx';
import Footer from '../../features/hf/homehf/footer/footer.jsx';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(null); // New state for role
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    // Add logic to validate user credentials
    // Navigate to the client or provider page based on the selected role
    const targetPath = role === 'client' ? '/client' : '/provider';
    navigate(targetPath);
  };

  return (
    <>
      <Header />
      <div className="welcome-container">
        <h1>Login to Our Application</h1>
        <p>Please choose your role to login.</p>
        
        <div className="login-links">
          <button onClick={() => setRole('client')} className="login-button">Client Login</button>
          <br />
          <button onClick={() => setRole('provider')} className="login-button">Provider Login</button>
        </div>

        {role && (
          <form className="login-form" onSubmit={handleLogin}>
            <h2>Login as {role.charAt(0).toUpperCase() + role.slice(1)}</h2>
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
        )}
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
