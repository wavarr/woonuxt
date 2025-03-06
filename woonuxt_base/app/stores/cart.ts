// Simple cart store implementation
export const useCart = () => {
  // Return a simple object with the properties needed by the checkout page
  return {
    cart: { contents: { nodes: [] }, total: '0', subtotal: '0', shippingTotal: '0', discountTotal: '0', taxTotal: '0' },
    cartId: '',
    isUpdatingCart: false,
    paymentGateways: [
      {
        id: 'cod',
        title: 'Cash on Delivery',
        description: 'Pay with cash upon delivery.',
        icon: null
      }
    ],
    getCart: async () => null,
    updateCart: async () => {},
    getPaymentGateways: async () => [],
    clearCart: () => {},
    initCart: async () => {},
    cartCount: 0,
    cartTotal: '0'
  };
}; 
