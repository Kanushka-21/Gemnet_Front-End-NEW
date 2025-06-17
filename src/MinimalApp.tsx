import React from 'react';

const MinimalApp: React.FC = () => {
  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: '#f0f4f8',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      marginTop: '40px'
    }}>
      <h1 style={{ color: '#1e40af' }}>GemNet Test App</h1>
      <p>This is a minimal test application to verify rendering is working.</p>
      <div style={{
        backgroundColor: '#dbeafe',
        padding: '15px',
        borderRadius: '4px',
        marginTop: '20px'
      }}>
        <p>If you can see this message, the React application is rendering correctly!</p>
      </div>
    </div>
  );
};

export default MinimalApp;
