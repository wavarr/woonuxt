export interface BTCPayInvoice {
  id: string;
  status: string;
  amount: number;
  currency: string;
  [key: string]: any; // Allow for additional BTCPay invoice properties
}

export interface PaymentGateway {
  id: string;
  title: string;
  description: string;
  [key: string]: any;
}

export interface OrderInput {
  paymentMethod: {
    id: string;
    [key: string]: any;
  };
  transactionId: string;
  metaData: Array<{
    key: string;
    value: string;
  }>;
  [key: string]: any;
} 
