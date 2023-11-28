import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './hf/header/header';
import Footer from './hf/footer/footer';
import './styles.css';

const ClientHomePage = () => {
  const [user, setUser] = useState({ name: '', role: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User ID not found');
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:4000/api/users/profile/${userId}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        console.log(data);
        setUser({ name: data.username, role: data.role });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <Header />

      <div className="client-homepage">
        <section className="user-dashboard">
          <h1>Welcome, {user.name}</h1>
          <p>Role: {user.role}</p>
          <p>Find and manage all your services in one place.</p>
        </section>

        <section className="services-overview">
          <h2>Explore Services</h2>
          <p>Discover a variety of services tailored to your needs.</p>
          {/* This section can include cards or lists of services */}
        </section>

        <section className="projects-section">
          <h2>My Projects</h2>
          <p>Track the progress of your ongoing projects.</p>
          {/* Include a list or a table of current projects */}
        </section>

        <section className="messages-section">
          <h2>Messages</h2>
          <p>Stay connected with your service providers.</p>
          {/* Could include a messaging interface or notifications */}
        </section>

        <section className="account-settings">
          <h2>Account Settings</h2>
          <Link to="/settings" className="settings-link">
            Manage your account
          </Link>
        </section>

        <section className="support-section">
          <h2>Need Help?</h2>
          <p>Our support team is here to assist you.</p>
          <Link to="/support" className="support-link">
            Contact Support
          </Link>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default ClientHomePage;
