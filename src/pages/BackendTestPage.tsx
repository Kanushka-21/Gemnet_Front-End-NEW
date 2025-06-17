import React from 'react';
import { motion } from 'framer-motion';
import { Database, Server, Wifi, Settings, Info } from 'lucide-react';
import BackendStatus from '@/components/ui/BackendStatus';
import Button from '@/components/ui/Button';

const BackendTestPage: React.FC = () => {
  const handleTestRegistration = () => {
    window.location.href = '/register';
  };

  const handleViewSetup = () => {
    window.open('/MONGODB_SETUP.md', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            GemNet Backend Connection Test
          </h1>
          <p className="text-lg text-gray-600">
            Check if your MongoDB backend is connected and data is being saved
          </p>
        </motion.div>

        {/* Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Database className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                Current Backend Status
              </h2>
            </div>
            <BackendStatus showDetails={true} />
          </div>
        </motion.div>

        {/* Information Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Connected State */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Wifi className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-semibold text-green-900">
                When Backend is Connected
              </h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>All registration data saved to MongoDB</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Face verification images stored securely</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>NIC verification data persisted</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>User can login after registration</span>
              </li>
            </ul>
          </motion.div>

          {/* Mock Mode */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Server className="w-6 h-6 text-yellow-600" />
              <h3 className="text-lg font-semibold text-yellow-900">
                Mock Mode (No Backend)
              </h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>Registration process works (simulation)</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>Face verification simulated</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>NIC verification simulated</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>No data saved to database</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Button
            onClick={handleTestRegistration}
            size="lg"
            className="flex items-center space-x-2"
          >
            <Settings className="w-5 h-5" />
            <span>Test Registration Process</span>
          </Button>
          
          <Button
            onClick={handleViewSetup}
            variant="outline"
            size="lg"
            className="flex items-center space-x-2"
          >
            <Info className="w-5 h-5" />
            <span>View Setup Instructions</span>
          </Button>
        </motion.div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4"
        >
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">How it works:</p>
              <p>
                The frontend automatically tries to connect to your backend API first. 
                If the backend is not available, it gracefully falls back to mock mode 
                so you can still test the user interface and registration flow.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BackendTestPage;
