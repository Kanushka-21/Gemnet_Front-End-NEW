import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import MarketplacePage from '@/pages/MarketplacePage';
import GemDetailsPage from '@/pages/GemDetailsPage';
import BuyerDashboard from '@/pages/BuyerDashboard';
import SellerDashboard from '@/pages/SellerDashboard';
import AdminDashboard from '@/pages/AdminDashboard';
import NotFoundPage from '@/pages/NotFoundPage';

// Protected Route Component
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'buyer' | 'seller' | 'admin';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { isAuthenticated, user, loading } = useAuth();
  
  if (loading) {
    // Show loading state while checking authentication
    return <div className="flex h-screen w-full items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
    </div>;
  }
  
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && user?.role !== requiredRole) {
    // Redirect to home if user doesn't have required role
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

// Role-based redirect component
const RedirectBasedOnRole: React.FC = () => {
  const { user } = useAuth();
  
  if (user?.role === 'buyer') return <Navigate to="/buyer/dashboard" replace />;
  if (user?.role === 'seller') return <Navigate to="/seller/dashboard" replace />;
  if (user?.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
  return <Navigate to="/" replace />;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      
      {/* Registration Routes */}
      <Route path="/register/*" element={<RegisterPage />} />
      
      {/* Marketplace */}
      <Route path="/marketplace" element={<MarketplacePage />} />
      <Route path="/gem/:id" element={<GemDetailsPage />} />
      
      {/* Protected Routes */}
      <Route path="/buyer/dashboard" element={
        <ProtectedRoute requiredRole="buyer">
          <BuyerDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/seller/dashboard" element={
        <ProtectedRoute requiredRole="seller">
          <SellerDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/admin/dashboard" element={
        <ProtectedRoute requiredRole="admin">
          <AdminDashboard />
        </ProtectedRoute>
      } />
      
      {/* Generic Dashboard Route - redirects based on role */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <RedirectBasedOnRole />
        </ProtectedRoute>
      } />
      
      {/* 404 Not Found */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
