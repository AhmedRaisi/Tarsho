import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../hf/header/header';
import Footer from '../hf/footer/footer';
import '../services/ProviderServicsPageStyles.css';

const ProviderServices = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ name: '', description: '', price: '' });
  const userId = localStorage.getItem('userId'); // Assuming userID is stored in localStorage

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/services/provider/${userId}`);
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleNewServiceChange = (e) => {
    setNewService({ ...newService, [e.target.name]: e.target.value });
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/services', {
        ...newService,
        providerId: userId, // Include providerId if needed
      });
      fetchServices(); // Re-fetch services to update the list
      setNewService({ name: '', description: '', price: '' }); // Reset form
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);
  

  const editService = async (serviceId, updatedService) => {
    try {
      const response = await fetch(`http://localhost:4000/api/services/${serviceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Include authorization headers if needed
        },
        body: JSON.stringify(updatedService)
      });
  
      if (!response.ok) {
        throw new Error('Failed to update service');
      }
  
      const updated = await response.json();
      setServices(services.map(service => service._id === serviceId ? updated : service));
      // Optionally, show success message or handle UI changes
    } catch (error) {
      console.error('Error updating service:', error);
      // Optionally, show error message
    }
  };

  const removeService = async (serviceId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/services/${serviceId}`, {
        method: 'DELETE',
        headers: {
          // Include authorization headers if needed
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete service');
      }
  
      setServices(services.filter(service => service._id !== serviceId));
      // Optionally, show success message or handle UI changes
    } catch (error) {
      console.error('Error deleting service:', error);
      // Optionally, show error message
    }
  };

  return (
    <>
      <Header />
      <div className="provider-services-page">
        <h2>My Services</h2>
        <div className="services-list">
          {services.map(service => (
            <div key={service._id} className="service-item">
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <p>${service.price}</p>
              <div className="service-actions">
                <button onClick={() => editService(service._id, service)}>Edit</button>
                <button onClick={() => removeService(service._id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleAddService} className="add-service-form">
          <div>
            <label>Name:</label>
            <input type="text" name="name" value={newService.name} onChange={handleNewServiceChange} />
          </div>
          <div>
            <label>Description:</label>
            <textarea name="description" value={newService.description} onChange={handleNewServiceChange} />
          </div>
          <div>
            <label>Price:</label>
            <input type="number" name="price" value={newService.price} onChange={handleNewServiceChange} />
          </div>
          <button type="submit">Add Service</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ProviderServices;
