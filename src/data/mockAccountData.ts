// Mock data for account sections

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
  items: {
    id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
    size: string;
    color: string;
  }[];
  total: number;
  shippingAddress: string;
  paymentMethod: string;
  trackingNumber?: string;
}

export interface Address {
  id: string;
  label: 'home' | 'office' | 'other';
  fullName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  isDefault: boolean;
  deliveryInstructions?: string;
}

export interface ReturnRequest {
  id: string;
  orderId: string;
  productName: string;
  productImage: string;
  reason: string;
  status: 'requested' | 'approved' | 'picked' | 'received' | 'refunded';
  requestDate: string;
  refundAmount?: number;
  refundMethod?: string;
  transactionId?: string;
}

export interface LoginHistory {
  id: string;
  device: string;
  browser: string;
  location: string;
  date: string;
  isCurrent: boolean;
}

export interface Notification {
  id: string;
  type: 'order' | 'promo' | 'security' | 'wishlist';
  message: string;
  date: string;
  isRead: boolean;
}

export const mockOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    date: '2024-01-15',
    status: 'delivered',
    items: [
      { id: 1, name: 'Cotton Saree - Royal Blue', image: '/placeholder.svg', price: 2500, quantity: 1, size: 'Free Size', color: 'Royal Blue' },
      { id: 2, name: 'Silk Dupatta', image: '/placeholder.svg', price: 800, quantity: 2, size: 'Free Size', color: 'Gold' }
    ],
    total: 4100,
    shippingAddress: '123 Gulshan Avenue, Dhaka 1212',
    paymentMethod: 'bKash',
    trackingNumber: 'TRK123456789'
  },
  {
    id: 'ORD-2024-002',
    date: '2024-01-20',
    status: 'shipped',
    items: [
      { id: 3, name: 'Embroidered Kurta', image: '/placeholder.svg', price: 1800, quantity: 1, size: 'M', color: 'Maroon' }
    ],
    total: 1800,
    shippingAddress: '45 Dhanmondi R/A, Dhaka 1205',
    paymentMethod: 'Card',
    trackingNumber: 'TRK987654321'
  },
  {
    id: 'ORD-2024-003',
    date: '2024-01-22',
    status: 'pending',
    items: [
      { id: 4, name: 'Baby Romper Set', image: '/placeholder.svg', price: 650, quantity: 2, size: '6-12M', color: 'Pink' },
      { id: 5, name: 'Kids Cotton Dress', image: '/placeholder.svg', price: 950, quantity: 1, size: '2-3Y', color: 'Yellow' }
    ],
    total: 2250,
    shippingAddress: '78 Uttara Sector 7, Dhaka 1230',
    paymentMethod: 'Cash on Delivery'
  },
  {
    id: 'ORD-2024-004',
    date: '2024-01-10',
    status: 'cancelled',
    items: [
      { id: 6, name: 'Formal Blazer', image: '/placeholder.svg', price: 3500, quantity: 1, size: 'L', color: 'Navy' }
    ],
    total: 3500,
    shippingAddress: '123 Gulshan Avenue, Dhaka 1212',
    paymentMethod: 'Card'
  },
  {
    id: 'ORD-2024-005',
    date: '2024-01-08',
    status: 'returned',
    items: [
      { id: 7, name: 'Designer Lehenga', image: '/placeholder.svg', price: 8500, quantity: 1, size: 'S', color: 'Red' }
    ],
    total: 8500,
    shippingAddress: '45 Dhanmondi R/A, Dhaka 1205',
    paymentMethod: 'bKash'
  }
];

export const mockAddresses: Address[] = [
  {
    id: 'addr-1',
    label: 'home',
    fullName: 'Rahim Khan',
    phone: '+880 1712-345678',
    address: '123 Gulshan Avenue, House 45',
    city: 'Dhaka',
    postalCode: '1212',
    isDefault: true,
    deliveryInstructions: 'Ring the doorbell twice'
  },
  {
    id: 'addr-2',
    label: 'office',
    fullName: 'Rahim Khan',
    phone: '+880 1812-345678',
    address: '78 Motijheel Commercial Area, Floor 5',
    city: 'Dhaka',
    postalCode: '1000',
    isDefault: false
  }
];

export const mockReturns: ReturnRequest[] = [
  {
    id: 'RET-001',
    orderId: 'ORD-2024-005',
    productName: 'Designer Lehenga',
    productImage: '/placeholder.svg',
    reason: 'Size too small',
    status: 'refunded',
    requestDate: '2024-01-09',
    refundAmount: 8500,
    refundMethod: 'bKash',
    transactionId: 'TXN789456123'
  },
  {
    id: 'RET-002',
    orderId: 'ORD-2024-002',
    productName: 'Embroidered Kurta',
    productImage: '/placeholder.svg',
    reason: 'Color different from image',
    status: 'approved',
    requestDate: '2024-01-21'
  }
];

export const mockLoginHistory: LoginHistory[] = [
  {
    id: 'login-1',
    device: 'iPhone 14 Pro',
    browser: 'Safari',
    location: 'Dhaka, Bangladesh',
    date: '2024-01-24 14:30',
    isCurrent: true
  },
  {
    id: 'login-2',
    device: 'Windows PC',
    browser: 'Chrome',
    location: 'Dhaka, Bangladesh',
    date: '2024-01-23 09:15',
    isCurrent: false
  },
  {
    id: 'login-3',
    device: 'MacBook Pro',
    browser: 'Firefox',
    location: 'Chittagong, Bangladesh',
    date: '2024-01-20 18:45',
    isCurrent: false
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'order',
    message: 'Your order ORD-2024-002 has been shipped!',
    date: '2024-01-20',
    isRead: false
  },
  {
    id: 'notif-2',
    type: 'promo',
    message: '🎉 Flash Sale! 50% off on selected items',
    date: '2024-01-19',
    isRead: false
  },
  {
    id: 'notif-3',
    type: 'wishlist',
    message: 'Price dropped on Cotton Saree in your wishlist!',
    date: '2024-01-18',
    isRead: true
  },
  {
    id: 'notif-4',
    type: 'security',
    message: 'New login detected from iPhone 14 Pro',
    date: '2024-01-24',
    isRead: false
  }
];
