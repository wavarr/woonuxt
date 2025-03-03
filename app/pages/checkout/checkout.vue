<script setup lang="ts">
import { ref, computed } from 'vue';
import type { BTCPayInvoice } from '#imports';

// Get payment gateways from parent component
const props = defineProps({
  paymentGateways: Object
});

// Add BTCPay initialization
const btcpay = ref(null);
const orderInput = ref({
  paymentMethod: null as any,
  transactionId: '',
  metaData: [] as Array<{key: string, value: string}>
});

// Add handler for BTCPay element
const handleBTCPayElement = (invoice: BTCPayInvoice) => {
  if (invoice) {
    console.log('BTCPay invoice created:', invoice);
    orderInput.value.transactionId = invoice.id;
    
    // If using direct checkout instead of invoice page
    if (orderInput.value.paymentMethod?.id === 'btcpay') {
      // Set the BTCPay invoice ID to be used during checkout
      orderInput.value.metaData.push({ 
        key: '_btcpay_invoice_id', 
        value: invoice.id 
      });
    }
  }
};
</script>

<template>
  <div v-if="paymentGateways?.nodes?.length" class="mt-2 col-span-full">
    <h2 class="mb-4 text-xl font-semibold">{{ $t('messages.billing.paymentOptions') }}</h2>
    <PaymentOptions v-model="orderInput.paymentMethod" class="mb-4" :paymentGateways="paymentGateways" />
    
    <BTCPayElement 
      v-if="orderInput.paymentMethod?.id === 'btcpay'" 
      @update-element="handleBTCPayElement" 
    />
  </div>
</template>
