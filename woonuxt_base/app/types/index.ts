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
  icon: string | null;
}

export interface OrderInput {
  paymentMethod: string;
  transactionId: string;
  customerNote?: string;
  shipToDifferentAddress?: boolean;
  metaData?: Array<{
    key: string;
    value: string;
  }>;
}

// Cart Types
export interface CartItem {
  key: string;
  id: string;
  name: string;
  quantity: number;
  price: string;
  subtotal: string;
  total: string;
  variation?: {
    id: string;
    name: string;
    attributes: Array<{
      name: string;
      value: string;
    }>;
  };
}

export interface CartContents {
  nodes: CartItem[];
}

export interface Cart {
  contents: CartContents;
  total: string;
  subtotal: string;
  shippingTotal: string;
  discountTotal: string;
  taxTotal: string;
}

// Auth Types
export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface Viewer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
} 
