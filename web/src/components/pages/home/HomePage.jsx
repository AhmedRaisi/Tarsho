/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from './hf/header/header.jsx'
import Footer from './hf/footer/footer.jsx'
import './styles.css'
import LoginModal from './LoginModal.jsx'
import RegisterModal from './RegisterModal.jsx'
import { HashLink } from 'react-router-hash-link' // Importing HashLink

const HomePage = () => {
  // State to manage which role is trying to log in
  const [showLogin, setShowLogin] = useState(false)
  const [loginRole, setLoginRole] = useState(null)

  // State for managing register modal
  const [showRegister, setShowRegister] = useState(false)

  // Function to open the login modal
  const openLoginModal = (role) => {
    setShowLogin(true)
    setLoginRole(role)
  }

  // Function to open the register modal
  const openRegisterModal = () => {
    setShowRegister(true)
  }

  return (
    <>
      <Header />
      <div id='home' className='hero-section'>
        <div className='hero-content'>
          <h1>Welcome to Tarsho!</h1>
          <p>
            "Empowering Your Independence, Enriching Your Choices – Tarsho is where businesses and clients connect to turn unique visions
            into vibrant realities."
          </p>
          <p>Get started by logging in or learn more about our services.</p>
          <div className='hero-buttons'>
            <HashLink smooth to='/#about' className='login-button'>
              Learn More
            </HashLink>
            <button onClick={() => openRegisterModal()} className='signup-button'>
              Get Started
            </button>
          </div>
        </div>
      </div>

      <div id='about' className='mission-section'>
        <h2>Our Mission</h2>
        <p>
          "To empower service providers with the tools and visibility they need to grow their businesses while providing clients with an
          unparalleled selection of specialized services..."
        </p>
      </div>

      <div className='about-section'>
        <h2>Our Story</h2>
        <p>
          Born from a vision to bridge the gap between independent service providers and clients seeking bespoke services, Tarsho emerged as
          the catalyst for entrepreneurial success...
        </p>
      </div>

      <div className='vision-section'>
        <h2>Our Vision</h2>
        <p>
          "To be the leading platform where independent service providers flourish and clients discover a world of tailor-made services..."
        </p>
      </div>
      <div id='services' className='services-container'>
        <h2 className='services-title'>Services</h2>

        {/* Development Navigation Buttons */}
        <Link to='/client' className='dev-nav-button'>
          (DEV) Client Home
        </Link>
        <Link to='/provider' className='dev-nav-button'>
          (DEV) Provider Home
        </Link>

        {/* Services Cards Section */}
        <div className='services-section'>
          <div className='service client'>
            <h2>For Clients</h2>
            <p>Discover top independent service providers tailored to your business needs.</p>
            <button onClick={() => openLoginModal('client')} className='login-button'>
              Client Login
            </button>
          </div>
          <div className='service provider'>
            <h2>For Providers</h2>
            <p>Join our network to showcase your services to a broader clientele.</p>
            <button onClick={() => openLoginModal('provider')} className='login-button'>
              Provider Login
            </button>
          </div>
        </div>
      </div>
      <div id='contact' className='contact-section'>
        <h2>Contact Us</h2>
        <p>Have any questions? Reach out to us through our contact form.</p>
        <Link to='/contact' className='contact-button'>
          Get In Touch
        </Link>
      </div>
      <Footer />

      {showLogin && (
        // Modal component here with loginRole passed as a prop
        <LoginModal role={loginRole} onClose={() => setShowLogin(false)} />
      )}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </>
  )
}

export default HomePage
