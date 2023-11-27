import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/pages/home/HomePage'
import ClientHomePage from './components/pages/client/ClientHomePage';
import ProviderHomePage from './components/pages/provider/ProviderHomePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/client" element={<ClientHomePage />} />
        <Route path="/provider" element={<ProviderHomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
