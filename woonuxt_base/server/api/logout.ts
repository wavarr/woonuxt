export default defineEventHandler(async (event) => {
  // Clear any authentication cookies or tokens
  deleteCookie(event, 'auth-token');
  
  return {
    success: true,
    message: 'Logged out successfully'
  };
}); 
