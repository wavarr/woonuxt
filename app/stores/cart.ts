import { ref, computed, reactive } from 'vue';
import type { Cart, CartItem, PaymentGateway } from '~/types';

// State
const cart = ref<Cart | null>(null);
const isUpdatingCart = ref(false);
const paymentGateways = ref<PaymentGateway[]>([
  {
    id: 'cod',
    title: 'Cash on Delivery',
    description: 'Pay with cash upon delivery.',
    icon: null
  },
  {
    id: 'btcpay_server',
    title: 'BTCPay Server',
    description: 'Pay with Bitcoin via BTCPay Server.',
    icon: null
  }
]);
const cartId = ref('');

// Get cart contents - this would typically fetch from WooCommerce
const getCart = async () => {
  try {
    // In a real implementation, this would fetch from the WooCommerce API
    // For now, we'll return the current cart state or a default cart
    if (!cart.value) {
      cart.value = {
        contents: { nodes: [] },
        total: '0',
        subtotal: '0',
        shippingTotal: '0',
        discountTotal: '0',
        taxTotal: '0'
      };
    }
    return cart.value;
  } catch (error) {
    console.error('Error fetching cart:', error);
    return cart.value;
  }
};

// Update cart
const updateCart = async (items: CartItem[]) => {
  isUpdatingCart.value = true;
  try {
    // In a real implementation, this would update the cart via the WooCommerce API
    if (!cart.value) {
      await getCart();
    }
    
    if (cart.value) {
      cart.value.contents.nodes = items;
      // Recalculate totals based on items
      let subtotal = 0;
      items.forEach(item => {
        subtotal += parseFloat(item.subtotal);
      });
      cart.value.subtotal = subtotal.toFixed(2);
      cart.value.total = subtotal.toFixed(2); // In a real implementation, this would include tax, shipping, etc.
    }
  } catch (error) {
    console.error('Error updating cart:', error);
  } finally {
    isUpdatingCart.value = false;
  }
};

// Get payment gateways
const getPaymentGateways = async () => {
  try {
    // In a real implementation, this would fetch from the WooCommerce API
    // For now, we'll return the default gateways
    return paymentGateways.value;
  } catch (error) {
    console.error('Error fetching payment gateways:', error);
    return paymentGateways.value;
  }
};

// Clear cart
const clearCart = () => {
  if (cart.value) {
    cart.value.contents.nodes = [];
    cart.value.total = '0';
    cart.value.subtotal = '0';
    cart.value.shippingTotal = '0';
    cart.value.discountTotal = '0';
    cart.value.taxTotal = '0';
  }
  cartId.value = '';
};

// Initialize cart
const initCart = async () => {
  await getCart();
};

// Computed properties
const cartCount = computed(() => {
  return cart.value?.contents?.nodes?.length || 0;
});

const cartTotal = computed(() => {
  return cart.value?.total || '0';
});

// Export the cart store
export const useCart = () => {
  return {
    cart,
    cartId,
    isUpdatingCart,
    paymentGateways,
    getCart,
    updateCart,
    getPaymentGateways,
    clearCart,
    initCart,
    cartCount,
    cartTotal
  };
}; 
