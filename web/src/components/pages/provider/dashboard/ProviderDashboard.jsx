import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../hf/header/header'
import Footer from '../hf/footer/footer'
import '../dashboard/ProviderDashboardStyles.css'
import axios from 'axios'

const FETCH_USER_PROFILE_QUERY = `
  query GetUserProfile($id: ID!) {
    userProfile(id: $id) {
      name
      role
      rating
    }
  }
`

const FETCH_PROVIDER_SERVICES_QUERY = `
  query FetchProviderServices($provider: ID!) {
    providerServices(provider: $provider) {
      id
      servicename
      description
      price
    }
  }
`

const ProviderHomePage = () => {
  const [user, setUser] = useState({ name: '', role: '', rating: null })
  const [services, setServices] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const userId = localStorage.getItem('userId')

    const fetchUserData = async () => {
      setIsLoading(true)

      if (!userId) {
        console.error('User ID not found')
        setIsLoading(false)
        return
      }

      try {
        const userProfileResponse = await axios.post('http://localhost:4000/graphql', {
          query: FETCH_USER_PROFILE_QUERY,
          variables: { id: userId }
        })

        if (userProfileResponse.data.data.userProfile) {
          setUser(userProfileResponse.data.data.userProfile)
        }

        const servicesResponse = await axios.post('http://localhost:4000/graphql', {
          query: FETCH_PROVIDER_SERVICES_QUERY,
          variables: { provider: userId }
        })

        if (servicesResponse.data.data.providerServices) {
          setServices(servicesResponse.data.data.providerServices)
        }

        setIsLoading(false)
      } catch (err) {
        console.error('Error:', err)
        setError(err.message)
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <>
      <Header />
      <div className='provider-homepage'>
        <section className='user-dashboard'>
          <h1>Welcome, {user.name}</h1>
          <p>You are a {user.role} at Tarsho</p>
          <p>Your Rating is {user.rating}⭐</p>
          <p>Manage your services and connect with clients.</p>
        </section>

        <section className='services-management'>
          <h2>My Services</h2>
          <div className='services-list'>
            {services.map((service) => (
              <div key={service.id} className='service-item'>
                <h3>{service.servicename}</h3>
                <p>{service.description}</p>
                <p>{service.price}</p>
              </div>
            ))}
          </div>
          <Link to='/providerservices' className='show_more__btn'>
            <span>Show More</span>
            <span className='material-symbols-outlined'>arrow_forward</span>
          </Link>
        </section>

        <section className='client-projects'>
          <h2>Client Projects</h2>
          <p>Monitor ongoing projects with your clients.</p>
          {/* Include a list or a table of ongoing projects with clients */}
        </section>

        <section className='messages-section'>
          <h2>Messages</h2>
          <p>Communicate with your clients and team.</p>
          {/* Could include a messaging interface or notifications */}
        </section>

        <section className='account-settings'>
          <h2>Account Settings</h2>
          <Link to='/settings' className='settings-link'>
            Manage your profile
          </Link>
        </section>

        <section className='provider-resources'>
          <h2>Resources</h2>
          <p>Access resources to enhance your service delivery.</p>
          {/* Links to resources, tools, or articles */}
        </section>

        <section className='support-section'>
          <h2>Need Help?</h2>
          <p>Our support team is here to assist you with any queries.</p>
          <Link to='/support' className='support-link'>
            Contact Support
          </Link>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default ProviderHomePage
