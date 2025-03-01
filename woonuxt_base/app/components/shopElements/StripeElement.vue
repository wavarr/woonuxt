<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useCart } from '~/composables/useCart';

const { cart } = useCart();
const props = defineProps({
  btcpay: { type: Object, default: null }
});

const emit = defineEmits(['updateElement']);

const rawCartTotal = computed(() => cart.value && parseFloat(cart.value.rawTotal as string));
const invoiceData = ref(null);
const isLoading = ref(true);
const error = ref(null);

const createBTCPayInvoice = async () => {
  try {
    isLoading.value = true;
    error.value = null;
    
    // Make sure we have a cart total
    if (!rawCartTotal.value) {
      throw new Error('Cannot create invoice: Invalid cart total');
    }
    
    // Use btcpay prop if provided, or fall back to API
    if (props.btcpay && typeof props.btcpay.createInvoice === 'function') {
      const invoice = await props.btcpay.createInvoice({
        price: rawCartTotal.value,
        currency: 'USD'
      });
      
      invoiceData.value = invoice;
      emit('updateElement', invoice);
      return;
    }
    
    // Fall back to API call
    const runtimeConfig = useRuntimeConfig();
    const apiUrl = `${runtimeConfig.public.GQL_HOST.replace('graphql', '')}wp-json/btcpay/v1/create-invoice`;
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: rawCartTotal.value, currency: 'USD' }),
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }
    
    invoiceData.value = data;
    emit('updateElement', data);
    
    // If BTCPay browser script is available, initialize the modal/invoice
    if (window.btcpay && data.invoiceId) {
      if (data.checkoutMode === 'modal') {
        window.btcpay.showInvoice(data.invoiceId);
      }
    }
  } catch (err) {
    console.error('Error creating BTCPay invoice:', err);
    error.value = err.message || 'Failed to create invoice';
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  try {
    // Call our function to create the invoice
    await createBTCPayInvoice();
  } catch (err) {
    error.value = 'Failed to initialize payment';
    console.error(err);
  }
});
</script>

<template>
  <div id="btcpay-element">
    <div v-if="isLoading" class="flex justify-center p-4">
      <LoadingIcon />
    </div>
    <div v-else-if="error" class="text-red-500 p-4">
      {{ error }}
      <button @click="createBTCPayInvoice" class="ml-2 text-blue-500">
        Retry
      </button>
    </div>
    <!-- BTCPay invoice will be displayed here -->
  </div>
</template>
