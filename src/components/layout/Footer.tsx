import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Heart, Github, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-secondary-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient">GemNet</h1>
                <p className="text-xs text-secondary-500">Identity Verification</p>
              </div>
            </div>
            <p className="text-secondary-600 text-sm">
              A secure platform for buying and selling certified gems with verified identities and 
              transparent transactions.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" aria-label="Facebook" className="text-secondary-400 hover:text-primary-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Twitter" className="text-secondary-400 hover:text-primary-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Instagram" className="text-secondary-400 hover:text-primary-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Github" className="text-secondary-400 hover:text-primary-600 transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-secondary-900 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-secondary-600 hover:text-primary-600 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="text-secondary-600 hover:text-primary-600 text-sm">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-secondary-600 hover:text-primary-600 text-sm">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-secondary-900 uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-secondary-600 hover:text-primary-600 text-sm">
                  Gem Verification Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-600 hover:text-primary-600 text-sm">
                  Bidding Tutorials
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-600 hover:text-primary-600 text-sm">
                  Seller Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-600 hover:text-primary-600 text-sm">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-secondary-900 uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-secondary-600 hover:text-primary-600 text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-600 hover:text-primary-600 text-sm">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-600 hover:text-primary-600 text-sm">
                  Disclaimer
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-600 hover:text-primary-600 text-sm">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-secondary-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-secondary-500">
            &copy; {new Date().getFullYear()} GemNet. All rights reserved.
          </p>
          <p className="text-sm text-secondary-500 mt-2 md:mt-0 flex items-center">
            Made with <Heart className="w-4 h-4 text-red-500 mx-1" /> in Sri Lanka
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
