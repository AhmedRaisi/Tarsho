import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../hf/header/header';
import Footer from '../hf/footer/footer';
import '../services/ClientServicesPages.css';

const ClientServicesPage = () => {
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRandomServices = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:4000/api/services/random');
                setServices(response.data); // Adjust according to your actual response structure
                setIsLoading(false);
            } catch (err) {
                setError('Error fetching random services:', err);
                setIsLoading(false);
            }
        };

        fetchRandomServices();
    }, []);

    if (isLoading) return <div>Loading...</div>;

    return (
        <>
            <Header />
            <div className="client-services-page">
                <h2>Available Services</h2>
                <div className="services-list">
                    {
                        services.length ?
                            (
                                services.map(service => (
                        <div key={service._id} className="service-item">
                            <h3>{service.name}</h3>
                            <p>Provided by: {service.providerId ? service.providerId.name : 'Unknown Provider'}</p> 
                            <p>{service.description}</p>
                            <p>Price: ${service.price}</p>
                        </div>
                        
                    ))): (<div className="no__data">No service is available at the moment</div>)
                    }
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ClientServicesPage;
