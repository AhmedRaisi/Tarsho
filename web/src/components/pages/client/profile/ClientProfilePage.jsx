import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../hf/header/header';
import Footer from '../hf/footer/footer';
import EditUserProfileModal from './EditClientProfileModal';
import '../profile/ClientProfilePage.css';
import profilePicturePlaceholder from './../../../../assets/profilepictureplaceholder.png';

const ClientProfile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    contactNumber: '',
    address: '',
    profilePicture: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      setIsLoading(true);
      fetchUserData(userId);
    } else {
      console.error('User ID not found');
      setIsLoading(false);
    }
  }, [userId]);

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/users/profile/${userId}`);
      setUser(response.data);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  const loggedInUserId = localStorage.getItem('userId');
  const isEditable = userId === loggedInUserId;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Header />
      <div className="user-profile-page">
        <h2>{user.name}'s Profile</h2>
        <div className="profile-picture-container">
          <img src={user.profilePicture || profilePicturePlaceholder} alt="Profile" className="profile-picture" />
        </div>
        <div className="profile-details">
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Contact Number: {user.contactNumber}</p>
          <p>Address: {user.address}</p>
        </div>
        {isEditable && (
          <button onClick={() => setIsModalOpen(true)}>Edit Profile</button>
        )}
      </div>
      <Footer />

      {isModalOpen && (
        <EditUserProfileModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          user={user} 
          onUserUpdate={fetchUserData}
        />
      )}
    </>
  );
};

export default ClientProfile;
