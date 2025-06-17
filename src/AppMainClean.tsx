import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import without path alias to test
import HomePageDebug from './pages/HomePageDebug';

const App: React.FC = () => {
  return (
    <Router>
      <div style={{minHeight: '100vh', backgroundColor: '#f8f9fa'}}>
        <Routes>
          <Route path="/" element={<HomePageDebug />} />
          <Route path="/login" element={
            <div style={{padding: '40px', textAlign: 'center'}}>
              <h1>Login Page</h1>
              <p>Login functionality will go here.</p>
              <button onClick={() => window.location.href = '/'}>← Back to Home</button>
            </div>
          } />
          <Route path="/register" element={
            <div style={{padding: '40px', textAlign: 'center'}}>
              <h1>Register Page</h1>
              <p>Registration functionality will go here.</p>
              <button onClick={() => window.location.href = '/'}>← Back to Home</button>
            </div>
          } />
          <Route path="/marketplace" element={
            <div style={{padding: '40px', textAlign: 'center'}}>
              <h1>Marketplace Page</h1>
              <p>Marketplace functionality will go here.</p>
              <button onClick={() => window.location.href = '/'}>← Back to Home</button>
            </div>
          } />
          <Route path="/404" element={
            <div style={{padding: '40px', textAlign: 'center'}}>
              <h1>Page Not Found</h1>
              <button onClick={() => window.location.href = '/'}>← Back to Home</button>
            </div>
          } />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
