// Cart store implementation without external dependencies
// This provides basic cart functionality that works with WooCommerce

// State
const cart = { contents: { nodes: [] }, total: '0', subtotal: '0', shippingTotal: '0', discountTotal: '0', taxTotal: '0' };
const isUpdatingCart = false;
const paymentGateways = [
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
];
const cartId = '';

// Get cart contents
const getCart = async () => {
  // In a real implementation, this would fetch from the WooCommerce API
  return cart;
};

// Update cart
const updateCart = async (items) => {
  // In a real implementation, this would update the cart via the WooCommerce API
  cart.contents.nodes = items;
  
  // Recalculate totals based on items
  let subtotal = 0;
  items.forEach(item => {
    subtotal += parseFloat(item.subtotal);
  });
  cart.subtotal = subtotal.toFixed(2);
  cart.total = subtotal.toFixed(2);
  
  return cart;
};

// Get payment gateways
const getPaymentGateways = async () => {
  // In a real implementation, this would fetch from the WooCommerce API
  return paymentGateways;
};

// Clear cart
const clearCart = () => {
  cart.contents.nodes = [];
  cart.total = '0';
  cart.subtotal = '0';
  cart.shippingTotal = '0';
  cart.discountTotal = '0';
  cart.taxTotal = '0';
};

// Initialize cart
const initCart = async () => {
  await getCart();
};

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
    cartCount: cart.contents.nodes.length,
    cartTotal: cart.total
  };
}; 
