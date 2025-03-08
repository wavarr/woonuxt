/**
 * Fallback data for the WooNuxt store
 * This data will be used when the GraphQL connection fails
 */

export const fallbackProducts = [
  {
    id: 'product-38',
    databaseId: 38,
    name: 'Modawake',
    slug: 'modawake',
    type: 'VARIABLE',
    price: '$90.00 - $225.00',
    rawPrice: '90.00, 140.00, 225.00',
    regularPrice: '$90.00 - $225.00',
    rawRegularPrice: '90.00, 140.00, 225.00',
    salePrice: null,
    rawSalePrice: null,
    stockStatus: 'IN_STOCK',
    onSale: false,
    shortDescription: 'Premium quality Modafinil tablets.',
    description: '<p>Modawake is a high-quality modafinil product known for its effectiveness and reliability.</p>',
    averageRating: 5,
    reviewCount: 1,
    image: {
      sourceUrl: 'https://modaprimeusa.com/wp-content/uploads/2024/02/modawake.png',
      altText: 'A strip of modafinil (Modawake)',
      title: 'modawake'
    },
    variations: [
      {
        id: 'variation-210',
        databaseId: 210,
        name: 'Modawake - 30',
        price: '$90.00',
        regularPrice: '$90.00',
        salePrice: null,
        stockStatus: 'IN_STOCK',
        attributes: [
          {
            name: 'tablets',
            value: '30'
          }
        ]
      },
      {
        id: 'variation-211',
        databaseId: 211,
        name: 'Modawake - 50',
        price: '$140.00',
        regularPrice: '$140.00',
        salePrice: null,
        stockStatus: 'IN_STOCK',
        attributes: [
          {
            name: 'tablets',
            value: '50'
          }
        ]
      },
      {
        id: 'variation-212',
        databaseId: 212,
        name: 'Modawake - 100',
        price: '$225.00',
        regularPrice: '$225.00',
        salePrice: null,
        stockStatus: 'IN_STOCK',
        attributes: [
          {
            name: 'tablets',
            value: '100'
          }
        ]
      }
    ]
  },
  {
    id: 'product-1641',
    databaseId: 1641,
    name: 'Modasmart 400mg',
    slug: 'modasmart-400mg',
    type: 'VARIABLE',
    price: '$130.00 - $290.00',
    rawPrice: '130.00, 180.00, 290.00',
    regularPrice: '$130.00 - $290.00',
    rawRegularPrice: '130.00, 180.00, 290.00',
    salePrice: null,
    rawSalePrice: null,
    stockStatus: 'IN_STOCK',
    onSale: false,
    shortDescription: 'Premium quality Modafinil 400mg tablets.',
    description: '<p>Modasmart 400mg is a high-potency modafinil product for enhanced cognitive performance.</p>',
    averageRating: 5,
    reviewCount: 0,
    image: {
      sourceUrl: 'https://modaprimeusa.com/wp-content/uploads/2024/04/msmart_translu_lg.png',
      altText: 'Modasmart 400mg',
      title: 'msmart_translu_lg'
    },
    variations: [
      {
        id: 'variation-1642',
        databaseId: 1642,
        name: 'Modasmart 400mg - 30',
        price: '$130.00',
        regularPrice: '$130.00',
        salePrice: null,
        stockStatus: 'IN_STOCK',
        attributes: [
          {
            name: 'tablets',
            value: '30'
          }
        ],
        image: {
          sourceUrl: 'https://modaprimeusa.com/wp-content/uploads/2024/04/msmart_translu_lg-175x175.png',
          altText: 'Modasmart 400mg',
          title: 'msmart_translu_lg'
        }
      },
      {
        id: 'variation-1643',
        databaseId: 1643,
        name: 'Modasmart 400mg - 50',
        price: '$180.00',
        regularPrice: '$180.00',
        salePrice: null,
        stockStatus: 'IN_STOCK',
        attributes: [
          {
            name: 'tablets',
            value: '50'
          }
        ]
      },
      {
        id: 'variation-1644',
        databaseId: 1644,
        name: 'Modasmart 400mg - 100',
        price: '$290.00',
        regularPrice: '$290.00',
        salePrice: null,
        stockStatus: 'IN_STOCK',
        attributes: [
          {
            name: 'tablets',
            value: '100'
          }
        ]
      }
    ]
  }
];

export const fallbackCategories = [
  {
    id: 'category-1',
    databaseId: 1,
    name: 'Nootropics',
    slug: 'nootropics',
    count: 2
  },
  {
    id: 'category-2',
    databaseId: 2,
    name: 'High Potency',
    slug: 'high-potency',
    count: 1
  }
];

export const fallbackPaymentGateways = [
  {
    id: 'cod',
    title: 'Bitcoin',
    description: 'Pay using Bitcoin'
  },
  {
    id: 'btcpaygf_default',
    title: 'Auto Verify BTC (Coming Soon)',
    description: 'You will be redirected to complete your purchase.'
  },
  {
    id: 'btcpay',
    title: 'BTC Pay',
    description: 'Pay with Bitcoin via BTCPay Server.'
  }
];

export const fallbackShippingMethods = [
  {
    id: 'free_shipping:1',
    title: 'Free shipping',
    description: 'Free worldwide shipping',
    cost: '0.00'
  }
];

export default {
  products: fallbackProducts,
  categories: fallbackCategories,
  paymentGateways: fallbackPaymentGateways,
  shippingMethods: fallbackShippingMethods
}; 
