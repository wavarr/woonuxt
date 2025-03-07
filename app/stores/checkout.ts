import { ref } from 'vue';
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
    // In a real implementation, this would submit the order to WooCommerce
    // For BTCPay Server, it would create an invoice and redirect to payment page
    
    // Generate a temporary order ID for now
    orderId.value = `order-${Date.now()}`;
    
    // If using BTCPay Server, we would redirect to the payment page
    if (orderInput.value.paymentMethod === 'btcpay_server') {
      // In a real implementation, this would redirect to BTCPay Server
      if (redirect) {
        // This is a placeholder - in reality, this would be the BTCPay Server URL
        window.location.href = `/btcpay/invoice/${orderId.value}`;
      }
    } else if (orderInput.value.paymentMethod === 'cod') {
      // For Cash on Delivery, we would just create the order in WooCommerce
      if (redirect) {
        window.location.href = `/order-received/${orderId.value}`;
      }
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
    orderInput,
    isProcessingOrder,
    orderId,
    proccessCheckout,
    resetCheckout
  };
}; 
