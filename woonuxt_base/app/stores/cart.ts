import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useStorage } from '@vueuse/core';
import type { Cart, CartItem, PaymentGateway } from '~/types';

export const useCart = defineStore('cart', () => {
  const cart = ref<Cart | null>(null);
  const isUpdatingCart = ref(false);
  const paymentGateways = ref<PaymentGateway[]>([]);
  const cartId = useStorage('woonuxt-cart-id', '');

  // Get cart contents
  const getCart = async () => {
    try {
      // This would typically fetch the cart from an API
      // For now, we'll just return the current cart state
      return cart.value;
    } catch (error) {
      console.error('Error fetching cart:', error);
      return null;
    }
  };

  // Update cart
  const updateCart = async (items: CartItem[]) => {
    isUpdatingCart.value = true;
    try {
      // This would typically update the cart via an API
      // For now, we'll just update the local state
      if (cart.value) {
        cart.value.contents.nodes = items;
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
      // This would typically fetch payment gateways from an API
      // For now, we'll return a default gateway
      paymentGateways.value = [
        {
          id: 'cod',
          title: 'Cash on Delivery',
          description: 'Pay with cash upon delivery.',
          icon: null
        }
      ];
      return paymentGateways.value;
    } catch (error) {
      console.error('Error fetching payment gateways:', error);
      return [];
    }
  };

  // Clear cart
  const clearCart = () => {
    cart.value = null;
    cartId.value = '';
  };

  // Initialize cart
  const initCart = async () => {
    if (!cart.value) {
      await getCart();
    }
    if (!paymentGateways.value.length) {
      await getPaymentGateways();
    }
  };

  // Computed properties
  const cartCount = computed(() => {
    return cart.value?.contents?.nodes?.length || 0;
  });

  const cartTotal = computed(() => {
    return cart.value?.total || '0';
  });

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
}); 
