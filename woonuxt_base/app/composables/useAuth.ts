import type {
  RegisterCustomerInput,
  CreateAccountInput,
  ResetPasswordKeyMutationVariables,
  ResetPasswordEmailMutationVariables,
  LoginInput,
  LoginClientFragment,
} from '#gql';

export const useAuth = () => {
  const { refreshCart, updateCart } = useCart(); // Add updateCart
  const { logGQLError, clearAllCookies, clearAllLocalStorage } = useHelpers();
  const router = useRouter();

  // Initialize state with potentially persisted data or defaults
  const customer = useState<Customer>('customer', () => ({ billing: {}, shipping: {} }));
  const viewer = useState<Viewer | null>('viewer', () => null);
  const isPending = useState<boolean>('isPending', () => false);
  const orders = useState<Order[] | null>('orders', () => null);
  const downloads = useState<DownloadableItem[] | null>('downloads', () => null);
  const loginClients = useState<LoginClient[] | null>('loginClients', () => null);

  // Log in the user
  const loginUser = async (credentials: CreateAccountInput): Promise<{ success: boolean; error: any }> => {
    isPending.value = true;
    console.log("Attempting login for user:", credentials.username);

    try {
      // Clear existing token before attempting login to avoid conflicts
      useGqlToken(null);

      const { login } = await GqlLogin(credentials);
      console.log("Login response:", login);

      if (login?.authToken && login?.refreshToken && login?.user) {
        console.log("Login successful, setting tokens.");
        useGqlToken(login.authToken, login.refreshToken); // Set both tokens

        // Call refreshCart AFTER setting the token to ensure the request is authenticated
        const cartRefreshed = await refreshCart();
        if (!cartRefreshed) {
            console.warn("Cart refresh failed after login, user/cart state might be inconsistent.");
            // Potentially try refreshing again or notify user
        } else {
            console.log("Cart refreshed successfully after login.");
        }
         // Update viewer/customer state directly from login response if refreshCart didn't catch it
         if (login.customer) updateCustomer(login.customer);
         if (login.user) updateViewer(login.user);


        isPending.value = false;
        return { success: true, error: null };

      } else {
          // Handle cases where login succeeded partially or failed silently
          let errorMessage = login?.errorMessage || 'Login failed: Invalid credentials or server error.'; // Use error message from backend if available
          if (!login?.authToken) errorMessage = 'Login failed: Authentication token missing.';
          if (!login?.user) errorMessage = 'Login failed: User data missing.';

          console.error("Login failed:", errorMessage, "Response:", login);
          isPending.value = false;
           // Do not clear tokens here, GqlLogin might have failed before setting them
           useGqlToken(null); // Ensure tokens are cleared on failure
           await refreshCart(); // Refresh cart to get guest cart state
           return { success: false, error: errorMessage };
      }

    } catch (error: any) {
      logGQLError(error);
      isPending.value = false;
      useGqlToken(null); // Clear token on error
      await refreshCart(); // Refresh cart to get guest cart state

      return {
        success: false,
        error: error?.gqlErrors?.[0]?.message || 'An unexpected error occurred during login.',
      };
    }
  };

  const loginWithProvider = async (state: string, code: string, provider: any): Promise<{ success: boolean; error: any }> => {
    isPending.value = true;
    console.log(`Attempting login with provider: ${provider}`);

    try {
       useGqlToken(null); // Clear existing token

      const input: LoginInput = { oauthResponse: { state, code }, provider };
      const response = await GqlLoginWithProvider({ input });
       console.log("Provider login response:", response);


      if (response.login?.authToken && response.login?.refreshToken && response.login?.user) {
         console.log("Provider login successful, setting tokens.");
        useGqlToken(response.login.authToken, response.login.refreshToken);

        const cartRefreshed = await refreshCart();
        if (!cartRefreshed) {
             console.warn("Cart refresh failed after provider login.");
        } else {
             console.log("Cart refreshed successfully after provider login.");
        }
        // Update viewer/customer state directly
         if (response.login.customer) updateCustomer(response.login.customer);
         if (response.login.user) updateViewer(response.login.user);

         isPending.value = false; // Set pending false on success
         return { success: true, error: null };

      } else {
         let errorMessage = response?.login?.errorMessage || 'Provider login failed: Missing token or user data.';
         console.error("Provider login failed:", errorMessage, "Response:", response);
          useGqlToken(null); // Clear tokens
          await refreshCart(); // Get guest cart
          isPending.value = false; // Set pending false on failure
         return { success: false, error: errorMessage };
      }
    } catch (error: any) {
      logGQLError(error);
       useGqlToken(null); // Clear token on error
       await refreshCart(); // Get guest cart

      isPending.value = false; // Ensure pending is false in catch block
      return {
        success: false,
        error: error?.gqlErrors?.[0]?.message || 'An unexpected error occurred during provider login.',
      };
    }
    // finally block removed as pending state is handled in try/catch
  };

  // Log out the user
  const logoutUser = async (): Promise<{ success: boolean; error: any }> => {
    isPending.value = true;
    console.log("Attempting logout.");
    try {
      // Perform the logout mutation if the backend requires it
      // If logout just involves clearing client state, this can be skipped
      // const { logout } = await GqlLogout();
      // console.log("Logout response:", logout);

      clearAllCookies(); // Clear WC session and auth token cookies
      clearAllLocalStorage(); // Clear any relevant local storage
      useGqlToken(null); // Clear GQL auth state

       // Reset local state
       updateViewer(null);
       updateCustomer({ billing: {}, shipping: {} }); // Reset customer data
       updateCart(null); // Clear cart data explicitly
       orders.value = null;
       downloads.value = null;

      // Refresh cart to get the guest cart/state
      await refreshCart();
      console.log("Logout successful, state cleared.");


       // Redirect after state is cleared
       if (router.currentRoute.value.path.includes('/my-account')) {
         router.push('/'); // Redirect from account page
       } else {
         // Optional: Force reload if state inconsistencies persist?
         // window.location.reload();
       }

      return { success: true, error: null };
    } catch (error: any) {
      logGQLError(error);
       // Even on error, attempt to clear state
       clearAllCookies();
       clearAllLocalStorage();
       useGqlToken(null);
       updateViewer(null);
       updateCustomer({ billing: {}, shipping: {} });
       updateCart(null);
       orders.value = null;
       downloads.value = null;
       await refreshCart(); // Try to get guest cart

      return { success: false, error: error?.gqlErrors?.[0]?.message || 'Logout failed.' };
    } finally {
      isPending.value = false;
    }
  };


  const registerUser = async (userInfo: RegisterCustomerInput): Promise<{ success: boolean; error: any }> => {
    isPending.value = true;
     console.log("Attempting registration for:", userInfo.email);
    try {
      const { registerCustomer } = await GqlRegisterCustomer({ input: userInfo });
       console.log("Registration response:", registerCustomer);

      if (registerCustomer?.customer?.databaseId) {
          console.log("Registration successful.");
          // Optionally log the user in immediately after registration
           // const loginResult = await loginUser({ username: userInfo.username, password: userInfo.password });
           // if (!loginResult.success) { console.warn("Auto-login after registration failed:", loginResult.error); }
          isPending.value = false;
          return { success: true, error: null };
      } else {
          console.error("Registration mutation completed but returned unexpected data:", registerCustomer);
          isPending.value = false;
          return { success: false, error: registerCustomer?.errorMessage || 'Registration failed: Server did not confirm account creation.' };
      }

    } catch (error: any) {
      logGQLError(error);
      const gqlError = error?.gqlErrors?.[0];
      isPending.value = false;
      return { success: false, error: gqlError?.message || 'An unexpected error occurred during registration.' };
    }
  };

  // Update the user state
  const updateCustomer = (payload: Customer | null): void => {
    // console.log("Updating customer state:", payload);
     if (payload === null) {
        customer.value = { billing: {}, shipping: {} }; // Reset if null
        // Clear WC session? - Logout handles this usually
         const sessionCookie = useCookie('woocommerce-session');
         sessionCookie.value = null;
     } else {
        // Merge billing/shipping separately to avoid overwriting entire object if only one part is updated
        customer.value = {
            ...customer.value, // Keep existing non-address fields
            billing: { ...(customer.value.billing || {}), ...(payload.billing || {}) },
            shipping: { ...(customer.value.shipping || {}), ...(payload.shipping || {}) },
            sessionToken: payload.sessionToken || customer.value.sessionToken, // Update session token
            // Add other customer fields if they exist on the payload
        };
        const sessionToken = payload?.sessionToken;
        if (sessionToken) {
            // console.log("Updating woocommerce-session cookie:", sessionToken);
            useGqlHeaders({ 'woocommerce-session': `Session ${sessionToken}` });
            const { getDomain } = useHelpers();
            const sessionCookie = useCookie('woocommerce-session', { domain: getDomain(window.location.href), path: '/', sameSite: 'lax', secure: process.env.NODE_ENV === 'production' });
            sessionCookie.value = sessionToken;
        }
     }
  };

  const updateViewer = (payload: Viewer | null): void => {
    // console.log("Updating viewer state:", payload);
    viewer.value = payload;
    // isPending.value should ideally be managed per-action, not globally stopped here
  };

  const sendResetPasswordEmail = async ({ username }: ResetPasswordEmailMutationVariables): Promise<{ success: boolean; error: any }> => {
    isPending.value = true;
    try {
      const { sendPasswordResetEmail } = await GqlResetPasswordEmail({ username });
      if (sendPasswordResetEmail?.success) {
        isPending.value = false;
        return { success: true, error: null };
      }
       console.error("sendPasswordResetEmail indicates failure:", sendPasswordResetEmail);
      isPending.value = false;
      return { success: false, error: sendPasswordResetEmail?.errorMessage || 'There was an error sending the reset password email. Please try again later.' };
    } catch (error: any) {
      logGQLError(error);
      isPending.value = false;
      const gqlError = error?.gqlErrors?.[0];
      return { success: false, error: gqlError?.message || 'An unexpected error occurred.' };
    } finally {
        isPending.value = false; // Ensure pending is false
    }
  };

  const resetPasswordWithKey = async ({ key, login, password }: ResetPasswordKeyMutationVariables): Promise<{ success: boolean; error: any }> => {
    isPending.value = true;
    try {
      const { resetUserPassword } = await GqlResetPasswordKey({ key, login, password });
      const wasPasswordReset = Boolean(resetUserPassword?.user?.id);
      if (wasPasswordReset) {
        isPending.value = false;
        return { success: true, error: null };
      }
       console.error("resetUserPassword indicates failure:", resetUserPassword);
       isPending.value = false;
      return { success: false, error: resetUserPassword?.errorMessage || 'There was an error resetting the password. Please try again later.' };
    } catch (error: any) {
      isPending.value = false;
      const gqlError = error?.gqlErrors?.[0];
      return { success: false, error: gqlError?.message || 'An unexpected error occurred.' };
    } finally {
        isPending.value = false; // Ensure pending is false
    }
  };

  const getOrders = async (): Promise<{ success: boolean; error: any }> => {
    isPending.value = true; // Use pending state for data fetching too
    try {
      const { customer: customerData } = await GqlGetOrders();
      if (customerData?.orders) { // Check if orders object exists
        orders.value = customerData.orders.nodes ?? [];
        isPending.value = false;
        return { success: true, error: null };
      }
      isPending.value = false;
      // Handle case where customer is returned but orders might be null/undefined
      orders.value = []; // Set empty array if orders are null/undefined but customer exists
      return { success: true, error: null }; // Still success, just no orders
    } catch (error: any) {
      logGQLError(error);
      isPending.value = false;
      orders.value = null; // Clear orders on error
      const gqlError = error?.gqlErrors?.[0];
      return { success: false, error: gqlError?.message || 'An unexpected error occurred.' };
    } finally {
        isPending.value = false; // Ensure pending is false
    }
  };

  const getDownloads = async (): Promise<{ success: boolean; error: any }> => {
     isPending.value = true;
    try {
      const { customer: customerData } = await GqlGetDownloads();
      if (customerData?.downloadableItems) { // Check if downloadableItems object exists
        downloads.value = customerData.downloadableItems.nodes ?? [];
         isPending.value = false;
        return { success: true, error: null };
      }
       isPending.value = false;
       downloads.value = []; // Set empty array if downloadableItems are null/undefined but customer exists
      return { success: true, error: null }; // Still success, just no downloads
    } catch (error: any) {
      logGQLError(error);
       isPending.value = false;
       downloads.value = null; // Clear downloads on error
      const gqlError = error?.gqlErrors?.[0];
      return { success: false, error: gqlError?.message || 'An unexpected error occurred.' };
    } finally {
        isPending.value = false; // Ensure pending is false
    }
  };

  const updateLoginClients = (payload: LoginClient[] | null): void => {
     // Filter out any null entries just in case
    loginClients.value = payload?.filter((client): client is LoginClient => client !== null) ?? null;
  };

  const avatar = computed(() => viewer.value?.avatar?.url ?? null);
  const wishlistLink = computed<string>(() => (viewer.value ? '/my-account?tab=wishlist' : '/wishlist'));
  const isLoggedIn = computed<boolean>(() => !!viewer.value); // Convenience computed for checking login status

  return {
    viewer,
    customer,
    isPending,
    isLoggedIn, // Expose isLoggedIn
    orders,
    downloads,
    avatar,
    wishlistLink,
    loginUser,
    loginClients,
    loginWithProvider,
    updateCustomer,
    updateViewer,
    logoutUser,
    registerUser,
    sendResetPasswordEmail,
    resetPasswordWithKey,
    getOrders,
    getDownloads,
    updateLoginClients,
  };
};