import { ref, readonly } from 'vue';
import type { OrderInput } from '~/types';

// State
const orderInput = ref<OrderInput>({
  paymentMethod: '',
  transactionId: '',
  customerNote: '',
  shipToDifferentAddress: false,
  metaData: []
});
const isProcessingOrder = ref(false);
const orderId = ref<string | null>(null);

// Process checkout
const proccessCheckout = async (redirect: boolean = true) => {
  isProcessingOrder.value = true;
  try {
    // This would typically process the checkout via an API
    // For now, we'll just simulate a successful checkout
    orderId.value = `order-${Date.now()}`;
    
    if (redirect) {
      // Redirect to order confirmation page
      window.location.href = `/order-received/${orderId.value}`;
    }
    
    return orderId.value;
  } catch (error) {
    console.error('Error processing checkout:', error);
    return null;
  } finally {
    isProcessingOrder.value = false;
  }
};

// Reset checkout
const resetCheckout = () => {
  orderInput.value = {
    paymentMethod: '',
    transactionId: '',
    customerNote: '',
    shipToDifferentAddress: false,
    metaData: []
  };
  orderId.value = null;
};

// Export the checkout store
export const useCheckout = () => {
  return {
    orderInput: readonly(orderInput),
    isProcessingOrder: readonly(isProcessingOrder),
    orderId: readonly(orderId),
    proccessCheckout,
    resetCheckout
  };
}; 
