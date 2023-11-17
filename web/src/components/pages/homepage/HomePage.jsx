import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <Link to="/client">Go to Client Page</Link>
    <br />
    <Link to="/provider">Go to Provider Page</Link>
  </div>
);

export default HomePage;
