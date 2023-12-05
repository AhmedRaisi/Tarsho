import React, { useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

const EditClientProfileModal = ({ isOpen, onClose, user, onUserUpdate }) => {
  const [editableUser, setEditableUser] = useState({ ...user })

  const handleChange = (e) => {
    setEditableUser({ ...editableUser, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const userId = localStorage.getItem('userId')

    const graphqlQuery = {
      query: `
        mutation UpdateUser($id: ID!, $name: String, $email: String, $contactNumber: String, $address: String, $profilePicture: String) {
          updateUser(id: $id, name: $name, email: $email, contactNumber: $contactNumber, address: $address, profilePicture: $profilePicture) {
            name
            email
            contactNumber
            address
            profilePicture
          }
        }
      `,
      variables: {
        id: userId,
        name: editableUser.name, // Assuming 'name' field maps to 'realname' in the User model
        email: editableUser.email,
        contactNumber: editableUser.contactNumber,
        address: editableUser.address,
        profilePicture: editableUser.profilePicture
      }
    }

    try {
      await axios.post('http://localhost:4000/graphql', graphqlQuery)
      onUserUpdate(userId) // Update the parent component's user data
      onClose()
    } catch (err) {
      console.error('Error updating profile:', err)
    }
  }

  if (!isOpen) return null

  return (
    <div className='modal'>
      <div className='modal-content'>
        <span className='close-button' onClick={onClose}>
          &times;
        </span>
        <form onSubmit={handleSubmit}>
          {/* Form fields */}
          <div className='form-group'>
            <label htmlFor='name'>Name:</label>
            <input type='text' id='name' name='name' value={editableUser.name} onChange={handleChange} required />
          </div>

          <div className='form-group'>
            <label htmlFor='email'>Email:</label>
            <input type='email' id='email' name='email' value={editableUser.email} onChange={handleChange} required />
          </div>

          <div className='form-group'>
            <label htmlFor='contactNumber'>Contact Number:</label>
            <input type='text' id='contactNumber' name='contactNumber' value={editableUser.contactNumber} onChange={handleChange} />
          </div>

          <div className='form-group'>
            <label htmlFor='address'>Address:</label>
            <input type='text' id='address' name='address' value={editableUser.address} onChange={handleChange} />
          </div>

          <button type='submit' className='save-changes-button'>
            Save Changes
          </button>
        </form>
      </div>
    </div>
  )
}

EditClientProfileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  onUserUpdate: PropTypes.func.isRequired
}

export default EditClientProfileModal
