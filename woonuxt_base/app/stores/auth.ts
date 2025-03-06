import { ref, readonly } from 'vue';
import type { Customer, Viewer } from '~/types';

// State
const customer = ref<Customer | null>(null);
const viewer = ref<Viewer | null>(null);
const isLoggedIn = ref(false);

// Get customer data
const getCustomer = async () => {
  try {
    // This would typically fetch customer data from an API
    // For now, we'll just return the current customer state
    return customer.value;
  } catch (error) {
    console.error('Error fetching customer:', error);
    return null;
  }
};

// Get viewer data
const getViewer = async () => {
  try {
    // This would typically fetch viewer data from an API
    // For now, we'll just return the current viewer state
    return viewer.value;
  } catch (error) {
    console.error('Error fetching viewer:', error);
    return null;
  }
};

// Login
const login = async (email: string, password: string) => {
  try {
    // This would typically authenticate with an API
    // For now, we'll just set a dummy customer and viewer
    customer.value = {
      id: '1',
      email,
      firstName: 'Test',
      lastName: 'User'
    };
    viewer.value = {
      id: '1',
      email,
      firstName: 'Test',
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
    customer: readonly(customer),
    viewer: readonly(viewer),
    isLoggedIn: readonly(isLoggedIn),
    getCustomer,
    getViewer,
    login,
    logout
  };
}; 
