// composables/useAuth.ts
import { ref, computed } from 'vue';
import { useAsyncQuery } from './useAsyncQuery';

// State management for authentication
const viewer = ref(null);
const customer = ref(null);
const isPending = ref(false);
const avatar = ref(null);
const loginClients = ref([]);

export function useAuth() {
  // Computed properties
  const isLoggedIn = computed(() => !!viewer.value);
  const wishlistLink = computed(() => isLoggedIn.value ? '/my-account?tab=wishlist' : '/my-account');
  
  // Login function with improved cookie handling
  const loginUser = async (credentials) => {
    isPending.value = true;
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        credentials: 'include', // Critical for cross-domain cookie handling
      });
      
      const data = await response.json();
      
      if (data.error) {
        return { success: false, error: data.error };
      }
      
      // Store WordPress session token if provided
      if (data.sessionToken) {
        localStorage.setItem('woo_session', data.sessionToken);
        
        // Set as cookie too for better compatibility
        document.cookie = `wordpress_logged_in=${data.sessionToken}; path=/; secure; SameSite=Lax`;
      }
      
      // Update state
      viewer.value = data.user;
      customer.value = data.customer;
      
      // Fetch additional customer data
      await refreshCustomerData();
      
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: error.message || "Login failed" };
    } finally {
      isPending.value = false;
    }
  };

  // Function to refresh customer data
  const refreshCustomerData = async () => {
    try {
      const { data: customerData, error } = await useAsyncQuery('getCustomer');
      
      if (error || !customerData.value?.customer) {
        return false;
      }
      
      customer.value = customerData.value.customer;
      return true;
    } catch (error) {
      console.error("Error refreshing customer data:", error);
      return false;
    }
  };

  // Check authentication status on page load
  const checkAuthStatus = async () => {
    const token = localStorage.getItem('woo_session');
    
    if (!token) return false;
    
    try {
      const { data, error } = await useAsyncQuery('getViewer');
      
      if (error || !data.value?.viewer) {
        localStorage.removeItem('woo_session');
        return false;
      }
      
      viewer.value = data.value.viewer;
      
      // If we have a viewer, get customer data
      await refreshCustomerData();
      
      // Get avatar if available
      if (viewer.value?.id) {
        const { data: avatarData } = await useAsyncQuery('getAvatar', { id: viewer.value.id });
        avatar.value = avatarData.value?.user?.avatar?.url;
      }
      
      return true;
    } catch (error) {
      console.error("Auth check error:", error);
      localStorage.removeItem('woo_session');
      return false;
    }
  };

  // For other auth functions, just returning the basic structure
  const registerUser = async (credentials) => {
    isPending.value = true;
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include',
      });
      
      const data = await response.json();
      
      if (data.error) {
        return { success: false, error: data.error };
      }
      
      return { success: true };
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, error: error.message || "Registration failed" };
    } finally {
      isPending.value = false;
    }
  };

  const logoutUser = async () => {
    isPending.value = true;
    try {
      await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
      
      // Clear localStorage and state
      localStorage.removeItem('woo_session');
      document.cookie = "wordpress_logged_in=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      viewer.value = null;
      customer.value = null;
      avatar.value = null;
      
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      return { success: false, error: error.message };
    } finally {
      isPending.value = false;
    }
  };

  // Initialize auth on application start
  const initAuth = async () => {
    await checkAuthStatus();
    // Load OAuth providers if needed
    try {
      const { data: providers } = await useAsyncQuery('getLoginProviders');
      loginClients.value = providers.value?.loginClients?.nodes || [];
    } catch (error) {
      console.error("Failed to load login providers:", error);
    }
  };

  // Simple stubbed methods for remaining functionality
  const sendResetPasswordEmail = async (data) => { /* Implementation */ };
  const resetPasswordWithKey = async (data) => { /* Implementation */ };
  const loginWithProvider = async (state, code, provider) => { /* Implementation */ };

  return {
    viewer,
    customer,
    avatar,
    isPending,
    loginClients,
    isLoggedIn,
    wishlistLink,
    loginUser,
    registerUser,
    logoutUser,
    sendResetPasswordEmail,
    resetPasswordWithKey,
    loginWithProvider,
    checkAuthStatus,
    refreshCustomerData,
    initAuth
  };
}
