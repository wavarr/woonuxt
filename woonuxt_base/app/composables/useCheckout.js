import { ref, reactive } from 'vue';
import { useCart } from './useCart';

export const useCheckout = () => {
  const { cart, fetchCart } = useCart();
  const currentStep = ref(1);
  const loading = ref(false);
  const error = ref(null);

  const checkoutData = reactive({
    billing: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      postcode: '',
      country: ''
    },
    shipping: {
      sameAsBilling: true,
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      postcode: '',
      country: ''
    },
    payment: {
      method: '',
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    },
    orderNotes: ''
  });

  const validateStep = (step) => {
    switch (step) {
      case 1: // Billing
        return Object.values(checkoutData.billing)
          .filter(field => field !== checkoutData.billing.address2)
          .every(field => field.length > 0);
      case 2: // Shipping
        if (checkoutData.shipping.sameAsBilling) return true;
        return Object.values(checkoutData.shipping)
          .filter(field => field !== checkoutData.shipping.address2)
          .every(field => field.length > 0);
      case 3: // Payment
        return checkoutData.payment.method &&
          (checkoutData.payment.method === 'cod' || 
           (checkoutData.payment.cardNumber && 
            checkoutData.payment.expiryDate && 
            checkoutData.payment.cvv));
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep.value)) {
      currentStep.value++;
    }
  };

  const prevStep = () => {
    if (currentStep.value > 1) {
      currentStep.value--;
    }
  };

  const placeOrder = async () => {
    if (!validateStep(3)) return;
    loading.value = true;
    error.value = null;

    try {
      // Implement order placement logic here
      await processOrder();
      await fetchCart(); // Refresh cart after order
    } catch (e) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    currentStep,
    checkoutData,
    loading,
    error,
    nextStep,
    prevStep,
    validateStep,
    placeOrder
  };
}; 
