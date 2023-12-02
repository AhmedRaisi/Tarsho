import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './components/pages/home/HomePage'
import ClientDashboard from './components/pages/client/dashboard/ClientDashboard'
import ClientProfilePage from './components/pages/client/profile/ClientProfilePage'
import ClientServicesPage from './components/pages/client/services/ClientServicesPages'
import ProviderDashboard from './components/pages/provider/dashboard/ProviderDashboard'
import ProviderProfilePage from './components/pages/provider/profile/ProviderProfilePage'
import ProviderServicesPage from './components/pages/provider/services/ProviderServicesPage'
import ClientProviderProfile from './components/pages/client/profile/ClientProviderProfile' // Import ClientProviderProfile
import ClientClientProfile from './components/pages/client/profile/ClientClientProfile' // Import ClientClientProfile

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/client' element={<ClientDashboard />} />
        <Route path='/provider' element={<ProviderDashboard />} />
        <Route path='/client/client/:userId' element={<ClientProfilePage />} />
        <Route path='/provider/provider/:userId' element={<ProviderProfilePage />} />
        <Route path='/providerservices' element={<ProviderServicesPage />} />
        <Route path='/clientservices' element={<ClientServicesPage />} />
        <Route path='/client/provider/:userId' element={<ClientProviderProfile />} />
        <Route path='/client/client/:userId' element={<ClientClientProfile />} />
      </Routes>
    </Router>
  )
}

export default App
