/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import axios from 'axios'
import './styles.css'
import { Link } from 'react-router-dom'

const RegisterModal = ({ onClose }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [selectedTags, setSelectedTags] = useState([])

  const [error, setError] = useState('')

  const placeholderTags = ['Design', 'Development', 'Marketing', 'Photography', 'Writing']

  const handleTagSelect = (event) => {
    const tag = event.target.value
    if (tag && !selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const handleTagDelete = (tagToDelete) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToDelete))
  }

  const handleRegister = async (event) => {
    event.preventDefault()

    const graphqlQuery = {
      query: `
        mutation RegisterUser($username: String!, $password: String!, $email: String!, $role: String!, $usertags: String!) {
          register(username: $username, password: $password, email: $email, role: $role, usertags: $usertags) {
            token
            userId
            role
            usertags
          }
        }
      `,
      variables: {
        username: username,
        password: password,
        email: email,
        role: role,
        usertags: selectedTags
      }
    }

    try {
      const response = await axios.post('http://localhost:4000/graphql', graphqlQuery)
      console.log('Registration successful:', response.data)
      onClose() // Close the modal
    } catch (error) {
      console.error('Registration failed:', error.response?.data?.errors[0]?.message || error.message)
      setError(error.response?.data?.errors[0]?.message || 'Registration failed')
    }
  }

  return (
    <div className='register-modal'>
      <div className='register-modal-content'>
        <span className='close-button' onClick={onClose}>
          &times;
        </span>
        <div className='name-login'>Create an account</div>

        <form className='register-form' onSubmit={handleRegister}>
          <div className='input-group'>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              id='username'
              placeholder='Enter your username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className='input-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              placeholder='Enter your password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className='input-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              aria-label='email'
              id='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='input-group role-selection'>
            <div className='radiobutt'>
              <input
                type='radio'
                aria-label='role'
                id='roleClient'
                value='client'
                checked={role === 'client'}
                onChange={(e) => setRole(e.target.value)}
              />
              <label htmlFor='roleClient'>Client</label>
            </div>

            <div className='radiobutt'>
              <input
                type='radio'
                id='roleProvider'
                value='provider'
                checked={role === 'provider'}
                onChange={(e) => setRole(e.target.value)}
              />
              <label htmlFor='roleProvider'>Provider</label>
            </div>
          </div>

          <div className='input-group'>
            <label htmlFor='tags'>Tags</label>
            <select id='tags' onChange={handleTagSelect} defaultValue=''>
              <option value='' disabled>
                Select a tag
              </option>
              {placeholderTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>

          <div className='tag-list'>
            {selectedTags.map((tag) => (
              <div key={tag} className='tag-card'>
                {tag}
                <span className='delete-tag' onClick={() => handleTagDelete(tag)}>
                  &times;
                </span>
              </div>
            ))}
          </div>

          {error && <div className='error-message'>{error}</div>}
          <div className='button-res'>
            <button type='submit' className='signup-button'>
              Register
            </button>
          </div>
          <div className='linktopage'>
            Already a user? &nbsp;
            <Link to='/' className='linktopage'>
              Login account
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterModal
