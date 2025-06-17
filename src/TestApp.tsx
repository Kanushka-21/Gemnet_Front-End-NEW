import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

// Mock user data
const mockUserData = {
  userId: "user-123",
  email: "user@example.com",
  firstName: "John",
  lastName: "Doe",
  isVerified: true,
  verificationStatus: "SUCCESS",
  role: "buyer"
};

// Create Auth Context with simplified implementation
interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  loading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Component
const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is already stored in localStorage
    const storedAuth = localStorage.getItem('mockAuth');
    if (storedAuth) {
      setIsAuthenticated(true);
      setUser(mockUserData);
    }
    
    setLoading(false);
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simple mock validation
    if (credentials.email && credentials.password.length > 3) {
      setIsAuthenticated(true);
      setUser(mockUserData);
      
      // Store auth state in localStorage
      localStorage.setItem('mockAuth', 'true');
      localStorage.setItem('mockUser', JSON.stringify(mockUserData));
      
      toast.success('Login successful!');
      setLoading(false);
      return true;
    } else {
      toast.error('Invalid credentials');
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('mockAuth');
    localStorage.removeItem('mockUser');
    setIsAuthenticated(false);
    setUser(null);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Protected route component
const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return isAuthenticated ? <>{element}</> : <Navigate to="/login" />;
};

// Login Component
const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login({ email, password });
    if (success) {
      navigate('/dashboard');
    }
  };
  
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '400px', margin: '0 auto' }}>
      <h1 style={{ color: '#333' }}>Login</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input 
            id="email" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            required
          />
        </div>
        <div>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
          <input 
            id="password" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            required
          />
        </div>
        <button 
          type="submit" 
          style={{ 
            padding: '10px', 
            backgroundColor: '#3b82f6', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer' 
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

// Home Component
const Home = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#333' }}>Home Page</h1>
      <p>Welcome to the GemNet test homepage.</p>
      <nav>
        <ul style={{ display: 'flex', gap: '20px', listStyle: 'none', padding: 0 }}>
          <li>
            <Link to="/" style={{ color: '#3b82f6', textDecoration: 'none' }}>Home</Link>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/dashboard" style={{ color: '#3b82f6', textDecoration: 'none' }}>Dashboard</Link>
              </li>
              <li>
                <Link to="/profile" style={{ color: '#3b82f6', textDecoration: 'none' }}>Profile</Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" style={{ color: '#3b82f6', textDecoration: 'none' }}>Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

// Dashboard Component (Protected)
const Dashboard = () => {
  const { user, logout } = useAuth();
  
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#333' }}>Dashboard</h1>
      <p>Welcome, {user?.firstName}!</p>
      <p>This is a protected dashboard page.</p>
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <Link to="/" style={{ color: '#3b82f6', textDecoration: 'none' }}>Home</Link>
        <button 
          onClick={logout} 
          style={{ 
            backgroundColor: '#ef4444', 
            color: 'white', 
            border: 'none', 
            padding: '5px 10px', 
            borderRadius: '4px',
            cursor: 'pointer' 
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

// Profile Component (Protected)
const Profile = () => {
  const { user } = useAuth();
  
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#333' }}>User Profile</h1>
      <div style={{ marginTop: '15px' }}>
        <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.role}</p>
        <p><strong>Verification Status:</strong> {user?.isVerified ? 'Verified' : 'Not Verified'}</p>
      </div>
      <Link to="/dashboard" style={{ color: '#3b82f6', textDecoration: 'none' }}>Back to Dashboard</Link>
    </div>
  );
};

// Simple test component with auth context
const SimpleApp = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default SimpleApp;
