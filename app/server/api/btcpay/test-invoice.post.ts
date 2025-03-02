export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { amount = 0.01, currency = 'EUR' } = body;
    
    // Log the request
    console.log('BTCPay test invoice request:', { amount, currency });
    
    // In a real implementation, you would call the BTCPay API here
    // This is a mock response for testing
    return {
      id: `TEST-${Date.now()}`,
      status: 'new',
      amount,
      currency,
      checkoutUrl: `https://example.com/btcpay/checkout?id=TEST-${Date.now()}`,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error creating test BTCPay invoice:', error);
    
    // Return error with appropriate status
    event.node.res.statusCode = 500;
    return {
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    };
  }
}); 
