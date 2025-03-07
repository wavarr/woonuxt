import { ref, computed } from 'vue';
import type { Customer, Viewer } from '~/types';

// State
const isLoggedIn = ref(false);
const loginError = ref('');
const customer = ref<Customer | null>(null);
const viewer = ref<Viewer | null>(null);
const isOfflineMode = ref(false);

// Check if we're in development mode
const isDev = process.env.NODE_ENV === 'development';

// Get customer data
const getCustomer = async () => {
  try {
    // In a real implementation, this would fetch from the WooCommerce API
    return customer.value;
  } catch (error) {
    console.error('Error fetching customer:', error);
    return null;
  }
};

// Get viewer data
const getViewer = async () => {
  try {
    // In a real implementation, this would fetch from the WooCommerce API
    return viewer.value;
  } catch (error) {
    console.error('Error fetching viewer:', error);
    return null;
  }
};

export function useAuth() {
  // Login
  const login = async (email: string, password: string) => {
    try {
      loginError.value = '';
      
      // First try to authenticate with the API
      try {
        // In a real implementation, this would authenticate with the WooCommerce API
        // For now, we'll just set a dummy customer and viewer
        customer.value = {
          id: '1',
          email,
          firstName: 'Guest',
          lastName: 'User'
        };
        viewer.value = {
          id: '1',
          email,
          firstName: 'Guest',
          lastName: 'User',
          username: email
        };
        isLoggedIn.value = true;
        return { success: true, error: null };
      } catch (error) {
        console.error('Error logging in with API:', error);
        
        // If we're in development mode, allow fallback login
        if (isDev) {
          console.log('Using fallback login in development mode');
          isOfflineMode.value = true;
          customer.value = {
            id: '1',
            email,
            firstName: 'Development',
            lastName: 'User'
          };
          viewer.value = {
            id: '1',
            email,
            firstName: 'Development',
            lastName: 'User',
            username: email
          };
          isLoggedIn.value = true;
          return { success: true, error: null };
        }
        
        // Otherwise return the error
        loginError.value = 'Unable to connect to authentication service. Please try again later.';
        return { success: false, error: loginError.value };
      }
    } catch (error) {
      console.error('Error in login function:', error);
      loginError.value = 'An unexpected error occurred. Please try again.';
      return { success: false, error: loginError.value };
    }
  };

  // Logout
  const logout = async () => {
    try {
      // In a real implementation, this would log out from the WooCommerce API
      isLoggedIn.value = false;
      customer.value = null;
      viewer.value = null;
      isOfflineMode.value = false;
      return true;
    } catch (error) {
      console.error('Error logging out:', error);
      return false;
    }
  };

  // Register
  const register = async (userData: any) => {
    try {
      // In a real implementation, this would register with the WooCommerce API
      // For now, we'll just return success
      return { success: true, error: null };
    } catch (error) {
      console.error('Error registering:', error);
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  };

  return {
    isLoggedIn: computed(() => isLoggedIn.value),
    loginError: computed(() => loginError.value),
    customer: computed(() => customer.value),
    viewer: computed(() => viewer.value),
    isOfflineMode: computed(() => isOfflineMode.value),
    login,
    logout,
    register,
    
    // Compatibility with WooNuxt API
    loginUser: async (userInfo: any) => {
      return await login(userInfo.username, userInfo.password);
    },
    registerUser: async (userInfo: any) => {
      return await register(userInfo);
    },
    sendResetPasswordEmail: async () => {
      return { success: true, error: null };
    },
    resetPasswordWithKey: async () => {
      return { success: true, error: null };
    },
    loginClients: ref([]),
    loginWithProvider: async () => {
      return { success: true, error: null };
    },
    getCustomer,
    getViewer
  };
} 
