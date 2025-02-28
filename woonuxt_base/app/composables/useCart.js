const refreshCart = async () => {
  try {
    isUpdatingCart.value = true;
    
    // Use our new useAsyncQuery function
    const { data: result, error: fetchError } = await useAsyncQuery(
      CartFragment,
      {},
      { fetchPolicy: 'network-only' }
    );
    
    if (fetchError) {
      console.error('Error refreshing cart:', fetchError);
      return;
    }
    
    cart.value = result.cart;
  } catch (err) {
    console.error('Error refreshing cart:', err);
  } finally {
    isUpdatingCart.value = false;
  }
}; 
