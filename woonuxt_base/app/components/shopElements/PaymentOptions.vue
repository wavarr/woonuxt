<script setup lang="ts">
import { toRef, computed, onMounted } from 'vue';

// Define types for payment gateways
interface PaymentGateway {
  id: string;
  title: string;
  description?: string;
}

interface PaymentGateways {
  nodes: PaymentGateway[];
}

const props = defineProps<{
  modelValue: string | object;
  paymentGateways: PaymentGateways;
}>();

const paymentMethod = toRef(props, 'modelValue');
const activePaymentMethod = computed<PaymentGateway>(() => paymentMethod.value as PaymentGateway);
const emits = defineEmits(['update:modelValue']);

const updatePaymentMethod = (value: any) => {
  emits('update:modelValue', value);
};

onMounted(() => {
  if (props.paymentGateways?.nodes.length) {
    // Prioritize BTCPay if available
    const btcpayGateway = props.paymentGateways.nodes.find(gateway => gateway.id === 'btcpay');
    if (btcpayGateway) {
      updatePaymentMethod(btcpayGateway);
    } else {
      updatePaymentMethod(props.paymentGateways.nodes[0]);
    }
  }
});
</script>

<template>
  <div class="flex gap-4 leading-tight flex-wrap">
    <div
      v-for="gateway in paymentGateways?.nodes"
      :key="gateway.id"
      class="option"
      :class="{ 
        'active-option': gateway.id === activePaymentMethod.id,
        'credit-card-option': gateway.id === 'stripe' || gateway.title.includes('Credit Card'),
        'bitcoin-option': gateway.id === 'btcpay',
        'cash-option': gateway.id === 'cod'
      }"
      @click="updatePaymentMethod(gateway)"
      :title="gateway?.description || gateway?.title || 'Payment Method'">
      <icon v-if="gateway.id === 'btcpay'" name="ion:logo-bitcoin" size="20" />
      <icon v-else-if="gateway.id === 'cod'" name="ion:cash-outline" size="20" />
      <span class="whitespace-nowrap" v-html="gateway.title" />
      <icon name="ion:checkmark-circle" size="20" class="ml-auto text-primary checkmark opacity-0" />
    </div>
    <div v-if="activePaymentMethod.description" class="prose block w-full">
      <p class="text-sm text-gray-500" v-html="activePaymentMethod.description" />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.option {
  @apply bg-white border rounded-lg text-gray-600 cursor-pointer flex flex-1 text-sm py-3 px-4 gap-2 items-center;
  transition: all 0.3s ease;
  border-color: #e2e8f0;
  
  /* Navy blue hover effect */
  &:hover {
    @apply border-[#1d3557] shadow-sm;
    background-color: rgba(29, 53, 87, 0.03);
  }

  &.active-option {
    @apply cursor-default pointer-events-none shadow-sm;
    border-color: #1d3557;
    border-width: 2px;
    background: linear-gradient(to bottom, #ffffff, #f8f9fa);
    
    /* Gold accent for active payment method */
    & .checkmark {
      @apply opacity-100;
      color: #ffd700;
      filter: drop-shadow(0 0 2px rgba(255, 215, 0, 0.3));
    }
  }
}

/* Credit card specific styling */
.credit-card-option {
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
    height: 100%;
    background: linear-gradient(to right, transparent, rgba(255, 215, 0, 0.1));
    z-index: 1;
  }
  
  &.active-option::before {
    background: linear-gradient(to right, transparent, rgba(255, 215, 0, 0.2));
  }
}

/* Bitcoin specific styling */
.bitcoin-option svg {
  color: #f7931a; /* Bitcoin orange */
}

.bitcoin-option.active-option svg {
  filter: drop-shadow(0 0 2px rgba(247, 147, 26, 0.5));
}

/* Cash on delivery styling */
.cash-option svg {
  color: #2e7d32; /* Money green */
}

.cash-option.active-option svg {
  filter: drop-shadow(0 0 2px rgba(46, 125, 50, 0.5));
}
</style>
