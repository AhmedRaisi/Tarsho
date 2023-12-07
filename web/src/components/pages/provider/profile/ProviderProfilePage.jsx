import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom' // Import useParams here
import axios from 'axios'
import Header from '../hf/header/header'
import Footer from '../hf/footer/footer'
import EditProviderProfileModal from './EditProviderProfileModal'
import '../profile/ProviderProfilePageStyles.css'
import profilePicturePlaceholder from './../../../../assets/profilepictureplaceholder.png'

const ProviderProfile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    contactNumber: '',
    address: '',
    profilePicture: '',
    description: '',
    usertags: [],
    location: { coordinates: [0, 0] }
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { userId } = useParams()

  useEffect(() => {
    if (userId) {
      setIsLoading(true)
      fetchUserData(userId)
    } else {
      console.error('User ID not found')
      setIsLoading(false)
    }
  }, [userId])

  const fetchUserData = async (userId) => {
    try {
      const graphqlQuery = {
        query: `
          query GetUserProfile($id: ID!) {
            userProfile(id: $id) {
              name
              email
              contactNumber
              address
              profilePicture
              description
              usertags
              location {
                coordinates
              }
            }
          }
        `,
        variables: {
          id: userId
        }
      }
      const response = await axios.post('http://localhost:4000/graphql', graphqlQuery)

      const fetchedUser = response.data.data.userProfile
      if (!fetchedUser.location || !fetchedUser.location.coordinates) {
        fetchedUser.location = { coordinates: [0, 0] }
      }

      setUser(fetchedUser)
      setIsLoading(false)
    } catch (err) {
      console.error('Error fetching user data:', err)
      setError(err.message)
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <>
      <Header />
      <div className='provider-profile-page'>
        <div className='profile-card'>
          <h2>{user.name}s Profile</h2>
          <div className='profile-picture-container'>
            <img src={user.profilePicture || profilePicturePlaceholder} alt='Profile' className='profile-picture' />
          </div>
          <div className='profile-details'>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Contact Number: {user.contactNumber}</p>
            <p>Address: {user.address}</p>
            <p>Description: {user.description}</p>
            <p>Tags: {user.usertags.join(', ')}</p>
            <p>
              Location: Latitude {user.location.coordinates?.[0] ?? 'N/A'}, Longitude {user.location.coordinates?.[1] ?? 'N/A'}
            </p>
          </div>
          <button onClick={() => setIsModalOpen(true)}>Edit Profile</button>
        </div>
      </div>
      <Footer />

      {isModalOpen && (
        <EditProviderProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} user={user} onUserUpdate={fetchUserData} />
      )}
    </>
  )
}

export default ProviderProfile
