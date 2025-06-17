import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// Define mockUser directly in this file to avoid import issues
const mockUser = {
  userId: "user-123",
  email: "user@example.com",
  firstName: "John",
  lastName: "Doe",
  isVerified: true,
  verificationStatus: "SUCCESS",
  role: "buyer" // Can be 'buyer', 'seller', or 'admin'
};

// Simple mock authentication hook for development
export const useAuthMock = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already stored in localStorage
    const storedAuth = localStorage.getItem('mockAuth');
    if (storedAuth) {
      setIsAuthenticated(true);
      setUser(mockUser);
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
      setUser(mockUser);
      
      // Store auth state in localStorage
      localStorage.setItem('mockAuth', 'true');
      localStorage.setItem('mockUser', JSON.stringify(mockUser));
      
      toast.success('Login successful!');
      navigate('/dashboard');
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
    navigate('/login');
    toast.success('Logged out successfully');
  };

  return {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
  };
};
