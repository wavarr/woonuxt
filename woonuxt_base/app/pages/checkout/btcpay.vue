<template>
  <div class="container mx-auto p-4">
    <div class="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 class="text-2xl font-bold mb-4">{{ $t('messages.billing.paymentOptions') }}</h1>
      
      <div v-if="loading" class="text-center">
        <LoadingIcon size="24" />
        <div class="mt-4 text-gray-600">
          Initializing payment...
        </div>
      </div>

      <div v-else-if="error" class="text-red-600 text-center p-4 bg-red-50 rounded">
        {{ error }}
        <div class="mt-4">
          <button @click="initializeCheckout" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Try Again
          </button>
        </div>
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCart } from '~/composables/useCart';

const route = useRoute();
const router = useRouter();

const { emptyCart, refreshCart } = useCart();

const orderId = computed(() => route.query.order_id);
const orderKey = computed(() => route.query.key);

const loading = ref(true);
const error = ref(null);
const checkoutUrl = ref(null);
const checkoutMode = ref(null);
const paymentStatus = ref('pending');
const invoiceId = ref(null);

let paymentStatusTimeout = null;

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

const getApiUrl = () => {
  // Make sure to get the correct API URL
  const gqlHost = process.env.GQL_HOST || '';
  return gqlHost.replace('graphql', '');
};

const checkPaymentStatus = async () => {
  if (!orderId.value || !orderKey.value) return;
  
  try {
    const response = await fetch(
      `${getApiUrl()}?wc-api=BTCPay_Check_Payment&order_id=${orderId.value}&order_key=${orderKey.value}`,
      { credentials: 'include' }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to check payment status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.invoiceId) {
      invoiceId.value = data.invoiceId;
    }

    paymentStatus.value = data.status;

    if (data.status === 'completed') {
      // Wait a bit before redirecting to allow user to see success state
      setTimeout(() => {
        router.push(`/checkout/order-received/${orderId.value}?key=${orderKey.value}`);
      }, 2000);
    } else if (data.status === 'expired') {
      error.value = 'Payment time expired. Please try again.';
    } else {
      // Poll for updates every 5 seconds
      paymentStatusTimeout = setTimeout(checkPaymentStatus, 5000);
    }
  } catch (e) {
    console.error('Error checking payment status:', e);
    error.value = 'Failed to check payment status. Please refresh the page.';
  }
};

const reloadCheckout = async () => {
  loading.value = true;
  error.value = null;
  
  if (paymentStatusTimeout) {
    clearTimeout(paymentStatusTimeout);
    paymentStatusTimeout = null;
  }
  
  try {
    await initializeCheckout();
  } finally {
    loading.value = false;
  }
};

const initializeCheckout = async () => {
  if (!orderId.value || !orderKey.value) {
    error.value = 'Invalid order details. Please contact support.';
    loading.value = false;
    return;
  }
  
  try {
    const response = await fetch(
      `${getApiUrl()}?wc-api=BTCPay_Checkout&order_id=${orderId.value}&key=${orderKey.value}`,
      { credentials: 'include' }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to initialize checkout: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }

    checkoutUrl.value = data.checkoutUrl;
    checkoutMode.value = data.checkoutMode;
    invoiceId.value = data.invoiceId;

    if (checkoutMode.value === 'modal') {
      // Load modal script
      const script = document.createElement('script');
      script.src = data.modalScriptUrl;
      document.head.appendChild(script);
      
      script.onload = () => {
        if (window.btcpay && invoiceId.value) {
          window.btcpay.modal(invoiceId.value);
        }
      };
    }

    // Start polling for payment status
    checkPaymentStatus();
  } catch (e) {
    error.value = typeof e === 'string' ? e : e.message || 'Failed to load payment details.';
    console.error('BTCPay initialization error:', e);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  initializeCheckout();
});

onUnmounted(() => {
  if (paymentStatusTimeout) {
    clearTimeout(paymentStatusTimeout);
    paymentStatusTimeout = null;
  }
});
</script>

<style scoped>
.btcpay-checkout-container {
  @apply transition-all duration-300 ease-in-out;
}

.btcpay-checkout-container:hover {
  @apply transform scale-[1.01];
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
