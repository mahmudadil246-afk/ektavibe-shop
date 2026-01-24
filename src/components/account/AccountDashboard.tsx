import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Package, 
  Heart, 
  MapPin, 
  RotateCcw, 
  Shield, 
  Bell, 
  ChevronRight,
  Clock,
  Truck,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { mockOrders, mockAddresses, mockReturns, mockNotifications } from "@/data/mockAccountData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface AccountDashboardProps {
  onTabChange: (tab: string) => void;
  userName: string;
}

const AccountDashboard = ({ onTabChange, userName }: AccountDashboardProps) => {
  const { items: wishlistItems } = useWishlist();

  const recentOrders = mockOrders.slice(0, 3);
  const pendingCount = mockOrders.filter(o => o.status === 'pending' || o.status === 'processing').length;
  const shippedCount = mockOrders.filter(o => o.status === 'shipped').length;
  const deliveredCount = mockOrders.filter(o => o.status === 'delivered').length;
  const activeReturns = mockReturns.filter(r => r.status !== 'refunded').length;
  const unreadNotifications = mockNotifications.filter(n => !n.isRead);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
      case 'processing':
        return 'bg-yellow-500/10 text-yellow-600';
      case 'shipped':
        return 'bg-blue-500/10 text-blue-600';
      case 'delivered':
        return 'bg-green-500/10 text-green-600';
      case 'cancelled':
        return 'bg-destructive/10 text-destructive';
      case 'returned':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
      case 'processing':
        return Clock;
      case 'shipped':
        return Truck;
      case 'delivered':
        return CheckCircle;
      default:
        return Package;
    }
  };

  const statCards = [
    { 
      label: 'Pending', 
      value: pendingCount, 
      icon: Clock, 
      color: 'text-yellow-600',
      bg: 'bg-yellow-500/10'
    },
    { 
      label: 'Shipped', 
      value: shippedCount, 
      icon: Truck, 
      color: 'text-blue-600',
      bg: 'bg-blue-500/10'
    },
    { 
      label: 'Delivered', 
      value: deliveredCount, 
      icon: CheckCircle, 
      color: 'text-green-600',
      bg: 'bg-green-500/10'
    },
  ];

  const quickLinks = [
    { label: 'View All Orders', tab: 'orders', icon: Package },
    { label: 'Edit Profile', tab: 'profile', icon: Shield },
    { label: 'Manage Addresses', tab: 'addresses', icon: MapPin },
    { label: 'View Wishlist', tab: 'wishlist', icon: Heart },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 p-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg"
      >
        <Avatar className="w-16 h-16 border-2 border-primary/20">
          <AvatarImage src="/placeholder.svg" alt={userName} />
          <AvatarFallback className="text-lg font-serif">{userName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-serif text-2xl">স্বাগতম, {userName}!</h2>
          <p className="text-muted-foreground text-sm">Welcome back to your ektA account</p>
        </div>
      </motion.div>

      {/* Order Status Cards */}
      <div className="grid grid-cols-3 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-lg ${stat.bg} text-center cursor-pointer hover:scale-105 transition-transform`}
            onClick={() => onTabChange('orders')}
          >
            <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-secondary rounded-lg cursor-pointer hover:bg-secondary/80 transition-colors"
          onClick={() => onTabChange('wishlist')}
        >
          <Heart className="w-5 h-5 text-accent mb-2" />
          <p className="text-2xl font-bold">{wishlistItems.length}</p>
          <p className="text-xs text-muted-foreground">Wishlist Items</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="p-4 bg-secondary rounded-lg cursor-pointer hover:bg-secondary/80 transition-colors"
          onClick={() => onTabChange('addresses')}
        >
          <MapPin className="w-5 h-5 text-accent mb-2" />
          <p className="text-2xl font-bold">{mockAddresses.length}</p>
          <p className="text-xs text-muted-foreground">Saved Addresses</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="p-4 bg-secondary rounded-lg cursor-pointer hover:bg-secondary/80 transition-colors"
          onClick={() => onTabChange('returns')}
        >
          <RotateCcw className="w-5 h-5 text-accent mb-2" />
          <p className="text-2xl font-bold">{activeReturns}</p>
          <p className="text-xs text-muted-foreground">Active Returns</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="p-4 bg-secondary rounded-lg relative"
        >
          <Bell className="w-5 h-5 text-accent mb-2" />
          <p className="text-2xl font-bold">{unreadNotifications.length}</p>
          <p className="text-xs text-muted-foreground">New Alerts</p>
          {unreadNotifications.length > 0 && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full animate-pulse" />
          )}
        </motion.div>
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-secondary rounded-lg p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-lg">Recent Orders</h3>
          <button 
            onClick={() => onTabChange('orders')}
            className="text-sm text-accent hover:underline flex items-center gap-1"
          >
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3">
          {recentOrders.map((order) => {
            const StatusIcon = getStatusIcon(order.status);
            return (
              <div
                key={order.id}
                className="flex items-center justify-between p-3 bg-background rounded-lg hover:bg-background/80 transition-colors cursor-pointer"
                onClick={() => onTabChange('orders')}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-muted rounded overflow-hidden">
                    <img 
                      src={order.items[0]?.image || '/placeholder.svg'} 
                      alt={order.items[0]?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{order.id}</p>
                    <p className="text-xs text-muted-foreground">
                      {order.items.length} item{order.items.length > 1 ? 's' : ''} • ৳{order.total}
                    </p>
                  </div>
                </div>
                <Badge className={`${getStatusColor(order.status)} border-none capitalize`}>
                  <StatusIcon className="w-3 h-3 mr-1" />
                  {order.status}
                </Badge>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Notifications Preview */}
      {unreadNotifications.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-secondary rounded-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-lg">Notifications</h3>
            <Badge variant="secondary">{unreadNotifications.length} new</Badge>
          </div>
          <div className="space-y-2">
            {unreadNotifications.slice(0, 3).map((notif) => (
              <div
                key={notif.id}
                className="flex items-start gap-3 p-3 bg-background rounded-lg"
              >
                {notif.type === 'security' && <AlertCircle className="w-4 h-4 text-destructive mt-0.5" />}
                {notif.type === 'order' && <Package className="w-4 h-4 text-blue-600 mt-0.5" />}
                {notif.type === 'wishlist' && <Heart className="w-4 h-4 text-accent mt-0.5" />}
                {notif.type === 'promo' && <Bell className="w-4 h-4 text-yellow-600 mt-0.5" />}
                <div className="flex-1">
                  <p className="text-sm">{notif.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notif.date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 gap-3"
      >
        {quickLinks.map((link) => (
          <button
            key={link.tab}
            onClick={() => onTabChange(link.tab)}
            className="flex items-center gap-3 p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors text-left"
          >
            <link.icon className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium">{link.label}</span>
            <ChevronRight className="w-4 h-4 ml-auto text-muted-foreground" />
          </button>
        ))}
      </motion.div>
    </div>
  );
};

export default AccountDashboard;
