import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Header from '../hf/header/header';
import Footer from '../hf/footer/footer';
import '../services/ProviderServicsPageStyles.css';

const AddServiceModal = ({ isOpen, onClose, onAdd }) => {
  const [newService, setNewService] = useState({ name: '', description: '', price: '' });

  const handleNewServiceChange = (e) => {
    setNewService({ ...newService, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(newService);
    setNewService({ name: '', description: '', price: '' }); // Reset form
    onClose(); // Close modal after submit
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit} className="service-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={newService.name} onChange={handleNewServiceChange} />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" value={newService.description} onChange={handleNewServiceChange} />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input type="number" id="price" name="price" value={newService.price} onChange={handleNewServiceChange} />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
  
};

const ProviderServices = () => {
  const [services, setServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = localStorage.getItem('userId');

  const fetchServices = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/services/provider/${userId}`);
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  }, [userId]); // Include any dependencies here. In this case, it's `userId`.

  useEffect(() => {
    fetchServices();
  }, [fetchServices]); // `fetchServices` is now a dependency.

  const handleAddService = async (newService) => {
    try {
      await axios.post('http://localhost:4000/api/services', {
        ...newService,
        providerId: userId,
      });
      fetchServices();
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="provider-services-page">
        <h2>My Services</h2>
        <button onClick={() => setIsModalOpen(true)}>Add Service</button>
        <div className="services-list">
          {services.map(service => (
            <div key={service._id} className="service-item">
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <p>${service.price}</p>
              {/* Existing service actions */}
            </div>
          ))}
        </div>
        <AddServiceModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onAdd={handleAddService} 
        />
      </div>
      <Footer />
    </>
  );
};

export default ProviderServices;
