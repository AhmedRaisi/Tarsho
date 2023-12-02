import React, { useState } from 'react';
import axios from 'axios';

const EditProviderProfileModal = ({ isOpen, onClose, user, onUserUpdate }) => {
  const [editableUser, setEditableUser] = useState({ ...user });

  const handleChange = (e) => {
    setEditableUser({ ...editableUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('userId');
      await axios.put(`http://localhost:4000/api/users/profile/${userId}`, editableUser);
      onUserUpdate(userId); // Update the parent component's user data
      onClose();
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="name">Name:</label>
    <input 
      type="text" 
      id="name" 
      name="name" 
      value={editableUser.name} 
      onChange={handleChange} 
      required 
    />
  </div>

  <div className="form-group">
    <label htmlFor="email">Email:</label>
    <input 
      type="email" 
      id="email" 
      name="email" 
      value={editableUser.email} 
      onChange={handleChange} 
      required 
    />
  </div>

  <div className="form-group">
    <label htmlFor="contactNumber">Contact Number:</label>
    <input 
      type="text" 
      id="contactNumber" 
      name="contactNumber" 
      value={editableUser.contactNumber} 
      onChange={handleChange}
    />
  </div>

  <div className="form-group">
    <label htmlFor="address">Address:</label>
    <input 
      type="text" 
      id="address" 
      name="address" 
      value={editableUser.address} 
      onChange={handleChange}
    />
  </div>

  <button type="submit" className="save-changes-button">Save Changes</button>
 </form>

      </div>
    </div>
  );
};

export default EditProviderProfileModal;
