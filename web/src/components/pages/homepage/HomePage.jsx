import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../features/hf/homehf/header/header.jsx';
import Footer from '../../features/hf/homehf/footer/footer.jsx';
import './styles.css';
import LoginModal from './LoginModal.jsx';
import RegisterModal from './RegisterModal.jsx';
import { HashLink } from 'react-router-hash-link'; // Importing HashLink


const HomePage = () => {
  // State to manage which role is trying to log in
  const [showLogin, setShowLogin] = useState(false);
  const [loginRole, setLoginRole] = useState(null);

  // State for managing register modal
  const [showRegister, setShowRegister] = useState(false);

  // Function to open the login modal
  const openLoginModal = (role) => {
    setShowLogin(true);
    setLoginRole(role);
  };

  // Function to open the register modal
  const openRegisterModal = () => {
    setShowRegister(true);
  };

  return (
    <>
      <Header />
      <div id="home" className="hero-section">
      <div className="hero-content">
        <h1>Welcome to Tarsho!</h1>
        <p>Get started by logging in or learn more about our services.</p>
        <div className="hero-buttons">
          <HashLink smooth to="/#services" className="login-button">Login</HashLink>
          <button onClick={() => openRegisterModal()} className="signup-button">Sign up</button>
        </div>
      </div>
    </div>
    <div id="about" className="about-section">
      <h2>About Us</h2>
      <p>Connecting independent providers with clients to foster successful partnerships and thriving businesses.</p>
    </div>
   
      <div id="services" className="services-section">
        <div className="service client">
          <h2>For Clients</h2>
          <p>Discover top independent service providers tailored to your business needs.</p>
          <button onClick={() => openLoginModal('client')} className="login-button">Client Login</button>
        </div>
        <div className="service provider">
          <h2>For Providers</h2>
          <p>Join our network to showcase your services to a broader clientele.</p>
          <button onClick={() => openLoginModal('provider')} className="login-button">Provider Login</button>
        </div>
      </div>
      <div className="contact-section">
      <h2>Contact Us</h2>
      <p>Have any questions? Reach out to us through our contact form.</p>
      <Link to="/contact" className="contact-button">Get In Touch</Link>
    </div>
      <Footer />

      {showLogin && (
        // Modal component here with loginRole passed as a prop
        <LoginModal role={loginRole} onClose={() => setShowLogin(false)} />
      )}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </>
  );
};

export default HomePage;
