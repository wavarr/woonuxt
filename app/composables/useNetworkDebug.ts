import { ref, onMounted, onUnmounted } from 'vue';

export function useNetworkDebug() {
  const isOnline = ref(true);
  const networkType = ref('unknown');
  const connectionSpeed = ref('unknown');
  const latency = ref(null);
  const lastPingTime = ref(null);
  
  // Track network status
  const updateOnlineStatus = () => {
    isOnline.value = navigator.onLine;
    console.log(`Network status: ${isOnline.value ? 'online' : 'offline'}`);
  };
  
  // Get connection info
  const updateConnectionInfo = () => {
    if ('connection' in navigator) {
      const conn = (navigator as any).connection;
      networkType.value = conn.effectiveType || 'unknown';
      connectionSpeed.value = conn.downlink ? `${conn.downlink} Mbps` : 'unknown';
      console.log(`Network connection: ${networkType.value} (${connectionSpeed.value})`);
    }
  };
  
  // Measure latency
  const checkLatency = async () => {
    try {
      const start = performance.now();
      // Use a small endpoint that returns quickly
      await fetch('/api/ping', { 
        method: 'HEAD',
        cache: 'no-store'
      });
      const end = performance.now();
      latency.value = Math.round(end - start);
      lastPingTime.value = new Date().toISOString();
      console.log(`API latency: ${latency.value}ms`);
    } catch (e) {
      console.error('Latency check failed:', e);
      latency.value = null;
    }
  };
  
  // Run diagnostics
  const runNetworkDiagnostics = async () => {
    console.group('🔍 Network Diagnostics');
    updateOnlineStatus();
    updateConnectionInfo();
    await checkLatency();
    console.groupEnd();
    
    return {
      isOnline: isOnline.value,
      networkType: networkType.value,
      connectionSpeed: connectionSpeed.value,
      latency: latency.value,
      timestamp: new Date().toISOString()
    };
  };
  
  onMounted(() => {
    if (process.client) {
      window.addEventListener('online', updateOnlineStatus);
      window.addEventListener('offline', updateOnlineStatus);
      
      if ('connection' in navigator) {
        (navigator as any).connection.addEventListener('change', updateConnectionInfo);
      }
      
      // Initial check
      runNetworkDiagnostics();
    }
  });
  
  onUnmounted(() => {
    if (process.client) {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
      
      if ('connection' in navigator) {
        (navigator as any).connection.removeEventListener('change', updateConnectionInfo);
      }
    }
  });
  
  return {
    isOnline,
    networkType,
    connectionSpeed,
    latency,
    lastPingTime,
    checkLatency,
    runNetworkDiagnostics
  };
} 
