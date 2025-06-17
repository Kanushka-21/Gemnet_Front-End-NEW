import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Database, Server, AlertCircle } from 'lucide-react';
import BackendConnectionService from '@/services/backendConnection';

interface BackendStatusProps {
  className?: string;
  showDetails?: boolean;
}

const BackendStatus: React.FC<BackendStatusProps> = ({ 
  className = '', 
  showDetails = false 
}) => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      const connected = await BackendConnectionService.checkBackendConnection();
      setIsConnected(connected);
      setLastChecked(new Date());
    };

    // Check immediately
    checkConnection();

    // Check every 30 seconds
    const interval = setInterval(checkConnection, 30000);

    return () => clearInterval(interval);
  }, []);

  const getStatusInfo = () => {
    if (isConnected === true) {
      return {
        icon: <Wifi className="w-4 h-4" />,
        color: 'bg-green-50 border-green-200 text-green-800',
        iconColor: 'text-green-600',
        title: 'Backend Connected',
        message: 'Data is being saved to MongoDB database',
        details: 'All registration data, face verification, and NIC verification will be permanently stored.'
      };
    } else if (isConnected === false) {
      return {
        icon: <WifiOff className="w-4 h-4" />,
        color: 'bg-yellow-50 border-yellow-200 text-yellow-800',
        iconColor: 'text-yellow-600',
        title: 'Mock Mode Active',
        message: 'Backend API not available - data not persisted',
        details: 'Registration works but data is not saved. Start your backend server to enable database storage.'
      };
    } else {
      return {
        icon: <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />,
        color: 'bg-blue-50 border-blue-200 text-blue-800',
        iconColor: 'text-blue-600',
        title: 'Checking Connection',
        message: 'Testing backend connectivity...',
        details: 'Please wait while we check if the backend server is available.'
      };
    }
  };

  const status = getStatusInfo();

  return (
    <div className={`${status.color} rounded-lg border p-4 ${className}`}>
      <div className="flex items-start space-x-3">
        <div className={status.iconColor}>
          {status.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h4 className="text-sm font-semibold">{status.title}</h4>
            {isConnected === true && <Database className="w-4 h-4 text-green-600" />}
            {isConnected === false && <Server className="w-4 h-4 text-yellow-600" />}
          </div>
          <p className="text-sm">{status.message}</p>
          
          {showDetails && (
            <div className="mt-2 space-y-2">
              <p className="text-xs opacity-75">{status.details}</p>
              {lastChecked && (
                <p className="text-xs opacity-60">
                  Last checked: {lastChecked.toLocaleTimeString()}
                </p>
              )}
              {isConnected === false && (
                <div className="mt-2 p-2 bg-yellow-100 border border-yellow-300 rounded text-xs">
                  <div className="flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3" />
                    <span className="font-medium">To enable database storage:</span>
                  </div>
                  <ul className="mt-1 ml-4 space-y-1 text-yellow-700">
                    <li>• Start your backend server on http://localhost:9091</li>
                    <li>• Ensure MongoDB is running</li>
                    <li>• Check MONGODB_SETUP.md for detailed instructions</li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BackendStatus;
