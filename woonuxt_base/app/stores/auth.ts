// Simple auth store implementation
export const useAuth = () => {
  // Return a simple object with the properties needed by the checkout page
  return {
    customer: null,
    viewer: null,
    isLoggedIn: false,
    getCustomer: async () => null,
    getViewer: async () => null,
    login: async () => true,
    logout: () => {}
  };
}; 
