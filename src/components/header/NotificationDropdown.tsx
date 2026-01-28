import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Package, Tag, Shield, Heart, Check, X, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { mockNotifications, Notification } from "@/data/mockAccountData";

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

type FilterType = 'all' | 'order' | 'promo' | 'security' | 'wishlist';

const NotificationDropdown = ({ isOpen, onClose, onToggle }: NotificationDropdownProps) => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.isRead).length;
  
  const filteredNotifications = activeFilter === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === activeFilter);

  const filterOptions: { value: FilterType; label: string; icon: React.ElementType }[] = [
    { value: 'all', label: 'All', icon: Bell },
    { value: 'order', label: 'Orders', icon: Package },
    { value: 'wishlist', label: 'Wishlist', icon: Heart },
    { value: 'security', label: 'Security', icon: Shield },
    { value: 'promo', label: 'Promos', icon: Tag },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'order':
        return <Package className="w-4 h-4" />;
      case 'promo':
        return <Tag className="w-4 h-4" />;
      case 'security':
        return <Shield className="w-4 h-4" />;
      case 'wishlist':
        return <Heart className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'order':
        return "bg-blue-500/10 text-blue-600";
      case 'promo':
        return "bg-green-500/10 text-green-600";
      case 'security':
        return "bg-red-500/10 text-red-600";
      case 'wishlist':
        return "bg-pink-500/10 text-pink-600";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const markAsRead = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setActiveFilter('all');
  };

  const removeNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={onToggle}
        className={`p-2 transition-colors relative ${isOpen ? "text-accent" : "hover:text-accent"}`}
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-80 md:w-96 bg-background border border-border rounded-lg shadow-xl overflow-hidden z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/50">
              <h3 className="font-medium text-sm">Notifications</h3>
              <div className="flex items-center gap-3">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-accent hover:underline"
                  >
                    Mark all as read
                  </button>
                )}
                {notifications.length > 0 && (
                  <button
                    onClick={clearAllNotifications}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors"
                    title="Clear all notifications"
                  >
                    <Trash2 className="w-3 h-3" />
                    Clear all
                  </button>
                )}
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-1 px-3 py-2 border-b border-border overflow-x-auto">
              {filterOptions.map((filter) => {
                const Icon = filter.icon;
                const count = filter.value === 'all' 
                  ? notifications.length 
                  : notifications.filter(n => n.type === filter.value).length;
                return (
                  <button
                    key={filter.value}
                    onClick={() => setActiveFilter(filter.value)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs whitespace-nowrap transition-colors ${
                      activeFilter === filter.value
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-secondary hover:bg-secondary/80 text-muted-foreground'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    {filter.label}
                    {count > 0 && (
                      <span className={`text-[10px] ${activeFilter === filter.value ? 'opacity-80' : ''}`}>
                        ({count})
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Notification List */}
            <div className="max-h-[350px] overflow-y-auto">
              {filteredNotifications.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground">
                  <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No {activeFilter === 'all' ? '' : activeFilter} notifications</p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {filteredNotifications.slice(0, 10).map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 hover:bg-secondary/50 transition-colors cursor-pointer relative group ${
                        !notification.isRead ? "bg-accent/5" : ""
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className={`p-2 rounded-full shrink-0 ${getNotificationColor(notification.type)}`}>
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm ${!notification.isRead ? "font-medium" : ""}`}>
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.date}
                          </p>
                        </div>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-accent rounded-full shrink-0 mt-2" />
                        )}
                      </div>
                      
                      {/* Action buttons on hover */}
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 hidden group-hover:flex gap-1">
                        {!notification.isRead && (
                          <button
                            onClick={(e) => markAsRead(notification.id, e)}
                            className="p-1.5 bg-background border border-border rounded-md hover:bg-secondary"
                            title="Mark as read"
                          >
                            <Check className="w-3 h-3" />
                          </button>
                        )}
                        <button
                          onClick={(e) => removeNotification(notification.id, e)}
                          className="p-1.5 bg-background border border-border rounded-md hover:bg-destructive/10 hover:text-destructive"
                          title="Remove"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-border bg-secondary/50">
              <Link
                to="/account"
                onClick={() => {
                  sessionStorage.setItem("account_tab", "notifications");
                  onClose();
                }}
                className="block text-center text-sm text-accent hover:underline"
              >
                View all notifications
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationDropdown;
