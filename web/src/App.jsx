import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/pages/homepage/HomePage'
import ClientHomePage from './components/pages/clienthomepage/ClientHomePage';
import ProviderHomePage from './components/pages/providerhomepage/ProviderHomePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/client" element={<ClientHomePage />} />
        <Route path="/provider" element={<ProviderHomePage />} />
        <Route path="/login" element={<div>Login Page</div>} /> {/* Placeholder for Login Page */}
      </Routes>
    </Router>
  );
};

export default App;
