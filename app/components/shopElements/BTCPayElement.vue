<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useCart } from '~/composables/useCart';

// Debug flag - set to true to enable verbose logging
const DEBUG = true;

// Add a debug logger
const log = (...args) => {
  if (DEBUG) console.log('🪙 BTCPayElement:', ...args);
};

log('Component initializing');

const { cart } = useCart();
const { btcpay } = defineProps(['btcpay']);

// Add state tracking for debugging
const componentState = ref('initializing');
const invoiceState = ref(null);
const errorState = ref(null);

const rawCartTotal = computed(() => {
  const total = cart.value && parseFloat(cart.value.rawTotal as string);
  log('Cart total calculated:', total);
  return total;
});

const emit = defineEmits(['updateElement']);

// Watch for cart changes to help debug
watch(() => cart.value, (newCart) => {
  log('Cart updated:', newCart);
}, { deep: true });

const createBTCPayInvoice = async () => {
  componentState.value = 'creating-invoice';
  log('Creating BTCPay invoice with price:', rawCartTotal.value);
  
  try {
    if (!btcpay) {
      throw new Error('BTCPay client not available');
    }
    
    if (!rawCartTotal.value) {
      throw new Error('Cart total is not available');
    }
    
    log('BTCPay client:', btcpay);
    
    const invoice = await btcpay.createInvoice({
      price: rawCartTotal.value,
      currency: 'EUR'
    });
    
    log('Invoice created successfully:', invoice);
    invoiceState.value = invoice;
    componentState.value = 'invoice-created';
    
    emit('updateElement', invoice);
  } catch (err) {
    errorState.value = err;
    componentState.value = 'error';
    console.error('❌ Error creating BTCPay invoice:', err);
    
    // More detailed error logging
    if (err.response) {
      console.error('Response error data:', err.response.data);
      console.error('Response status:', err.response.status);
    } else if (err.request) {
      console.error('Request made but no response received');
    } else {
      console.error('Error message:', err.message);
    }
    console.trace('BTCPay error stack:');
  }
};

onMounted(() => {
  log('Component mounted');
  createBTCPayInvoice();
});
</script>

<template>
  <div id="btcpay-element">
    <!-- Debug info (only visible in development) -->
    <div v-if="DEBUG && process.env.NODE_ENV === 'development'" class="debug-info p-2 bg-gray-100 text-xs">
      <p>State: {{ componentState }}</p>
      <p>Cart Total: {{ rawCartTotal }}</p>
      <p v-if="errorState">Error: {{ errorState.message }}</p>
    </div>
    
    <!-- BTCPay invoice will be displayed here -->
    <div v-if="componentState === 'error'" class="p-4 bg-red-50 text-red-700 rounded">
      Failed to create payment invoice. Please try again or contact support.
    </div>
  </div>
</template> 
