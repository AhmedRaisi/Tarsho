import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Header from '../hf/header/header'
import Footer from '../hf/footer/footer'
import './ProviderProfilePageStyles.css'
import profilePicturePlaceholder from './../../../../assets/profilepictureplaceholder.png'

const FETCH_SERVICES_QUERY = `
  query FetchProviderServices($provider: ID!) {
    providerServices(provider: $provider) {
      id
      servicename
      description
      price
    }
  }
`

const ProviderProviderProfile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    contactNumber: '',
    address: '',
    profilePicture: '',
    description: '',
    usertags: []
  })
  const [services, setServices] = useState([]) // State for services
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { userId } = useParams()

  useEffect(() => {
    if (userId) {
      setIsLoading(true)
      fetchUserData(userId)
      fetchServices(userId)
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
      const fetchedUser = response.data.data.userProfile
      setUser(fetchedUser)
      setIsLoading(false)
    } catch (err) {
      console.error('Error fetching user data:', err)
      setError(err.message)
      setIsLoading(false)
    }
  }

  const fetchServices = useCallback(async (providerId) => {
    try {
      const response = await axios.post('http://localhost:4000/graphql', {
        query: FETCH_SERVICES_QUERY,
        variables: { provider: providerId }
      })
      if (response.data.data && response.data.data.providerServices) {
        setServices(response.data.data.providerServices)
      }
    } catch (error) {
      console.error('Error fetching services:', error)
    }
  }, [])

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
          <h2>{user.name}&apos;s Profile</h2>
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
        </div>
        <div className='services-card'>
          <h3>Services Offered</h3>
          <div className='services-list'>
            {services.map((service) => (
              <div key={service.id} className='service-item'>
                <p>{service.servicename}</p>
                <p>{service.description}</p>
                <p>${service.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ProviderProviderProfile
