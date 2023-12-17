// ClientProviderProfile.jsx
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Header from '../hf/header/header'
import Footer from '../hf/footer/footer'
import './ClientProfilePage.css'
import profilePicturePlaceholder from './../../../../assets/profilepictureplaceholder.png'

const ClientClientProfile = () => {
  const [client, setClient] = useState({
    name: '',
    email: '',
    contactNumber: '',
    address: '',
    profilePicture: ''
  })

  const { userId } = useParams()

  useEffect(() => {
    console.log('User ID from useParams:', userId)
    if (userId) {
      fetchClientData(userId)
    } else {
      console.error('User ID not found')
    }
  }, [userId])

  const fetchClientData = async (userId) => {
    try {
      console.log('Fetching data for client:', userId)
      const response = await axios.get(`http://localhost:4000/api/users/profile/${userId}`)
      console.log('Fetched provider data:', response.data)
      setClient(response.data)
    } catch (err) {
      console.error('Error fetching provider data:', err)
    }
  }

  return (
    <>
      <Header />
      <div className='provider-profile-page'>
        <h2>{client.name}&aposs Profile</h2>
        <div className='profile-picture-container'>
          <img src={client.profilePicture || profilePicturePlaceholder} alt='Client' className='profile-picture' />
        </div>
        <div className='profile-details'>
          <p>
            <strong>Name:</strong> {client.name}
          </p>
          <p>
            <strong>Role: Client</strong>
          </p>
          <p>
            <strong>Email:</strong> {client.email}
          </p>
          <p>
            <strong>Contact Number:</strong> {client.contactNumber}
          </p>
          <p>
            <strong>Address:</strong> {client.address}
          </p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ClientClientProfile
