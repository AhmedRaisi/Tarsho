import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/pages/home/HomePage';
import ClientDashboard from './components/pages/client/dashboard/ClientDashboard';
import ProviderDashboard from './components/pages/provider/dashboard/ProviderDashboard.jsx';
import ClientProfilePage from './components/pages/client/profile/ClientProfilePage';
import ProviderProfilePage from './components/pages/provider/profile/ProviderProfilePage.jsx';
import ProviderServicesPage from './components/pages/provider/services/ProviderServicesPage.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/client" element={<ClientDashboard />} />
        <Route path="/provider" element={<ProviderDashboard />} />\
        <Route path="/clientprofile" element={<ClientProfilePage />} />
        <Route path="/providerprofile" element={<ProviderProfilePage />} />
        <Route path="/providerservices" element={<ProviderServicesPage />} />
        <Route path="/clientservices" element={<ClientProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App;
