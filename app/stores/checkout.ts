// Simple checkout store implementation
export const useCheckout = () => {
  // Return a simple object with the properties needed by the checkout page
  return {
    orderInput: {
      paymentMethod: '',
      transactionId: '',
      customerNote: '',
      shipToDifferentAddress: false,
      metaData: []
    },
    isProcessingOrder: false,
    orderId: null,
    proccessCheckout: async () => 'order-123',
    resetCheckout: () => {}
  };
}; 
