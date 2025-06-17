import React from 'react';

const HomePageDebug: React.FC = () => {
  return (
    <div style={{
      padding: '40px',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{
        color: '#333',
        fontSize: '32px',
        marginBottom: '20px'
      }}>
        🏠 GemNet Debug HomePage
      </h1>
      
      <p style={{
        fontSize: '18px',
        color: '#666',
        marginBottom: '30px'
      }}>
        This is a minimal HomePage to test if the basic component works.
      </p>
      
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        marginBottom: '20px'
      }}>
        <h2 style={{color: '#333', marginBottom: '15px'}}>✅ Basic HomePage Working!</h2>
        <p style={{color: '#666'}}>If you can see this, the HomePage component is loading correctly.</p>
      </div>
      
      <div style={{
        display: 'flex',
        gap: '15px',
        flexWrap: 'wrap'
      }}>
        <button 
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
          onClick={() => window.location.href = '/marketplace'}
        >
          🛍️ Explore Marketplace
        </button>
        
        <button 
          style={{
            backgroundColor: '#10b981',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
          onClick={() => window.location.href = '/login'}
        >
          🔑 Login
        </button>
        
        <button 
          style={{
            backgroundColor: '#f59e0b',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
          onClick={() => window.location.href = '/register'}
        >
          📝 Register
        </button>
      </div>
    </div>
  );
};

export default HomePageDebug;
