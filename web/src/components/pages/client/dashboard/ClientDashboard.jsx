import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../hf/header/header'
import axios from 'axios'
import Footer from '../hf/footer/footer'
import '../dashboard/ClientDashboard.css'

const ClientHomePage = () => {
  const [user, setUser] = useState({ name: 'Guest', role: 'client', rating: '3' })
  const [services, setServices] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const userId = localStorage.getItem('userId')

    const fetchUserData = async () => {
      setIsLoading(true)

      if (userId) {
        try {
          const userProfileQuery = {
            query: `
              query GetUserProfile($id: ID!) {
                userProfile(id: $id) {
                  name
                  role
                  rating
                }
              }
            `,
            variables: { id: userId }
          }

          const servicesQuery = {
            query: `
            {
              services {
                id
                provider {
                  id
                  name
                }
                servicename
                description
                price
              }
            }
            `
          }

          const userProfileResponse = await axios.post('http://localhost:4000/graphql', userProfileQuery)
          const servicesResponse = await axios.post('http://localhost:4000/graphql', servicesQuery)

          console.log(`UserProfile Response:`, userProfileResponse.data)
          console.log(`Services Response:`, servicesResponse.data)

          // Check for GraphQL errors
          if (userProfileResponse.data.errors || servicesResponse.data.errors) {
            console.error('GraphQL Error:', userProfileResponse.data.errors, servicesResponse.data.errors)
            setError('GraphQL Error Occurred')
          } else {
            setUser({
              name: userProfileResponse.data.data.userProfile.name,
              role: userProfileResponse.data.data.userProfile.role,
              rating: userProfileResponse.data.data.userProfile.rating
            })

            setServices(servicesResponse.data.data.services)
          }

          // setServices(servicesResponse.data.data.services)
        } catch (err) {
          console.error('Error:', err)
          setError(err.message)
        }
      } else {
        console.error('User ID not found')
      }

      setIsLoading(false)
    }

    fetchUserData()
  }, [])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <>
      <Header />

      <div className='client-homepage'>
        <section className='user-dashboard'>
          <h1>Welcome, {user.name}</h1>
          <p>You are a {user.role} at Tarsho</p>
          <p>Your Rating is {user.rating}⭐</p>
          <p>Find and manage all your services in one place.</p>
        </section>

        <section className='services-overview'>
          <h2>Explore Services</h2>
          <div className='services-list'>
            {services.map((service) => (
              <div key={service.id} className='service-item'>
                <h3>{service.name}</h3>
                <p>
                  Provided by:{' '}
                  {service.provider ? (
                    <Link to={`/client/provider/${service.provider.id}`}>{service.provider.name}</Link>
                  ) : (
                    'Unknown Provider'
                  )}
                </p>
                <p>{service.servicename}</p>
                <p>{service.description}</p>
                <p>Price: ${service.price}</p>
              </div>
            ))}
          </div>
          <Link to='/clientservices' className='show_more__btn'>
            <span>Show More</span>
            <span className='material-symbols-outlined'>arrow_forward</span>
          </Link>
        </section>

        <section className='projects-section'>
          <h2>My Projects</h2>
          <p>Track the progress of your ongoing projects.</p>
          {/* Include a list or a table of current projects */}
        </section>

        <section className='messages-section'>
          <h2>Messages</h2>
          <p>Stay connected with your service providers.</p>
          {/* Could include a messaging interface or notifications */}
        </section>

        <section className='account-settings'>
          <h2>Account Settings</h2>
          <Link to='/settings' className='settings-link'>
            Manage your account
          </Link>
        </section>

        <section className='support-section'>
          <h2>Need Help?</h2>
          <p>Our support team is here to assist you.</p>
          <Link to='/support' className='support-link'>
            Contact Support
          </Link>
        </section>
      </div>

      <Footer />
    </>
  )
}

export default ClientHomePage
