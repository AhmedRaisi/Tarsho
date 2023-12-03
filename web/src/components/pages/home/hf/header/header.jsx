import React, { useState } from 'react'
import { HashLink as Link } from 'react-router-hash-link'
import './hstyles.css'
import LoginModal from './../../LoginModal.jsx'

const Header = () => {
  const [showLogin, setShowLogin] = useState(false)

  // Function to open the login modal
  const openLoginModal = () => {
    setShowLogin(true)
  }

  return (
    <>
      <header className='headers'>
        <div className='header-content'>
          <h1>Tarsho</h1>
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
