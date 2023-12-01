// ClientProviderProfile.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../hf/header/header';
import Footer from '../hf/footer/footer';
import '../profile/ClientProfilePage.css';
import profilePicturePlaceholder from './../../../../assets/profilepictureplaceholder.png';

const ClientProviderProfile = () => {
  const [provider, setProvider] = useState({
    name: '',
    email: '',
    contactNumber: '',
    address: '',
    profilePicture: ''
  });

    const { userId } = useParams();

    useEffect(() => {
        console.log('User ID from useParams:', userId);
        if (userId) {
          fetchProviderData(userId);
        } else {
          console.error('User ID not found');
        }
      }, [userId]);


      const fetchProviderData = async (userId) => {
        try {
          console.log('Fetching data for provider:', userId);
          const response = await axios.get(`http://localhost:4000/api/users/profile/${userId}`);
          console.log('Fetched provider data:', response.data);
          setProvider(response.data);
        } catch (err) {
          console.error('Error fetching provider data:', err);
        }
      };
      

  return (
    <>
      <Header />
      <div className="provider-profile-page">
        <h2>{provider.name}'s Profile</h2>
        <div className="profile-picture-container">
          <img src={provider.profilePicture || profilePicturePlaceholder} alt="Provider" className="profile-picture" />
        </div>
        <div className="profile-details">
          <p><strong>Name:</strong> {provider.name}</p>
          <p><strong>Role: Provider</strong></p>
          <p><strong>Email:</strong> {provider.email}</p>
          <p><strong>Contact Number:</strong> {provider.contactNumber}</p>
          <p><strong>Address:</strong> {provider.address}</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ClientProviderProfile;
