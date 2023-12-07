import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../hf/header/header'
import Footer from '../hf/footer/footer'
import '../services/ProviderServicsPageStyles.css'
import { Link } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'

const ProviderServicesPage = () => {
  const [mixedData, setMixedData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const itemsPerPage = 10
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async (page, searchTerm = '') => {
    setIsLoading(true)
    const skip = (page - 1) * itemsPerPage
    try {
      const query = searchTerm
        ? `
        query SearchData($searchTerm: String!) {
          search(searchTerm: $searchTerm) {
            ...on User {
              id
              username
              role
            }
            ...on Service {
              id
              servicename
              price
            }
          }
        }
      `
        : `
        query FetchData($limit: Int!, $skip: Int!) {
          randomUsers(limit: $limit, skip: $skip) {
            id
            username
            role
          }
          randomServices(limit: $limit, skip: $skip) {
            id
            servicename
            price
          }
        }
      `
      const response = await axios.post('http://localhost:4000/graphql', {
        query,
        variables: searchTerm ? { searchTerm } : { limit: itemsPerPage, skip: skip }
      })

      const data = searchTerm ? response.data.data.search : [...response.data.data.randomUsers, ...response.data.data.randomServices]
      console.log(data)
      setMixedData(data)
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData(currentPage, searchTerm)
  }, [currentPage, searchTerm])

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  const renderCard = (item) => {
    const isUser = item.username !== undefined // If 'username' exists, it's a User

    if (isUser) {
      return (
        <div key={item.id} className='service-item'>
          User: <Link to={`/provider/provider/${item.id}`}>{item.username}</Link>
          <p>Role: {item.role}</p>
        </div>
      )
    } else {
      // Otherwise, treat it as a Service
      return (
        <div key={item.id} className='service-item'>
          <h3>Service: {item.servicename}</h3>
          <p>Price: ${item.price}</p>
        </div>
      )
    }
  }

  return (
    <>
      <Header />
      <div className='provider-services-page'>
        <input type='text' placeholder='Search...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <h2>Random Services and Users</h2>
            <div className='services-list'>
              {mixedData.length > 0 ? mixedData.map(renderCard) : <div className='no__data'>No data available</div>}
            </div>
            {!searchTerm && (
              <div className='pagination-controls'>
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>
                  Previous
                </button>
                <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  )
}

export default ProviderServicesPage
