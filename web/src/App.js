import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <Link to="/client">Go to Client Page</Link>
    <br />
    <Link to="/provider">Go to Provider Page</Link>
  </div>
);

const ClientHomePage = () => (
  <div>
    <h1>Client Home Page</h1>
    <Link to="/">Back to Home</Link>
  </div>
);

const ProviderHomePage = () => (
  <div>
    <h1>Provider Home Page</h1>
    <Link to="/">Back to Home</Link>
  </div>
);

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
