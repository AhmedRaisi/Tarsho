<<<<<<< HEAD
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './components/pages/home/HomePage'
import ClientDashboard from './components/pages/client/dashboard/ClientDashboard'
import ClientProfilePage from './components/pages/client/profile/ClientProfilePage'
import ClientServicesPage from './components/pages/client/services/ClientServicesPages'
import ProviderDashboard from './components/pages/provider/dashboard/ProviderDashboard.jsx'
import ProviderProfilePage from './components/pages/provider/profile/ProviderProfilePage.jsx'
import ProviderServicesPage from './components/pages/provider/services/ProviderServicesPage.jsx'
=======
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/home/HomePage';
import ClientDashboard from './components/pages/client/dashboard/ClientDashboard';
import ClientProfilePage from './components/pages/client/profile/ClientProfilePage';
import ClientServicesPage from './components/pages/client/services/ClientServicesPages';
import ProviderDashboard from './components/pages/provider/dashboard/ProviderDashboard';
import ProviderProfilePage from './components/pages/provider/profile/ProviderProfilePage';
import ProviderServicesPage from './components/pages/provider/services/ProviderServicesPage';
import ClientProviderProfile from './components/pages/client/profile/ClientProviderProfile'; // Import ClientProviderProfile
import ClientClientProfile from './components/pages/client/profile/ClientClientProfile'; // Import ClientClientProfile
>>>>>>> 04e559fade30c18b4cb0a6ecd8c9b1b24cfaf934

const App = () => {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        <Route path='/' element={<HomePage />} />
        <Route path='/client' element={<ClientDashboard />} />
        <Route path='/provider' element={<ProviderDashboard />} />
        <Route path='/clientprofile' element={<ClientProfilePage />} />
        <Route path='/providerprofile' element={<ProviderProfilePage />} />
        <Route path='/providerservices' element={<ProviderServicesPage />} />
        <Route path='/clientservices' element={<ClientServicesPage />} />
=======
        <Route path="/" element={<HomePage />} />
        <Route path="/client" element={<ClientDashboard />} />
        <Route path="/provider" element={<ProviderDashboard />} />
        <Route path="/client/client/:userId" element={<ClientProfilePage />} />
        <Route path="/provider/provider/:userId" element={<ProviderProfilePage />} />
        <Route path="/providerservices" element={<ProviderServicesPage />} />
        <Route path="/clientservices" element={<ClientServicesPage />} />
        <Route path="/client/provider/:userId" element={<ClientProviderProfile />} />
        <Route path="/client/client/:userId" element={<ClientClientProfile />} />
>>>>>>> 04e559fade30c18b4cb0a6ecd8c9b1b24cfaf934
      </Routes>
    </Router>
  )
}

export default App
