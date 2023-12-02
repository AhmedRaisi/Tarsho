import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../hf/header/header';
import Footer from '../hf/footer/footer';
import '../services/ClientServicesPages.css';

const ClientServicesPage = () => {
    const [mixedData, setMixedData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    //const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRandomServices = async () => {
            try {
                //const usersRequest = axios.get('http://localhost:4000/api/services/random-users');
                const servicesRequest = axios.get('http://localhost:4000/api/services/random-services');
                console.log(servicesRequest);
                // console.log(usersRequest);
                // const [servicesResponse, usersResponse] = await Promise.all([servicesRequest, usersRequest]);
                const [servicesResponse] = await Promise.all([servicesRequest]);
                console.log(servicesResponse);

                // const combinedData = [...servicesResponse.data, ...usersResponse.data];
                const combinedData = [...servicesResponse.data].sort(() => 0.5 - Math.random());

                setMixedData(combinedData);
                setIsLoading(false);

            } catch (err) {
                //setError('Error fetching random services:', err);
                setIsLoading(false);
            }
        };

        fetchRandomServices();
    }, []);


    const renderCard = item => (
      <div key={item._id} className="service-item">
          <h3>{item.username ? `User: ${item.username}` : `Service: ${item.name}`}</h3>
          <p>{item.description || 'No additional information'}</p>
          {item.price && <p>Price: ${item.price}</p>}
      </div>
  );




    if (isLoading) return <div>Loading...</div>;
  //if (error) return <div>Error: {error}</div>;


    return (
        <>
            <Header />
      <div className="client-services-page">
        <h2>Random Services and Users</h2>
        <div className="services-list">
        {mixedData.length > 0 ? mixedData.map(renderCard) : <div className="no__data">No data available</div>}
        </div>
      </div>
            <Footer />
        </>
    );
};

export default ClientServicesPage;
