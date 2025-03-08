/**
 * Cookie Handler Plugin
 * This plugin ensures that all necessary cookies are properly set and handled.
 */

export default defineNuxtPlugin((nuxtApp) => {
  // Only run on client side
  if (!process.client) return;
  
  // Function to get a cookie by name
  const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    const cookie = cookies.find(c => c.trim().startsWith(name + '='));
    return cookie ? cookie.trim().substring(name.length + 1) : null;
  };
  
  // Function to set a cookie
  const setCookie = (name, value, options = {}) => {
    const defaultOptions = {
      path: '/',
      maxAge: 86400 * 7, // 7 days
      sameSite: 'None',
      secure: true
    };
    
    const cookieOptions = { ...defaultOptions, ...options };
    let cookieString = `${name}=${value}`;
    
    Object.entries(cookieOptions).forEach(([key, value]) => {
      if (key === 'maxAge') {
        cookieString += `; max-age=${value}`;
      } else if (key !== 'secure' && key !== 'sameSite') {
        cookieString += `; ${key}=${value}`;
      }
    });
    
    if (cookieOptions.secure) cookieString += '; Secure';
    if (cookieOptions.sameSite) cookieString += `; SameSite=${cookieOptions.sameSite}`;
    
    document.cookie = cookieString;
    console.log(`Cookie set: ${name}`);
  };
  
  // Function to ensure all required cookies are set
  const ensureRequiredCookies = () => {
    console.log('Checking required cookies...');
    
    // List of all cookies from the request
    const allCookies = document.cookie.split(';').map(c => c.trim());
    console.log('Current cookies:', allCookies);
    
    // Check for WooCommerce session cookie
    const wooSessionCookie = getCookie('wp_woocommerce_session');
    if (!wooSessionCookie) {
      console.warn('No WooCommerce session cookie found');
      
      // Only create dummy cookies in development
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const dummySessionId = 'dev_' + Math.random().toString(36).substring(2, 15);
        setCookie('wp_woocommerce_session_dev', dummySessionId);
      }
    } else {
      console.log('WooCommerce session cookie found');
    }
    
    // Check for WordPress test cookie
    const wpTestCookie = getCookie('wordpress_test_cookie');
    if (!wpTestCookie && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
      setCookie('wordpress_test_cookie', 'WP Cookie check');
    }
    
    // Check for WordPress language cookie
    const wpLangCookie = getCookie('wp_lang');
    if (!wpLangCookie && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
      setCookie('wp_lang', 'en_US');
    }
  };
  
  // Run on app created
  nuxtApp.hook('app:created', () => {
    console.log('Cookie handler plugin initialized');
    ensureRequiredCookies();
  });
  
  // Run on page navigation
  nuxtApp.hook('page:finish', () => {
    console.log('Page navigation complete, checking cookies');
    ensureRequiredCookies();
  });
  
  // Add event listener for page load
  if (process.client) {
    window.addEventListener('load', () => {
      console.log('Page loaded, checking cookies');
      ensureRequiredCookies();
    });
  }
  
  // Provide cookie utilities to the app
  return {
    provide: {
      getCookie,
      setCookie,
      ensureRequiredCookies
    }
  };
}); 
