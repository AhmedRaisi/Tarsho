import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import Header from '../hf/header/header'
import Footer from '../hf/footer/footer'
import AddServiceProviderModal from './AddServiceProviderModal' // Adjust path as needed
import '../services/ProviderServicsPageStyles.css'

const FETCH_SERVICES_QUERY = `
  query FetchProviderServices($provider: ID!) {
    providerServices(provider: $provider) {
      id
      description
      price
    }
  }
`

const ProviderServices = () => {
  const [services, setServices] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const userId = localStorage.getItem('userId')

  const fetchServices = useCallback(async () => {
    try {
      const response = await axios.post('http://localhost:4000/graphql', {
        query: FETCH_SERVICES_QUERY,
        variables: { provider: userId }
      })
      if (response.data.data && response.data.data.providerServices) {
        setServices(response.data.data.providerServices)
      }
    } catch (error) {
      console.error('Error fetching services:', error)
    }
  }, [userId])

  useEffect(() => {
    fetchServices()
  }, [fetchServices])

  const handleAddService = (newService) => {
    setServices([...services, newService])
    setIsModalOpen(false)
  }

  return (
    <>
      <Header />
      <div className='provider-services-page'>
        <h2>My Services</h2>
        <button onClick={() => setIsModalOpen(true)}>Add Service</button>
        <div className='services-list'>
          {services.map((service) => (
            <div key={service.id} className='service-item'>
              <p>{service.description}</p>
              <p>${service.price}</p>
              {/* Existing service actions */}
            </div>
          ))}
        </div>
        <AddServiceProviderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddService} providerId={userId} />
      </div>
      <Footer />
    </>
  )
}

export default ProviderServices
