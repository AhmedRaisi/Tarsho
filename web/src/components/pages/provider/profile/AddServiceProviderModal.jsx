import React, { useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

const ADD_SERVICE_MUTATION = `
  mutation AddService($provider: ID!, $servicename: String!, $description: String!, $price: Int!) {
    addService(provider: $provider, servicename: $servicename, description: $description, price: $price) {
      id
      servicename
      description
      price
    }
  }
`

const AddServiceProviderModal = ({ isOpen, onClose, providerId, onAdd }) => {
  const [newService, setNewService] = useState({ servicename: '', description: '', price: '' })

  const handleNewServiceChange = (e) => {
    setNewService({ ...newService, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:4000/graphql', {
        query: ADD_SERVICE_MUTATION,
        variables: {
          provider: providerId,
          servicename: newService.servicename,
          description: newService.description,
          price: parseInt(newService.price, 10)
        }
      })

      if (response.data.data.addService) {
        onAdd(response.data.data.addService)
        setNewService({ servicename: '', description: '', price: '' })
        onClose()
      }
    } catch (error) {
      console.error('Error adding service:', error)
    }
  }

  if (!isOpen) return null

  return (
    <div className='modal'>
      <div className='modal-content'>
        <span className='close-button' onClick={onClose}>
          &times;
        </span>
        <form onSubmit={handleSubmit} className='service-form'>
          <div className='form-group'>
            <label htmlFor='servicename'>Service name:</label>
            <textarea id='servicename' name='servicename' value={newService.servicename} onChange={handleNewServiceChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Description:</label>
            <textarea id='description' name='description' value={newService.description} onChange={handleNewServiceChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='price'>Price:</label>
            <input type='number' id='price' name='price' value={newService.price} onChange={handleNewServiceChange} />
          </div>
          <button type='submit'>Save</button>
        </form>
      </div>
    </div>
  )
}

AddServiceProviderModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  providerId: PropTypes.string.isRequired
}

export default AddServiceProviderModal
