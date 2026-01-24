import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Package, 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp,
  Truck,
  Clock,
  CheckCircle,
  XCircle,
  RotateCcw,
  Download,
  RefreshCw,
  Star,
  MapPin,
  CreditCard
} from "lucide-react";
import { mockOrders, Order } from "@/data/mockAccountData";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type OrderStatus = 'all' | 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';

const AccountOrders = () => {
  const [filter, setFilter] = useState<OrderStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const filteredOrders = mockOrders.filter(order => {
    const matchesFilter = filter === 'all' || order.status === filter;
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const statusFilters: { value: OrderStatus; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: mockOrders.length },
    { value: 'pending', label: 'Pending', count: mockOrders.filter(o => o.status === 'pending').length },
    { value: 'shipped', label: 'Shipped', count: mockOrders.filter(o => o.status === 'shipped').length },
    { value: 'delivered', label: 'Delivered', count: mockOrders.filter(o => o.status === 'delivered').length },
    { value: 'cancelled', label: 'Cancelled', count: mockOrders.filter(o => o.status === 'cancelled').length },
    { value: 'returned', label: 'Returned', count: mockOrders.filter(o => o.status === 'returned').length },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
      case 'processing':
        return { icon: Clock, color: 'bg-yellow-500/10 text-yellow-600', label: 'Pending' };
      case 'shipped':
        return { icon: Truck, color: 'bg-blue-500/10 text-blue-600', label: 'Shipped' };
      case 'delivered':
        return { icon: CheckCircle, color: 'bg-green-500/10 text-green-600', label: 'Delivered' };
      case 'cancelled':
        return { icon: XCircle, color: 'bg-destructive/10 text-destructive', label: 'Cancelled' };
      case 'returned':
        return { icon: RotateCcw, color: 'bg-muted text-muted-foreground', label: 'Returned' };
      default:
        return { icon: Package, color: 'bg-muted text-muted-foreground', label: status };
    }
  };

  const handleCancelOrder = (orderId: string) => {
    toast.success(`Order ${orderId} cancellation requested`);
  };

  const handleReorder = (order: Order) => {
    toast.success("Items added to cart");
  };

  const handleDownloadInvoice = (orderId: string) => {
    toast.success(`Downloading invoice for ${orderId}`);
  };

  const handleTrackShipment = (trackingNumber: string) => {
    toast.info(`Tracking: ${trackingNumber}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-xl">My Orders</h2>
        <span className="text-sm text-muted-foreground">{mockOrders.length} orders</span>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by order ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-accent rounded-md"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {statusFilters.map((status) => (
          <button
            key={status.value}
            onClick={() => setFilter(status.value)}
            className={`px-4 py-2 text-sm rounded-full transition-colors ${
              filter === status.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary hover:bg-secondary/80'
            }`}
          >
            {status.label}
            {status.count > 0 && (
              <span className="ml-1 opacity-70">({status.count})</span>
            )}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12 bg-secondary rounded-lg">
            <Package className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground">No orders found</p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const statusConfig = getStatusConfig(order.status);
            const isExpanded = expandedOrder === order.id;

            return (
              <motion.div
                key={order.id}
                layout
                className="bg-background border border-border rounded-lg overflow-hidden"
              >
                {/* Order Header */}
                <div 
                  className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{order.id}</span>
                      <Badge className={`${statusConfig.color} border-none`}>
                        <statusConfig.icon className="w-3 h-3 mr-1" />
                        {statusConfig.label}
                      </Badge>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{order.date}</span>
                    <span className="font-medium text-foreground">৳{order.total}</span>
                  </div>
                  <div className="flex gap-2 mt-2 overflow-x-auto">
                    {order.items.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="w-12 h-12 bg-muted rounded flex-shrink-0 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="w-12 h-12 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-border"
                    >
                      <div className="p-4 space-y-6">
                        {/* Order Items */}
                        <div>
                          <h4 className="text-sm font-medium mb-3">Order Items</h4>
                          <div className="space-y-3">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-4">
                                <div className="w-16 h-20 bg-muted rounded overflow-hidden">
                                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium text-sm">{item.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                                  </p>
                                  <p className="text-sm mt-1">৳{item.price}</p>
                                </div>
                                {order.status === 'delivered' && (
                                  <button className="flex items-center gap-1 text-xs text-accent hover:underline">
                                    <Star className="w-3 h-3" /> Review
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Order Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                          <div className="space-y-2">
                            <div className="flex items-start gap-2">
                              <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                              <div>
                                <p className="font-medium">Delivery Address</p>
                                <p className="text-muted-foreground">{order.shippingAddress}</p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-start gap-2">
                              <CreditCard className="w-4 h-4 text-muted-foreground mt-0.5" />
                              <div>
                                <p className="font-medium">Payment Method</p>
                                <p className="text-muted-foreground">{order.paymentMethod}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Price Breakdown */}
                        <div className="bg-muted/50 p-3 rounded-lg text-sm">
                          <div className="flex justify-between mb-1">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>৳{order.total - 60}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="text-muted-foreground">Shipping</span>
                            <span>৳60</span>
                          </div>
                          <div className="flex justify-between font-medium pt-2 border-t border-border">
                            <span>Total</span>
                            <span>৳{order.total}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-2">
                          {order.trackingNumber && order.status === 'shipped' && (
                            <button 
                              onClick={() => handleTrackShipment(order.trackingNumber!)}
                              className="btn-outline text-sm py-2 px-4"
                            >
                              <Truck className="w-4 h-4 mr-2" />
                              Track Shipment
                            </button>
                          )}
                          <button 
                            onClick={() => handleDownloadInvoice(order.id)}
                            className="btn-outline text-sm py-2 px-4"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download Invoice
                          </button>
                          {order.status === 'pending' && (
                            <button 
                              onClick={() => handleCancelOrder(order.id)}
                              className="btn-outline text-sm py-2 px-4 text-destructive border-destructive hover:bg-destructive/10"
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Cancel Order
                            </button>
                          )}
                          {(order.status === 'delivered' || order.status === 'cancelled') && (
                            <button 
                              onClick={() => handleReorder(order)}
                              className="btn-primary text-sm py-2 px-4"
                            >
                              <RefreshCw className="w-4 h-4 mr-2" />
                              Reorder
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AccountOrders;
