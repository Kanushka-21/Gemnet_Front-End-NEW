import { authAPI } from './api';

export class BackendConnectionService {
  private static isBackendAvailable: boolean | null = null;
  private static lastCheckTime: number = 0;
  private static readonly CHECK_INTERVAL = 30000; // 30 seconds

  static async checkBackendConnection(): Promise<boolean> {
    const now = Date.now();
    
    // Only check every 30 seconds to avoid too many requests
    if (this.isBackendAvailable !== null && (now - this.lastCheckTime) < this.CHECK_INTERVAL) {
      return this.isBackendAvailable;
    }

    try {
      console.log('🔍 Checking backend connection...');
      const isAvailable = await authAPI.testConnection();
      this.isBackendAvailable = isAvailable;
      this.lastCheckTime = now;
      
      if (isAvailable) {
        console.log('✅ Backend API is available - Data will be saved to MongoDB');
      } else {
        console.log('⚠️ Backend API not available - Using mock mode (data not persisted)');
      }
      
      return isAvailable;
    } catch (error) {
      console.warn('Backend connection check failed:', error);
      this.isBackendAvailable = false;
      this.lastCheckTime = now;
      return false;
    }
  }

  static getConnectionStatus(): boolean | null {
    return this.isBackendAvailable;
  }

  static getConnectionStatusMessage(): string {
    if (this.isBackendAvailable === true) {
      return 'Connected to backend - Data is being saved to MongoDB database';
    } else if (this.isBackendAvailable === false) {
      return 'Backend not available - Running in mock mode (data not persisted)';
    } else {
      return 'Checking backend connection...';
    }
  }
}

export default BackendConnectionService;
