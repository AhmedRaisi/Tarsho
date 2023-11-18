import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../features/hf/homehf/header/header.jsx';
import Footer from '../../features/hf/homehf/footer/footer.jsx';
import './styles.css';

const HomePage = () => (
  <>
    <Header />
    <div className="welcome-container">
      <h1>Welcome to Our Application!</h1>
      <p>Get started by logging in.</p>
      <Link to="/login" className="login-button">Login</Link>
    </div>
    <Footer />
  </>
);

export default HomePage;
