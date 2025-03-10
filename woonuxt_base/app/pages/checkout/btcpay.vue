<template>
    <div class="container mx-auto p-4">
      <div class="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 class="text-2xl font-bold mb-4">{{ $t('messages.billing.paymentOptions') }}</h1>
        
        <div v-if="loading" class="text-center">
          <div class="animate-pulse">
            <div class="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
  
        <div v-else-if="error" class="text-red-600 text-center p-4 bg-red-50 rounded">
          {{ error }}
        </div>
  
        <div v-else>
          <!-- Payment Status -->
          <div class="mb-6">
            <div class="flex items-center justify-center gap-2 mb-4">
              <div class="h-3 w-3 rounded-full" 
                   :class="{
                     'bg-yellow-400 animate-pulse': paymentStatus === 'pending',
                     'bg-green-500': paymentStatus === 'completed',
                     'bg-red-500': paymentStatus === 'expired'
                   }">
              </div>
              <span class="font-medium" :class="{
                'text-yellow-700': paymentStatus === 'pending',
                'text-green-700': paymentStatus === 'completed',
                'text-red-700': paymentStatus === 'expired'
              }">
                {{ statusMessage }}
              </span>
            </div>
          </div>
  
          <!-- BTCPay Checkout Container -->
          <div class="btcpay-checkout-container">
            <div v-if="checkoutMode === 'modal'" id="btcpay-modal-checkout"></div>
            <div v-else>
              <iframe 
                :src="checkoutUrl"
                class="w-full min-h-[600px]"
                frameborder="0"
                allowfullscreen
              ></iframe>
            </div>
          </div>
  
          <!-- Help Text -->
          <div class="mt-6 text-center text-sm text-gray-600">
            <p>Having trouble? <a href="#" @click.prevent="reloadCheckout" class="text-blue-600 hover:text-blue-800">Reload payment window</a></p>
          </div>
        </div>
      </div>
  
      <!-- Add debug panel (only visible in development) -->
      <div v-if="process.env.NODE_ENV === 'development'" class="fixed bottom-0 right-0 p-4 bg-gray-800 text-white text-xs max-w-md opacity-75 hover:opacity-100 transition-opacity">
        <h3 class="font-bold">Debug Info</h3>
        <pre>Order ID: {{ orderId }}</pre>
        <pre>Order Key: {{ orderKey }}</pre>
        <pre>Status: {{ paymentStatus }}</pre>
        <pre>Invoice ID: {{ invoiceId }}</pre>
        <pre>Checkout Mode: {{ checkoutMode }}</pre>
        <button @click="debugRefresh" class="bg-blue-500 px-2 py-1 rounded text-xs mt-2">Force Refresh</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useCart } from '~/composables/useCart';
  
  // Enable debug logging
  const DEBUG = true;
  const log = (...args) => {
    if (DEBUG) console.log('🧾 BTCPay Checkout:', ...args);
  };
  
  log('Page initializing');
  
  const route = useRoute();
  const router = useRouter();
  
  const { emptyCart, refreshCart } = useCart();
  
  const orderId = computed(() => {
    const id = route.query.order_id;
    log('Order ID from query:', id);
    return id;
  });
  
  const orderKey = computed(() => {
    const key = route.query.key;
    log('Order Key from query:', key);
    return key;
  });
  
  const loading = ref(true);
  const error = ref(null);
  const checkoutUrl = ref(null);
  const checkoutMode = ref(null);
  const paymentStatus = ref('pending');
  const invoiceId = ref(null);
  const apiResponses = ref([]); // Store API responses for debugging
  
  let paymentStatusTimeout = null;
  let statusCheckCount = 0;
  
  // Add watchers for debugging
  watch(paymentStatus, (newStatus, oldStatus) => {
    log(`Payment status changed: ${oldStatus} -> ${newStatus}`);
  });
  
  const statusMessage = computed(() => {
    switch (paymentStatus.value) {
      case 'pending':
        return 'Waiting for payment...';
      case 'completed':
        return 'Payment completed!';
      case 'expired':
        return 'Payment expired';
      default:
        return 'Unknown status';
    }
  });
  
  const checkPaymentStatus = async () => {
    statusCheckCount++;
    log(`Checking payment status (attempt ${statusCheckCount})...`);
    
    try {
      const apiUrl = `${process.env.GQL_HOST?.replace('graphql', '') || '/wp-json/'}?wc-api=BTCPay_Check_Payment&order_id=${orderId.value}&order_key=${orderKey.value}`;
      log('API URL:', apiUrl);
      
      console.time('Payment status check');
      const response = await fetch(apiUrl);
      console.timeEnd('Payment status check');
      
      const data = await response.json();
      log('Payment status response:', data);
      
      // Store response for debugging
      apiResponses.value.push({
        timestamp: new Date().toISOString(),
        type: 'status-check',
        data
      });
      
      if (data.invoiceId) {
        invoiceId.value = data.invoiceId;
      }
  
      paymentStatus.value = data.status;
  
      if (data.status === 'completed') {
        log('Payment completed! Redirecting to order received page...');
        setTimeout(() => {
          router.push(`/checkout/order-received/${orderId.value}`);
        }, 2000);
      } else if (data.status === 'expired') {
        log('Payment expired');
        error.value = 'Payment time expired. Please try again.';
      } else {
        log(`Payment still pending, scheduling next check in 5 seconds...`);
        paymentStatusTimeout = setTimeout(checkPaymentStatus, 5000);
      }
    } catch (e) {
      console.error('❌ Error checking payment status:', e);
      // Store error for debugging
      apiResponses.value.push({
        timestamp: new Date().toISOString(),
        type: 'status-check-error',
        error: e.message
      });
      
      // Continue checking despite errors
      paymentStatusTimeout = setTimeout(checkPaymentStatus, 10000); // Longer timeout on error
    }
  };
  
  const debugRefresh = () => {
    log('Manual debug refresh triggered');
    clearTimeout(paymentStatusTimeout);
    checkPaymentStatus();
  };
  
  const reloadCheckout = async () => {
    log('Reloading checkout...');
    loading.value = true;
    error.value = null;
    try {
      await initializeCheckout();
    } finally {
      loading.value = false;
    }
  };
  
  const initializeCheckout = async () => {
    log('Initializing checkout...');
    try {
      const apiUrl = `${process.env.GQL_HOST?.replace('graphql', '') || '/wp-json/'}?wc-api=BTCPay_Checkout&order_id=${orderId.value}&key=${orderKey.value}`;
      log('API URL:', apiUrl);
      
      console.time('Checkout initialization');
      const response = await fetch(apiUrl);
      console.timeEnd('Checkout initialization');
      
      const data = await response.json();
      log('Checkout initialization response:', data);
      
      // Store response for debugging
      apiResponses.value.push({
        timestamp: new Date().toISOString(),
        type: 'checkout-init',
        data
      });
      
      if (data.error) {
        throw new Error(data.error);
      }
  
      checkoutUrl.value = data.checkoutUrl;
      checkoutMode.value = data.checkoutMode;
      invoiceId.value = data.invoiceId;
  
      log('Checkout configuration:', {
        url: checkoutUrl.value,
        mode: checkoutMode.value,
        invoiceId: invoiceId.value
      });
  
      if (checkoutMode.value === 'modal') {
        log('Setting up modal checkout...');
        const script = document.createElement('script');
        script.src = data.modalScriptUrl;
        document.head.appendChild(script);
        
        script.onload = () => {
          log('BTCPay modal script loaded');
          if (window.btcpay) {
            log('Opening BTCPay modal with invoice:', invoiceId.value);
            window.btcpay.modal(invoiceId.value);
          } else {
            console.error('❌ BTCPay modal script loaded but window.btcpay is not available');
          }
        };
        
        script.onerror = (e) => {
          console.error('❌ Error loading BTCPay modal script:', e);
          // Fallback to iframe
          checkoutMode.value = 'iframe';
        };
      }
  
      checkPaymentStatus();
    } catch (e) {
      console.error('❌ BTCPay error:', e);
      error.value = 'Failed to load payment details. Please try again.';
      
      // Store error for debugging
      apiResponses.value.push({
        timestamp: new Date().toISOString(),
        type: 'checkout-init-error',
        error: e.message
      });
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(() => {
    log('Page mounted');
    
    if (!orderId.value || !orderKey.value) {
      log('Missing order details');
      error.value = 'Invalid order details. Please contact support.';
      loading.value = false;
      return;
    }
    
    log('Starting checkout initialization');
    initializeCheckout();
    
    // Add window error handler for debugging
    window.addEventListener('error', (event) => {
      console.error('❌ Global error in BTCPay checkout:', event.error);
    });
  });
  
  onUnmounted(() => {
    log('Page unmounting, clearing timeout');
    if (paymentStatusTimeout) {
      clearTimeout(paymentStatusTimeout);
    }
    
    // Export debug data to console
    if (DEBUG && apiResponses.value.length > 0) {
      console.log('📊 BTCPay Checkout Debug Data:', {
        orderId: orderId.value,
        orderKey: orderKey.value,
        invoiceId: invoiceId.value,
        finalStatus: paymentStatus.value,
        apiResponses: apiResponses.value
      });
    }
  });
  </script>
  
  <style scoped>
  .btcpay-checkout-container {
    transition: all 300ms ease-in-out;
  }
  
  .btcpay-checkout-container:hover {
    transform: scale(1.01);
  }
  </style> 
  