// ProviderProfile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../hf/header/header';
import Footer from '../hf/footer/footer';
import EditProviderProfileModal from './EditProviderProfileModal';
import '../profile/ProviderProfilePageStyles.css';
import profilePicturePlaceholder from './../../../../assets/profilepictureplaceholder.png';

const ProviderProfile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    contactNumber: '',
    address: '',
    profilePicture: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      fetchUserData(userId);
    } else {
      console.error('User ID not found');
    }
  }, [userId]);

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/users/profile/${userId}`);
      setUser(response.data);
    } catch (err) {
      console.error('Error fetching user data:', err);
    }
  };

  return (
    <>
      <Header />
      <div className="provider-profile-page">
        <h2>{user.name}'s Profile</h2>
        <div className="profile-picture-container">
          <img src={user.profilePicture || profilePicturePlaceholder} alt="Profile" className="profile-picture" />
        </div>
        <div className="profile-details">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Contact Number:</strong> {user.contactNumber}</p>
          <p><strong>Address:</strong> {user.address}</p>
        </div>
        <button onClick={() => setIsModalOpen(true)}>Edit Profile</button>
      </div>
      <Footer />

      {isModalOpen && (
        <EditProviderProfileModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          user={user} 
          onUserUpdate={fetchUserData}
        />
      )}
    </>
  );
};

export default ProviderProfile;
