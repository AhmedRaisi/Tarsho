import React, { useState } from 'react'
import { HashLink as Link } from 'react-router-hash-link'
import './hstyles.css'
import LoginModal from './../../LoginModal.jsx'
import TarshoLogo from './../../../../../assets/TarshoLogoConcept.png' // Make sure the path is correct

const Header = () => {
  const [showLogin, setShowLogin] = useState(false)

  const openLoginModal = () => {
    setShowLogin(true)
  }

  return (
    <>
      <header className='headers'>
        <div className='header-content'>
          {/* Logo and Text Container */}
          <Link to='/#home' className='logo-container'>
            <img src={TarshoLogo} alt='Tarsho Logo' className='header-logo' />
            <span className='logo-text'>Tarsho</span>
          </Link>
          <nav>
            <Link smooth to='/#home'>
              Home
            </Link>
            <Link smooth to='/#about'>
              About
            </Link>
            <Link smooth to='/#services'>
              Services
            </Link>
            <Link smooth to='/#contact'>
              Contact
            </Link>
            <button onClick={openLoginModal} className='login-button'>
              Login
            </button>
          </nav>
        </div>
      </header>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  )
}

export default Header
