<<<<<<< HEAD
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../hf/header/header' // Adjust the path as necessary
import Footer from '../hf/footer/footer' // Adjust the path as necessary
import '../profile/ProviderProfilePageStyles.css'
import profilePicturePlaceholder from './../../../../assets/profilepictureplaceholder.png'

const ProviderSettings = () => {
  const [originalUser, setOriginalUser] = useState({
=======
// ProviderProfile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../hf/header/header';
import Footer from '../hf/footer/footer';
import EditProviderProfileModal from './EditProviderProfileModal';
import '../profile/ProviderProfilePageStyles.css';
import profilePicturePlaceholder from './../../../../assets/profilepictureplaceholder.png';

const ProviderProfile = () => {
  const [user, setUser] = useState({
>>>>>>> 04e559fade30c18b4cb0a6ecd8c9b1b24cfaf934
    name: '',
    email: '',
    contactNumber: '',
    address: '',
    profilePicture: ''
<<<<<<< HEAD
    // serviceDescription: '', // Example additional field for providers
    // ... add other provider-specific fields as necessary
  })
  const [editableUser, setEditableUser] = useState({ ...originalUser })

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId')
      if (!userId) {
        console.error('User ID not found')
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      try {
        const response = await axios.get(`http://localhost:4000/api/users/profile/${userId}`)
        setOriginalUser(response.data)
        setEditableUser(response.data) // Initialize editableUser with fetched data
        setIsLoading(false)
      } catch (err) {
        setError(err.message)
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const handleChange = (e) => {
    setEditableUser({ ...editableUser, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const userId = localStorage.getItem('userId')
    if (!userId) {
      setError('User ID not found')
      return
=======
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      fetchUserData(userId);
    } else {
      console.error('User ID not found');
>>>>>>> 04e559fade30c18b4cb0a6ecd8c9b1b24cfaf934
    }
  }, [userId]);

  const fetchUserData = async (userId) => {
    try {
<<<<<<< HEAD
      await axios.put(`http://localhost:4000/api/users/profile/${userId}`, editableUser)
      setOriginalUser(editableUser) // Update originalUser with new data
      // Handle success (e.g., show a success message)
    } catch (err) {
      setError(err.message)
      // Handle errors (e.g., show error message)
=======
      const response = await axios.get(`http://localhost:4000/api/users/profile/${userId}`);
      setUser(response.data);
    } catch (err) {
      console.error('Error fetching user data:', err);
>>>>>>> 04e559fade30c18b4cb0a6ecd8c9b1b24cfaf934
    }
  }

<<<<<<< HEAD
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <>
      <Header />
      <div className='provider-settings-page'>
        <h2>Provider Profile Settings</h2>
        <div className='profile-picture-container'>
          <img src={editableUser.profilePicture || profilePicturePlaceholder} alt="" className='profile-picture' />
        </div>
        <form onSubmit={handleSubmit}>
          {/* Similar fields as in the client settings */}
          <div>
            <label>Name:</label>
            <input type='text' aria-label='name' name='name' value={editableUser.name} onChange={handleChange} />
            <span>Current: {originalUser.name}</span>
          </div>
          <div>
            <label>Email:</label>
            <input type='email' aria-label='email' name='email' value={editableUser.email} onChange={handleChange} />
            <span>Current: {originalUser.email}</span>
          </div>
          <div>
            <label>Contact Number:</label>
            <input
              type='text'
              aria-label='contact number'
              name='contactNumber'
              value={editableUser.contactNumber}
              onChange={handleChange}
            />
            <span>Current: {originalUser.contactNumber}</span>
          </div>
          <div>
            <label>Address:</label>
            <input type='text' aria-label='address' name='address' value={editableUser.address} onChange={handleChange} />
            <span>Current: {originalUser.address}</span>
          </div>
          <button type='submit'>Save Changes</button>
        </form>
=======
  return (
    <>
      <Header />
      <div className="provider-profile-page">
        <h2>{user.name}'s Profile</h2>
        <div className="profile-picture-container">
          <img src={user.profilePicture || profilePicturePlaceholder} alt="Profile" className="profile-picture" />
        </div>
        <div className="profile-details">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Contact Number:</strong> {user.contactNumber}</p>
          <p><strong>Address:</strong> {user.address}</p>
        </div>
        <button onClick={() => setIsModalOpen(true)}>Edit Profile</button>
>>>>>>> 04e559fade30c18b4cb0a6ecd8c9b1b24cfaf934
      </div>
      <Footer />

      {isModalOpen && (
        <EditProviderProfileModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          user={user} 
          onUserUpdate={fetchUserData}
        />
      )}
    </>
  )
}

<<<<<<< HEAD
export default ProviderSettings
=======
export default ProviderProfile;
>>>>>>> 04e559fade30c18b4cb0a6ecd8c9b1b24cfaf934
