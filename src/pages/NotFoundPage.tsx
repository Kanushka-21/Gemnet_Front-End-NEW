import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Gem } from 'lucide-react';

// Components
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <Breadcrumbs 
        items={[
          { label: 'Home', path: '/' },
          { label: 'Page Not Found' }
        ]}
      />
      
      <div className="flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg w-full text-center"
        >
          <div className="bg-white rounded-xl shadow-lg p-8 border border-secondary-200">
            <motion.h1
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-6xl md:text-8xl font-bold text-primary-600 mb-6"
            >
              404
            </motion.h1>
            
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-2xl font-bold text-secondary-900 mb-4"
            >
              Page Not Found
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-secondary-600 mb-6"
            >
              The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.
            </motion.p>
            
            <div className="bg-secondary-50 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">You can:</h3>
              <ul className="text-secondary-600 text-left list-disc list-inside space-y-1">
                <li>Double check the URL for typos</li>
                <li>Go back to the previous page</li>
                <li>Visit our homepage or marketplace</li>
                <li>Contact support if you believe this is an error</li>
              </ul>
            </div>
            
            <div className="space-y-3 sm:space-y-0 sm:space-x-3 sm:flex sm:justify-center">
              <Button
                onClick={() => navigate('/')}
                variant="primary"
                className="w-full sm:w-auto flex items-center justify-center"
              >
                <Home className="w-4 h-4 mr-2" />
                Go to Homepage
              </Button>
              
              <Button
                onClick={() => navigate('/marketplace')}
                variant="secondary"
                className="w-full sm:w-auto flex items-center justify-center"
              >
                <Gem className="w-4 h-4 mr-2" />
                Visit Marketplace
              </Button>
              
              <Button
                onClick={() => navigate(-1)}
                variant="outline"
                className="w-full sm:w-auto flex items-center justify-center"
              >
                Go Back
              </Button>
            </div>          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
