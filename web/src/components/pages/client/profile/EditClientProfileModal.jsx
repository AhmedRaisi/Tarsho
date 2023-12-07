import React, { useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

const EditClientProfileModal = ({ isOpen, onClose, user, onUserUpdate }) => {
  const [editableUser, setEditableUser] = useState({ ...user })
  const [governorate, setGovernorate] = useState('')
  const [selectedTags, setSelectedTags] = useState(user.usertags || [])
  const placeholderTags = ['Design', 'Development', 'Marketing', 'Photography', 'Writing']

  const handleChange = (e) => {
    setEditableUser({ ...editableUser, [e.target.name]: e.target.value })
  }

  const handleTagSelect = (event) => {
    const tag = event.target.value
    if (tag && !selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const handleTagDelete = (tagToDelete) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToDelete))
  }

  const handleGovernorateChange = (e) => {
    setGovernorate(e.target.value)
    // Update the location in editableUser based on governorate selection
    const coordinates = convertGovernorateToCoordinates(e.target.value)
    setEditableUser({ ...editableUser, location: { coordinates } })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const userId = localStorage.getItem('userId')

    const graphqlQuery = {
      query: `
        mutation UpdateUser($id: ID!, $name: String, $email: String, $contactNumber: String, $address: String, $profilePicture: String, $location: LocationInput, $usertags: [String!], $description: String) {
          updateUser(id: $id, name: $name, email: $email, contactNumber: $contactNumber, address: $address, profilePicture: $profilePicture, location: $location, usertags: $usertags, description: $description) {
            name
            email
            contactNumber
            address
            profilePicture
            usertags
            description
            location {
              coordinates
            }
          }
        }
      `,
      variables: {
        id: userId,
        ...editableUser,
        usertags: selectedTags
      }
    }

    try {
      const response = await axios.post('http://localhost:4000/graphql', graphqlQuery)
      console.log('Update response:', response)
      onUserUpdate(userId)
      onClose()
    } catch (err) {
      console.error('Error updating profile:', err)
    }
  }
  const convertGovernorateToCoordinates = (governorate) => {
    // Define the mapping from governorate to coordinates here
    const governorateCoordinates = {
      // Define coordinates for each governorate
    }

    return governorateCoordinates[governorate] || [0, 0]
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
            <label htmlFor='profilePicture'>Profile Picture URL:</label>
            <input type='text' id='profilePicture' name='profilePicture' value={editableUser.profilePicture} onChange={handleChange} />
          </div>

          <div className='form-group'>
            <label htmlFor='description'>Description:</label>
            <textarea id='description' name='description' value={editableUser.description} onChange={handleChange} />
          </div>

          <div className='form-group'>
            <label htmlFor='contactNumber'>Contact Number:</label>
            <input type='text' id='contactNumber' name='contactNumber' value={editableUser.contactNumber} onChange={handleChange} />
          </div>

          <div className='form-group'>
            <label htmlFor='address'>Address:</label>
            <input type='text' id='address' name='address' value={editableUser.address} onChange={handleChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='governorate'>Governorate:</label>
            <select id='governorate' name='governorate' value={governorate} onChange={handleGovernorateChange}>
              <option value=''>Select Governorate</option>
              {/* List of governorates */}
            </select>
          </div>
          {/* Tag selection field */}
          <div className='form-group'>
            <label htmlFor='tags'>Tags:</label>
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

          {/* Display selected tags */}
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
