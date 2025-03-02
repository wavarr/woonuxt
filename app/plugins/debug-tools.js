import { onMounted } from 'vue';
import { defineNuxtPlugin } from '#app';

// Add to your plugin
onMounted(() => {
  // Check for debug parameter in URL
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('debug') || urlParams.has('debug_mode')) {
    window.wooDebug.activate();
  }
  
  // Check for specific debug features
  if (urlParams.has('debug_btcpay')) {
    window.wooDebug.testBTCPay();
  }
  
  if (urlParams.has('debug_auth')) {
    window.wooDebug.checkAuth();
  }
});

export default defineNuxtPlugin(() => {
  if (process.client && process.env.NODE_ENV === 'development') {
    // Create global debug object
    window.wooDebug = {
      enabled: false,
      
      // Toggle debugging
      toggle() {
        this.enabled = !this.enabled;
        console.log(`🐞 Debug mode ${this.enabled ? 'enabled' : 'disabled'}`);
        return this.enabled;
      },
      
      // Activate all debugging tools
      activate() {
        this.enabled = true;
        this.monitorNetwork();
        this.monitorGraphQL();
        this.showDebugPanel();
        console.log('🐞 All debugging tools activated');
        return 'Debug tools activated. Type wooDebug.help() for available commands';
      },
      
      // Show help information
      help() {
        console.group('🐞 WooNuxt Debug Tools - Available Commands');
        console.log('wooDebug.toggle() - Toggle debug mode');
        console.log('wooDebug.activate() - Activate all debugging tools');
        console.log('wooDebug.testBTCPay() - Test BTCPay connection');
        console.log('wooDebug.checkAuth() - Check authentication status');
        console.log('wooDebug.monitorNetwork() - Monitor network requests');
        console.log('wooDebug.monitorGraphQL() - Monitor GraphQL queries');
        console.log('wooDebug.showDebugPanel() - Show visual debug panel');
        console.log('wooDebug.clearCookies() - Clear all cookies');
        console.log('wooDebug.clearStorage() - Clear local/session storage');
        console.groupEnd();
      },
      
      // Other methods as before...
    };
    
    // Add keyboard shortcut listener
    document.addEventListener('keydown', (event) => {
      // Ctrl+Shift+D to toggle debug mode
      if (event.ctrlKey && event.shiftKey && event.key === 'd') {
        event.preventDefault();
        window.wooDebug.toggle();
      }
    });
    
    // Log that debug tools are available
    console.log('🐞 Debug tools available. Type wooDebug.help() for commands');
  }
}); 
