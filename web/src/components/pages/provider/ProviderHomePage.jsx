import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './hf/header/header';
import Footer from './hf/footer/footer';
import './stylesprovider.css';

const ProviderHomePage = () => {
  const [user, setUser] = useState({ name: '', role: '' });
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User ID not found');
        return;
      }

      try {
        const response = await fetch(`http://localhost:4000/api/users/profile/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        setUser({ name: data.username, role: data.role });
        setServices(data.services || []); // Assuming the user data includes services
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);


  return (
    <>
    <Header />
      <div className="provider-homepage">
        <section className="user-dashboard">
          <h1>Welcome, {user.name}</h1>
          <p>Role: {user.role}</p>
          <p>Manage your services and connect with clients.</p>
        </section>

        <section className="services-management">
          <h2>My Services</h2>
          <p>Overview of the services you offer.</p>
          <div className="services-list">
            {services.map(service => (
              <div key={service._id} className="service-item">
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                {/* Display other service details */}
              </div>
            ))}
          </div>
        </section>

        <section className="client-projects">
          <h2>Client Projects</h2>
          <p>Monitor ongoing projects with your clients.</p>
          {/* Include a list or a table of ongoing projects with clients */}
        </section>

        <section className="messages-section">
          <h2>Messages</h2>
          <p>Communicate with your clients and team.</p>
          {/* Could include a messaging interface or notifications */}
        </section>

        <section className="account-settings">
          <h2>Account Settings</h2>
          <Link to="/settings" className="settings-link">
            Manage your profile
          </Link>
        </section>

        <section className="provider-resources">
          <h2>Resources</h2>
          <p>Access resources to enhance your service delivery.</p>
          {/* Links to resources, tools, or articles */}
        </section>

        <section className="support-section">
          <h2>Need Help?</h2>
          <p>Our support team is here to assist you with any queries.</p>
          <Link to="/support" className="support-link">
            Contact Support
          </Link>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default ProviderHomePage;
