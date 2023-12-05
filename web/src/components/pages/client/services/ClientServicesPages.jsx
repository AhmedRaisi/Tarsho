import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../hf/header/header'
import Footer from '../hf/footer/footer'
import '../services/ClientServicesPages.css'

const FETCH_USERS_AND_SERVICES_QUERY = `
  query FetchData($limit: Int!, $skip: Int!) {
    randomUsers(limit: $limit, skip: $skip) {
      id
      name
      role
    }
    randomServices(limit: $limit, skip: $skip) {
      id
      description
      price
    }
  }
`

const ClientServicesPage = () => {
  const [mixedData, setMixedData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [isLoading, setIsLoading] = useState(true)
  // const [error, setError] = useState(null);

  const fetchData = async (page) => {
    setIsLoading(true)
    const skip = (page - 1) * itemsPerPage
    try {
      const response = await axios.post('http://localhost:4000/graphql', {
        query: FETCH_USERS_AND_SERVICES_QUERY,
        variables: { limit: itemsPerPage, skip: skip }
      })

      const usersData = response.data.data.randomUsers.map((user) => ({ ...user, type: 'user' })) || []
      const servicesData = response.data.data.randomServices.map((service) => ({ ...service, type: 'service' })) || []
      const combinedData = [...usersData, ...servicesData]

      setMixedData(combinedData)
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData(currentPage)
  }, [currentPage])

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  const renderCard = (item) => {
    if (item.type === 'user') {
      return (
        <div key={item.id} className='service-item'>
          <h3>User: {item.name}</h3>
          <p>Role: {item.role}</p>
        </div>
      )
    } else if (item.type === 'service') {
      return (
        <div key={item.id} className='service-item'>
          <h3>Service: {item.description}</h3>
          <p>Price: ${item.price}</p>
        </div>
      )
    }
  }

  if (isLoading) return <div>Loading...</div>
  // if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Header />
      <div className='client-services-page'>
        <h2>Random Services and Users</h2>
        <div className='services-list'>
          {mixedData.length > 0 ? mixedData.map(renderCard) : <div className='no__data'>No data available</div>}
        </div>
        <div className='pagination-controls'>
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>
            Previous
          </button>
          <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ClientServicesPage
