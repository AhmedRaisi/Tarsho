import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Header from '../hf/header/header'
import Footer from '../hf/footer/footer'
import EditUserProfileModal from './EditClientProfileModal'
import '../profile/ClientProfilePage.css'
import profilePicturePlaceholder from './../../../../assets/profilepictureplaceholder.png'

const ClientProfile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    contactNumber: '',
    address: '',
    profilePicture: '',
    description: '',
    usertags: []
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
          }
        }
      `,
        variables: {
          id: userId
        }
      }
      const response = await axios.post('http://localhost:4000/graphql', graphqlQuery)

      setUser(response.data.data.userProfile)
      setIsLoading(false)
    } catch (err) {
      console.error('Error fetching user data:', err)
      setError(err.message)
      setIsLoading(false)
    }
  }

  const loggedInUserId = localStorage.getItem('userId')
  const isEditable = userId === loggedInUserId

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <>
      <Header />
      <div className='client-profile-page'>
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
          </div>
          {isEditable && <button onClick={() => setIsModalOpen(true)}>Edit Profile</button>}
        </div>
      </div>
      <Footer />

      {isModalOpen && (
        <EditUserProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} user={user} onUserUpdate={fetchUserData} />
      )}
    </>
  )
}

export default ClientProfile
