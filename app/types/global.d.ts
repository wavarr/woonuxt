import { UseQueryReturn } from '@vue/apollo-composable';

declare global {
  interface Window {
    useAsyncQuery?: (document: any, variables?: any, options?: any) => UseQueryReturn<any, any>;
    btcpay?: {
      modal: (invoiceId: string) => void;
    };
  }
}

export {}; 
