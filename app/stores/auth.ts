import { ref } from 'vue';
import type { Customer, Viewer } from '~/types';

// State
const customer = ref<Customer | null>(null);
const viewer = ref<Viewer | null>(null);
const isLoggedIn = ref(false);

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

// Login
const login = async (email: string, password: string) => {
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
      lastName: 'User'
    };
    isLoggedIn.value = true;
    return true;
  } catch (error) {
    console.error('Error logging in:', error);
    return false;
  }
};

// Logout
const logout = () => {
  customer.value = null;
  viewer.value = null;
  isLoggedIn.value = false;
};

// Export the auth store
export const useAuth = () => {
  return {
    customer,
    viewer,
    isLoggedIn,
    getCustomer,
    getViewer,
    login,
    logout
  };
}; 
