# MongoDB Backend Setup Guide

## Current Status
The frontend is now configured to:
1. **Try real API first** - Attempts to connect to your backend at `http://localhost:9091`
2. **Fallback to mock** - If backend is not available, uses mock data (with clear indicators)
3. **Show connection status** - Users can see if data is being saved to database

## To Connect to Your MongoDB Backend

### 1. Environment Configuration
Update `.env` file with your backend URL:
```env
VITE_API_URL=http://localhost:9091
```

### 2. Backend API Endpoints Required
Your backend needs these endpoints:

#### Registration
```
POST /api/auth/register
Content-Type: application/json
Body: {
  "firstName": "string",
  "lastName": "string", 
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string",
  "dateOfBirth": "string",
  "nicNumber": "string"
}
Response: {
  "success": boolean,
  "message": "string",
  "data": "userId"
}
```

#### Face Verification
```
POST /api/auth/verify-face/{userId}
Content-Type: multipart/form-data
Body: faceImage (File)
Response: {
  "success": boolean,
  "message": "string",
  "data": "verification_result"
}
```

#### NIC Verification
```
POST /api/auth/verify-nic/{userId}
Content-Type: multipart/form-data
Body: nicImage (File)
Response: {
  "success": boolean,
  "message": "string", 
  "data": {
    "verificationComplete": boolean,
    "verificationStatus": "VERIFIED",
    "isVerified": boolean,
    "isNicVerified": boolean
  }
}
```

#### Health Check
```
GET /api/auth/health
Response: {
  "success": boolean,
  "message": "Backend is running"
}
```

### 3. MongoDB Schema Example
```javascript
// User Schema
const userSchema = {
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String,
  password: String, // hashed
  phoneNumber: String,
  address: String,
  dateOfBirth: Date,
  nicNumber: String,
  isVerified: Boolean,
  verificationStatus: String, // 'PENDING', 'VERIFIED', 'FAILED'
  faceVerificationCompleted: Boolean,
  nicVerificationCompleted: Boolean,
  faceImagePath: String,
  nicImagePath: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 4. Start Your Backend
Make sure your backend server is running on `http://localhost:9091`

### 5. Test Connection
The frontend will automatically:
- Show green indicator if backend is connected
- Show yellow indicator if using mock mode
- Display appropriate messages to users

## Current Frontend Features
✅ **Hybrid Mode**: Tries real API, falls back to mock
✅ **Visual Indicators**: Users know if data is being saved
✅ **Error Handling**: Graceful fallback when backend unavailable
✅ **Development Ready**: Works with or without backend
✅ **Production Ready**: Will use real API when available

## Next Steps
1. Start your MongoDB backend server
2. Ensure it has the required endpoints
3. Test registration flow - you should see green "Connected to backend" indicator
4. Check MongoDB database for saved user data

## Troubleshooting
- **Yellow indicator**: Backend not running or endpoints not available
- **Green indicator**: Backend connected, data being saved to MongoDB
- **Check browser console**: Detailed logs show which mode is being used
