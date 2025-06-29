import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI, apiUtils } from '@/services/api';
import {
  UserRegistrationRequest,
  LoginRequest,
  AuthenticationResponse,
  RegistrationProgress,
  RegistrationStep
} from '@/types';
import { toast } from 'react-hot-toast';

// Authentication Hook
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<AuthenticationResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('userData');

    if (token && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials: LoginRequest): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await authAPI.login(credentials);
      
      if (response.success && response.data) {
        const { token, ...userData } = response.data;
        
        localStorage.setItem('authToken', token);
        localStorage.setItem('userData', JSON.stringify(userData));
        
        setUser(userData);
        setIsAuthenticated(true);
        
        toast.success('Login successful!');
        return true;
      } else {
        toast.error(response.message || 'Login failed');
        return false;
      }
    } catch (error) {
      const errorMessage = apiUtils.formatErrorMessage(error);
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('registrationProgress');
    
    setUser(null);
    setIsAuthenticated(false);
    
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

// Registration Hook
export const useRegistration = () => {
  const [progress, setProgress] = useState<RegistrationProgress>({
    currentStep: RegistrationStep.PERSONAL_INFO,
    personalInfoCompleted: false,
    faceVerificationCompleted: false,
    nicVerificationCompleted: false,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProgress = localStorage.getItem('registrationProgress');
    if (storedProgress) {
      try {
        const parsedProgress = JSON.parse(storedProgress);
        setProgress(parsedProgress);
      } catch (error) {
        console.error('Error parsing registration progress:', error);
      }
    }
  }, []);

  const saveProgress = (newProgress: RegistrationProgress) => {
    setProgress(newProgress);
    localStorage.setItem('registrationProgress', JSON.stringify(newProgress));
  };  const registerUser = async (userData: UserRegistrationRequest): Promise<string | null> => {
    try {
      setLoading(true);
      
      // First, try the real API
      try {
        console.log('📝 Attempting real API call for user registration...');
        const response = await authAPI.register(userData);
        
        if (response.success && response.data) {
          const userId = response.data;
          const newProgress = {
            ...progress,
            currentStep: RegistrationStep.FACE_VERIFICATION,
            personalInfoCompleted: true,
            userId,
          };
          
          saveProgress(newProgress);
          toast.success('Registration successful! Please proceed to face verification.');
          console.log('✅ Real API user registration completed successfully, User ID:', userId);
          return userId;
        } else {
          throw new Error(response.message || 'Registration failed');
        }
      } catch (apiError: any) {
        // If API fails, check if it's a connection error
        if (apiError.code === 'ECONNREFUSED' || apiError.message?.includes('Network Error') || 
            apiError.response?.status === undefined) {
          console.warn('⚠️ Backend API not available, falling back to mock implementation');
          
          // Fallback to mock implementation
          console.log('📝 Using mock user registration...');
          await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
          
          const mockUserId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          
          const newProgress = {
            ...progress,
            currentStep: RegistrationStep.FACE_VERIFICATION,
            personalInfoCompleted: true,
            userId: mockUserId,
          };
          
          saveProgress(newProgress);
          toast.success('Registration successful! (Mock Mode - Backend API not available)');
          console.log('✅ Mock user registration completed, User ID:', mockUserId);
          return mockUserId;
        } else {
          // If it's not a connection error, throw it
          throw apiError;
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = apiUtils.formatErrorMessage(error);
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };  const verifyFace = async (userId: string, faceImage: File): Promise<boolean> => {
    try {
      setLoading(true);
      
      // First, try the real API
      try {
        console.log('🎭 Attempting real API call for face verification...');
        const response = await authAPI.verifyFace(userId, faceImage);
        
        if (response.success) {
          const newProgress = {
            ...progress,
            currentStep: RegistrationStep.NIC_VERIFICATION,
            faceVerificationCompleted: true,
          };
          
          saveProgress(newProgress);
          toast.success('Face verification successful!');
          console.log('✅ Real API face verification completed successfully');
          return true;
        } else {
          throw new Error(response.message || 'Face verification failed');
        }
      } catch (apiError: any) {
        // If API fails, check if it's a connection error
        if (apiError.code === 'ECONNREFUSED' || apiError.message?.includes('Network Error') || 
            apiError.response?.status === undefined) {
          console.warn('⚠️ Backend API not available, falling back to mock implementation');
          
          // Fallback to mock implementation
          console.log('🎭 Using mock face verification...');
          console.log('User ID:', userId);
          console.log('Face image:', faceImage.name, faceImage.size, 'bytes');
          
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          const newProgress = {
            ...progress,
            currentStep: RegistrationStep.NIC_VERIFICATION,
            faceVerificationCompleted: true,
          };
          
          saveProgress(newProgress);
          toast.success('Face verification successful! (Mock Mode - Backend API not available)');
          console.log('✅ Mock face verification completed successfully');
          return true;
        } else {
          // If it's not a connection error, throw it
          throw apiError;
        }
      }
    } catch (error) {
      console.error('Face verification error:', error);
      toast.error('Face verification failed due to technical error');
      return false;
    } finally {
      setLoading(false);
    }
  };  const verifyNIC = async (userId: string, nicImage: File): Promise<any> => {
    try {
      setLoading(true);
      
      // First, try the real API
      try {
        console.log('🆔 Attempting real API call for NIC verification...');
        const response = await authAPI.verifyNIC(userId, nicImage);
        
        if (response.success) {
          const newProgress = {
            ...progress,
            currentStep: RegistrationStep.COMPLETE,
            nicVerificationCompleted: true,
          };
          
          saveProgress(newProgress);
          
          // Clear registration progress
          localStorage.removeItem('registrationProgress');
          
          console.log('✅ Real API NIC verification completed successfully');
          return response;
        } else {
          return response;
        }
      } catch (apiError: any) {
        // If API fails, check if it's a connection error
        if (apiError.code === 'ECONNREFUSED' || apiError.message?.includes('Network Error') || 
            apiError.response?.status === undefined) {
          console.warn('⚠️ Backend API not available, falling back to mock implementation');
          
          // Fallback to mock implementation
          console.log('🆔 Using mock NIC verification...');
          console.log('User ID:', userId);
          console.log('NIC image:', nicImage.name, nicImage.size, 'bytes');
          
          // Simulate processing steps with delays
          const steps = [
            { step: 'Validating User', delay: 1200 },
            { step: 'Checking Image Quality', delay: 1800 },
            { step: 'Securing Your Data', delay: 1000 },
            { step: 'Reading NIC Number', delay: 2200 },
            { step: 'Extracting Photo', delay: 2000 },
            { step: 'Verifying Details', delay: 1400 },
            { step: 'Face Verification', delay: 1800 },
            { step: 'Completing Verification', delay: 1000 }
          ];

          // Process each step with delay
          for (const stepData of steps) {
            console.log(`Processing: ${stepData.step}`);
            await new Promise(resolve => setTimeout(resolve, stepData.delay));
          }
          
          // Mock success response
          const mockResponse = {
            success: true,
            message: 'NIC verification completed successfully (Mock Mode - Backend API not available)',
            data: {
              success: true,
              message: 'Identity verification complete',
              userId: userId,
              verificationComplete: true,
              verificationStatus: 'VERIFIED',
              isVerified: true,
              isNicVerified: true,
              successMessage: 'Your identity has been successfully verified'
            }
          };
          
          const newProgress = {
            ...progress,
            currentStep: RegistrationStep.COMPLETE,
            nicVerificationCompleted: true,
          };
          
          saveProgress(newProgress);
          localStorage.removeItem('registrationProgress');
          
          console.log('✅ Mock NIC verification completed successfully');
          return mockResponse;
        } else {
          // If it's not a connection error, throw it
          throw apiError;
        }
      }
    } catch (error) {
      console.error('NIC verification error:', error);
      const errorMessage = apiUtils.formatErrorMessage(error);
      
      return {
        success: false,
        message: errorMessage,
        data: {
          error: 'SYSTEM_ERROR',
          userMessage: 'We encountered a technical issue while processing your verification.',
          suggestions: [
            'Check your internet connection and try again',
            'Try using a different image format (JPG or PNG)',
            'Contact support if the problem persists'
          ],
          technicalError: errorMessage
        }
      };
    } finally {
      setLoading(false);
    }
  };

  const goToStep = (step: RegistrationStep) => {
    const newProgress = { ...progress, currentStep: step };
    saveProgress(newProgress);
  };

  const resetRegistration = () => {
    const resetProgress = {
      currentStep: RegistrationStep.PERSONAL_INFO,
      personalInfoCompleted: false,
      faceVerificationCompleted: false,
      nicVerificationCompleted: false,
    };
    
    saveProgress(resetProgress);
    localStorage.removeItem('registrationProgress');
  };

  return {
    progress,
    loading,
    registerUser,
    verifyFace,
    verifyNIC,
    goToStep,
    resetRegistration,
  };
};

// Camera Hook
export const useCamera = () => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    const checkCameraPermission = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        setDevices(videoDevices);
        setIsEnabled(videoDevices.length > 0);
      } catch (err) {
        setError('Camera access denied or not available');
      }
    };

    checkCameraPermission();
  }, []);

  const requestCameraPermission = async (): Promise<boolean> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      setIsEnabled(true);
      setError(null);
      return true;
    } catch (err) {
      setError('Camera access denied');
      setIsEnabled(false);
      return false;
    }
  };

  return {
    isEnabled,
    error,
    devices,
    requestCameraPermission,
  };
};

// File Upload Hook
export const useFileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
  };

  return {
    file,
    preview,
    uploading,
    handleFileSelect,
    clearFile,
    setUploading,
  };
};

// Form Validation Hook
export const useFormValidation = <T extends Record<string, any>>(
  initialValues: T,
  validationRules: Record<keyof T, (value: any) => string | null>
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouchedState] = useState<Partial<Record<keyof T, boolean>>>({});

  const setValue = (name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const setTouched = (name: keyof T) => {
    setTouchedState(prev => ({ ...prev, [name]: true }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    Object.keys(validationRules).forEach(key => {
      const fieldName = key as keyof T;
      const error = validationRules[fieldName](values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouchedState({});
  };

  return {
    values,
    errors,
    touched,
    setValue,
    setTouched,
    validate,
    reset,
  };
};
