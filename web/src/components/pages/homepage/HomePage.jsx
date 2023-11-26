import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../features/hf/homehf/header/header.jsx';
import Footer from '../../features/hf/homehf/footer/footer.jsx';
import './styles.css';

const HomePage = () => (
  <>
    <Header />
    <div className="hero-section">
      <div className="hero-content">
        <h1>Welcome to Tarsho!</h1>
        <p>Get started by logging in or learn more about our services.</p>
        <div className="hero-buttons">
          <Link to="/login" className="login-button">Login</Link>
          <Link to="/signup" className="signup-button">Sign Up</Link>
        </div>
      </div>
    </div>
    <div className="about-section">
      <h2>About Us</h2>
      <p>Connecting independent providers with clients to foster successful partnerships and thriving businesses.</p>
    </div>
    <div className="services-section">
      <div className="service client">
        <h2>For Clients</h2>
        <p>Discover top independent service providers tailored to your business needs.</p>
      </div>
      <div className="service provider">
        <h2>For Providers</h2>
        <p>Join our network to showcase your services to a broader clientele.</p>
      </div>
    </div>
    <div className="contact-section">
      <h2>Contact Us</h2>
      <p>Have any questions? Reach out to us through our contact form.</p>
      <Link to="/contact" className="contact-button">Get In Touch</Link>
    </div>
    <Footer />
  </>
);

export default HomePage;
