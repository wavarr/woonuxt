import { ref, reactive } from 'vue';

export function useBTCPayDebug() {
  const invoices = reactive([]);
  const status = ref('not-initialized');
  const lastError = ref(null);
  
  // Check if BTCPay is available
  const checkBTCPayAvailability = async () => {
    try {
      status.value = 'checking';
      
      // Check if the BTCPay server is reachable
      const btcpayHost = process.env.BTCPAY_HOST || '';
      if (!btcpayHost) {
        throw new Error('BTCPAY_HOST environment variable is not set');
      }
      
      const response = await fetch(`${btcpayHost}/api/v1/health`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        mode: 'cors'
      });
      
      if (!response.ok) {
        throw new Error(`BTCPay server returned status ${response.status}`);
      }
      
      const data = await response.json();
      status.value = 'available';
      
      return {
        available: true,
        status: data
      };
    } catch (error) {
      console.error('BTCPay availability check failed:', error);
      status.value = 'error';
      lastError.value = error;
      
      return {
        available: false,
        error: error.message
      };
    }
  };
  
  // Test invoice creation
  const testInvoiceCreation = async (amount = 0.01, currency = 'EUR') => {
    try {
      console.log(`Testing BTCPay invoice creation: ${amount} ${currency}`);
      
      // This is a mock implementation - in a real app, you'd call your backend
      const response = await fetch('/api/btcpay/test-invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency
        })
      });
      
      if (!response.ok) {
        throw new Error(`Failed to create test invoice: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Add to invoices list
      invoices.unshift({
        id: data.id,
        amount,
        currency,
        status: data.status,
        createdAt: new Date().toISOString(),
        checkoutUrl: data.checkoutUrl
      });
      
      console.log('Test invoice created:', data);
      
      return {
        success: true,
        invoice: data
      };
    } catch (error) {
      console.error('Test invoice creation failed:', error);
      lastError.value = error;
      
      return {
        success: false,
        error: error.message
      };
    }
  };
  
  // Check BTCPay configuration
  const checkConfiguration = () => {
    const config = {
      host: process.env.BTCPAY_HOST || 'Not set',
      storeId: process.env.BTCPAY_STORE_ID || 'Not set',
      apiKey: process.env.BTCPAY_API_KEY ? 'Set (hidden)' : 'Not set',
      webhookSecret: process.env.BTCPAY_WEBHOOK_SECRET ? 'Set (hidden)' : 'Not set'
    };
    
    console.log('BTCPay configuration:', config);
    
    return config;
  };
  
  return {
    status,
    invoices,
    lastError,
    checkBTCPayAvailability,
    testInvoiceCreation,
    checkConfiguration
  };
} 
