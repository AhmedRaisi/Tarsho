import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './hf/header/header'; // Adjust the path as necessary
import Footer from './hf/footer/footer'; // Adjust the path as necessary
import './stylesprovider.css';

const ProviderSettings = () => {
  const [originalUser, setOriginalUser] = useState({
    name: '',
    email: '',
    contactNumber: '',
    address: '',
    // serviceDescription: '', // Example additional field for providers
    // ... add other provider-specific fields as necessary
  });
  const [editableUser, setEditableUser] = useState({ ...originalUser });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User ID not found');
        setError('User ID not found');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:4000/api/users/profile/${userId}`);
        setOriginalUser(response.data);
        setEditableUser(response.data); // Initialize editableUser with fetched data
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setEditableUser({ ...editableUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setError('User ID not found');
      return;
    }

    try {
      await axios.put(`http://localhost:4000/api/users/profile/${userId}`, editableUser);
      setOriginalUser(editableUser); // Update originalUser with new data
      // Handle success (e.g., show a success message)
    } catch (err) {
      setError(err.message);
      // Handle errors (e.g., show error message)
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Header />
      <div className="provider-settings-page">
        <h2>Provider Profile Settings</h2>
        <form onSubmit={handleSubmit}>
          {/* Similar fields as in the client settings */}
          <div>
            <label>Name:</label>
            <input type="text" name="name" value={editableUser.name} onChange={handleChange} />
            <span>Current: {originalUser.name}</span>
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={editableUser.email} onChange={handleChange} />
            <span>Current: {originalUser.email}</span>
          </div>
          <div>
            <label>Contact Number:</label>
            <input type="text" name="contactNumber" value={editableUser.contactNumber} onChange={handleChange} />
            <span>Current: {originalUser.contactNumber}</span>
          </div>
          <div>
            <label>Address:</label>
            <input type="text" name="address" value={editableUser.address} onChange={handleChange} />
            <span>Current: {originalUser.address}</span>
          </div>
          <button type="submit">Save Changes</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ProviderSettings;
