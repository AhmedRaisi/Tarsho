import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../hf/header/header'
import Footer from '../hf/footer/footer'
import EditProviderProfileModal from './EditProviderProfileModal'
import '../profile/ProviderProfilePageStyles.css'
import profilePicturePlaceholder from './../../../../assets/profilepictureplaceholder.png'

const ProviderProfile = () => {
  const [user, setUser] = useState({
    realname: '',
    email: '',
    contactNumber: '',
    address: '',
    profilePicture: ''
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const userId = localStorage.getItem('userId')

  useEffect(() => {
    if (userId) {
      fetchUserData(userId)
    } else {
      console.error('User ID not found')
    }
  }, [userId])

  const fetchUserData = async (userId) => {
    try {
      const graphqlQuery = {
        query: `
          query GetUserProfile($id: ID!) {
            userProfile(id: $id) {
              username
              email
              contactNumber
              address
              profilePicture
            }
          }
        `,
        variables: {
          id: userId
        }
      }
      const response = await axios.post('http://localhost:4000/graphql', graphqlQuery)
      setUser(response.data.data.userProfile)
    } catch (err) {
      console.error('Error fetching user data:', err)
    }
  }

  return (
    <>
      <Header />
      <div className='provider-profile-page'>
        <h2>{user.username}s Profile</h2> {/* Corrected &aposs to 's */}
        <div className='profile-picture-container'>
          <img src={user.profilePicture || profilePicturePlaceholder} alt='Profile' className='profile-picture' />
        </div>
        <div className='profile-details'>
          <p>
            <strong>Name:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Contact Number:</strong> {user.contactNumber}
          </p>
          <p>
            <strong>Address:</strong> {user.address}
          </p>
        </div>
        <button onClick={() => setIsModalOpen(true)}>Edit Profile</button>
      </div>
      <Footer />

      {isModalOpen && (
        <EditProviderProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} user={user} onUserUpdate={fetchUserData} />
      )}
    </>
  )
}

export default ProviderProfile
