import BackendConnectionService from '../services/backendConnection';

// Simple test to check backend connection
export const testBackendConnection = async () => {
  console.log('🔍 Testing backend connection...');
  
  try {
    const isConnected = await BackendConnectionService.checkBackendConnection();
    
    if (isConnected) {
      console.log('✅ SUCCESS: Backend is connected!');
      console.log('📊 Data will be saved to MongoDB database');
      return true;
    } else {
      console.log('⚠️ WARNING: Backend not available');
      console.log('🔄 Running in mock mode - data not persisted');
      console.log('💡 To connect to MongoDB:');
      console.log('   1. Start your backend server on http://localhost:9091');
      console.log('   2. Ensure MongoDB is running');
      console.log('   3. Check MONGODB_SETUP.md for detailed instructions');
      return false;
    }
  } catch (error) {
    console.error('❌ ERROR: Failed to test backend connection', error);
    return false;
  }
};

export default testBackendConnection;
