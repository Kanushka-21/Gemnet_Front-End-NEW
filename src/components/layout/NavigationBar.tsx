import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import {
  Shield,
  User,
  LogOut,
  ChevronDown,
  Home,
  ShoppingBag,
  LayoutDashboard,
  Menu,
  X,
  Settings
} from 'lucide-react';
import Button from '@/components/ui/Button';

const NavigationBar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="w-4 h-4" /> },
    { name: 'Marketplace', path: '/marketplace', icon: <ShoppingBag className="w-4 h-4" /> },
    ...(isAuthenticated ? [{ name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> }] : [])
  ];

  return (
    <nav className="bg-white border-b border-secondary-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenus}>
            <div className="bg-gradient-primary p-2 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient">GemNet</h1>
              <p className="text-xs text-secondary-500">Identity Verification</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-primary-600 border-b-2 border-primary-500'
                    : 'text-secondary-600 hover:text-primary-600 hover:border-b-2 hover:border-primary-400'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </div>

          {/* User Menu (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 bg-secondary-50 hover:bg-secondary-100 px-3 py-2 rounded-full transition-colors duration-200"
                >
                  <div className="bg-primary-100 p-2 rounded-full">
                    <User className="w-4 h-4 text-primary-600" />
                  </div>
                  <span className="text-sm font-medium text-secondary-900">
                    {user?.firstName}
                  </span>
                  <ChevronDown className="w-4 h-4 text-secondary-500" />
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-secondary-200"
                    >
                      <div className="px-4 py-2 border-b border-secondary-200">
                        <p className="text-sm font-medium text-secondary-900">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-xs text-secondary-500 truncate">{user?.email}</p>
                      </div>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50 flex items-center space-x-2"
                        onClick={closeMenus}
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50 flex items-center space-x-2"
                        onClick={closeMenus}
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          closeMenus();
                        }}
                        className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-secondary-50 flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-secondary-500 hover:text-secondary-900 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-secondary-200">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium ${
                    isActive(link.path)
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-secondary-700 hover:bg-secondary-50 hover:text-primary-600'
                  }`}
                  onClick={closeMenus}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}
              
              {isAuthenticated ? (
                <>
                  <hr className="border-secondary-200 my-2" />
                  <div className="px-3 py-2">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="bg-primary-100 p-2 rounded-full">
                        <User className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-secondary-900">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-xs text-secondary-500 truncate">{user?.email}</p>
                      </div>
                    </div>
                    
                    <Link
                      to="/settings"
                      className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-secondary-700 hover:bg-secondary-50"
                      onClick={closeMenus}
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </Link>
                    
                    <button
                      onClick={() => {
                        logout();
                        closeMenus();
                      }}
                      className="w-full text-left flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-secondary-50"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col space-y-2 px-3 py-2">
                  <Link to="/login" onClick={closeMenus}>
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register" onClick={closeMenus}>
                    <Button variant="primary" className="w-full">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavigationBar;
