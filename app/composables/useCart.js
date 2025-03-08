import { ref, reactive, computed } from 'vue';
import fallbackData from '../constants/fallbackData';

export const useCart = () => {
  // Get the runtime config
  const config = useRuntimeConfig();
  const useLocalData = config.public.useLocalData || false;
  
  // Create a reactive cart state
  const cart = reactive({
    contents: {
      nodes: [],
      itemCount: 0,
      productCount: 0
    },
    total: '$0.00',
    subtotal: '$0.00',
    shippingTotal: '$0.00',
    discountTotal: '$0.00',
    isEmpty: true,
    chosenShippingMethods: ['free_shipping:1'],
    availableShippingMethods: [
      {
        rates: [
          {
            cost: '0.00',
            id: 'free_shipping:1',
            label: 'Free shipping'
          }
        ]
      }
    ],
    appliedCoupons: null
  });
  
  // Load cart from localStorage on init
  const initCart = () => {
    if (process.client) {
      const savedCart = localStorage.getItem('woonuxt-cart');
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          Object.assign(cart, parsedCart);
        } catch (e) {
          console.error('Error parsing saved cart:', e);
        }
      }
    }
  };
  
  // Save cart to localStorage
  const saveCart = () => {
    if (process.client) {
      localStorage.setItem('woonuxt-cart', JSON.stringify(cart));
    }
  };
  
  // Add item to cart
  const addToCart = (productId, quantity = 1, variationId = null) => {
    // Find the product in fallback data
    const product = fallbackData.products.find(p => p.databaseId === productId);
    if (!product) return { success: false, message: 'Product not found' };
    
    // If it's a variable product, we need a variation
    if (product.type === 'VARIABLE' && !variationId) {
      return { success: false, message: 'Please select a product variation' };
    }
    
    // Find the variation if needed
    let variation = null;
    if (variationId) {
      variation = product.variations.find(v => v.databaseId === variationId);
      if (!variation) return { success: false, message: 'Variation not found' };
    }
    
    // Create cart item
    const cartItem = {
      key: `${productId}-${variationId || 'simple'}-${Date.now()}`,
      quantity,
      product: {
        node: product
      },
      variation: variation ? { node: variation } : null
    };
    
    // Add to cart
    cart.contents.nodes.push(cartItem);
    cart.contents.itemCount += quantity;
    cart.contents.productCount += 1;
    cart.isEmpty = false;
    
    // Update totals
    updateCartTotals();
    
    // Save to localStorage
    saveCart();
    
    return { success: true, message: 'Product added to cart' };
  };
  
  // Remove item from cart
  const removeFromCart = (key) => {
    const itemIndex = cart.contents.nodes.findIndex(item => item.key === key);
    if (itemIndex === -1) return { success: false, message: 'Item not found in cart' };
    
    const item = cart.contents.nodes[itemIndex];
    cart.contents.itemCount -= item.quantity;
    cart.contents.productCount -= 1;
    
    // Remove the item
    cart.contents.nodes.splice(itemIndex, 1);
    
    // Update isEmpty flag
    cart.isEmpty = cart.contents.nodes.length === 0;
    
    // Update totals
    updateCartTotals();
    
    // Save to localStorage
    saveCart();
    
    return { success: true, message: 'Item removed from cart' };
  };
  
  // Update cart item quantity
  const updateItemQuantity = (key, quantity) => {
    const item = cart.contents.nodes.find(item => item.key === key);
    if (!item) return { success: false, message: 'Item not found in cart' };
    
    // Update quantity
    const oldQuantity = item.quantity;
    item.quantity = quantity;
    
    // Update item count
    cart.contents.itemCount = cart.contents.itemCount - oldQuantity + quantity;
    
    // Update totals
    updateCartTotals();
    
    // Save to localStorage
    saveCart();
    
    return { success: true, message: 'Cart updated' };
  };
  
  // Clear cart
  const clearCart = () => {
    cart.contents.nodes = [];
    cart.contents.itemCount = 0;
    cart.contents.productCount = 0;
    cart.isEmpty = true;
    
    // Update totals
    updateCartTotals();
    
    // Save to localStorage
    saveCart();
    
    return { success: true, message: 'Cart cleared' };
  };
  
  // Update cart totals
  const updateCartTotals = () => {
    let subtotal = 0;
    
    // Calculate subtotal
    cart.contents.nodes.forEach(item => {
      const price = item.variation?.node?.price || item.product.node.price;
      if (price) {
        // Extract numeric value from price string (e.g. "$90.00" -> 90.00)
        const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
        subtotal += numericPrice * item.quantity;
      }
    });
    
    // Set cart totals
    cart.subtotal = `$${subtotal.toFixed(2)}`;
    cart.total = `$${subtotal.toFixed(2)}`; // No shipping or discounts in mock
    cart.shippingTotal = '$0.00';
    cart.discountTotal = '$0.00';
  };
  
  // Initialize cart on client side
  if (process.client) {
    initCart();
  }
  
  // Return the cart and methods
  return {
    cart: computed(() => cart),
    addToCart,
    removeFromCart,
    updateItemQuantity,
    clearCart
  };
}; 
