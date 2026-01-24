import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Bell, 
  BellRing,
  Package, 
  TrendingDown, 
  Shield, 
  Mail,
  Settings,
  Check,
  X,
  Smartphone,
  AlertCircle
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { usePushNotifications } from "@/hooks/usePushNotifications";
interface NotificationPreference {
  id: string;
  category: string;
  icon: React.ElementType;
  title: string;
  description: string;
  emailEnabled: boolean;
  frequency: 'instant' | 'daily' | 'weekly' | 'never';
}

const defaultPreferences: NotificationPreference[] = [
  {
    id: 'order_updates',
    category: 'orders',
    icon: Package,
    title: 'Order Updates',
    description: 'Get notified about order confirmations, shipping updates, and delivery status',
    emailEnabled: true,
    frequency: 'instant'
  },
  {
    id: 'price_drops',
    category: 'wishlist',
    icon: TrendingDown,
    title: 'Price Drop Alerts',
    description: 'Receive alerts when items in your wishlist go on sale',
    emailEnabled: true,
    frequency: 'instant'
  },
  {
    id: 'back_in_stock',
    category: 'wishlist',
    icon: Bell,
    title: 'Back in Stock',
    description: 'Get notified when out-of-stock wishlist items become available',
    emailEnabled: true,
    frequency: 'instant'
  },
  {
    id: 'security_alerts',
    category: 'security',
    icon: Shield,
    title: 'Security Alerts',
    description: 'Important alerts about new logins, password changes, and suspicious activity',
    emailEnabled: true,
    frequency: 'instant'
  },
  {
    id: 'promotions',
    category: 'marketing',
    icon: Mail,
    title: 'Promotions & Offers',
    description: 'Exclusive deals, seasonal sales, and special offers',
    emailEnabled: false,
    frequency: 'weekly'
  }
];

const AccountNotifications = () => {
  const [preferences, setPreferences] = useState<NotificationPreference[]>(defaultPreferences);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const { permission, isSubscribed, requestPermission, unsubscribe, sendTestNotification, isSupported } = usePushNotifications();

  const handlePushToggle = async () => {
    if (isSubscribed) {
      unsubscribe();
      toast.success("Push notifications disabled");
    } else {
      const granted = await requestPermission();
      if (granted) {
        toast.success("Push notifications enabled!");
      } else if (permission === 'denied') {
        toast.error("Notifications blocked. Please enable in browser settings.");
      }
    }
    setHasChanges(true);
  };

  const handleTestPush = () => {
    sendTestNotification("Test Notification 🛍️", "This is how your notifications will appear!");
  };
  const updatePreference = (id: string, updates: Partial<NotificationPreference>) => {
    setPreferences(prev => 
      prev.map(pref => 
        pref.id === id ? { ...pref, ...updates } : pref
      )
    );
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setHasChanges(false);
    toast.success("Notification preferences saved!");
  };

  const enableAll = () => {
    setPreferences(prev => prev.map(pref => ({ ...pref, emailEnabled: true })));
    setHasChanges(true);
  };

  const disableAll = () => {
    setPreferences(prev => prev.map(pref => ({ ...pref, emailEnabled: false })));
    setHasChanges(true);
  };

  const groupedPreferences = {
    orders: preferences.filter(p => p.category === 'orders'),
    wishlist: preferences.filter(p => p.category === 'wishlist'),
    security: preferences.filter(p => p.category === 'security'),
    marketing: preferences.filter(p => p.category === 'marketing'),
  };

  const categoryLabels: Record<string, string> = {
    orders: 'Order Notifications',
    wishlist: 'Wishlist Alerts',
    security: 'Security & Account',
    marketing: 'Marketing & Promotions'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h2 className="font-serif text-2xl mb-1">Notification Preferences</h2>
          <p className="text-muted-foreground text-sm">
            Manage how and when you receive updates
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={enableAll}>
            <Check className="w-4 h-4 mr-1" />
            Enable All
          </Button>
          <Button variant="outline" size="sm" onClick={disableAll}>
            <X className="w-4 h-4 mr-1" />
            Disable All
          </Button>
        </div>
      </motion.div>

      {/* Push Notifications Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 rounded-lg p-6"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 bg-accent/20 rounded-xl">
            <BellRing className="w-6 h-6 text-accent" />
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium">Browser Push Notifications</h3>
                  {isSubscribed && (
                    <Badge className="bg-accent/20 text-accent border-0 text-xs">Active</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Receive real-time alerts even when you're not on the site
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                {isSupported ? (
                  <>
                    <Switch
                      checked={isSubscribed}
                      onCheckedChange={handlePushToggle}
                      disabled={permission === 'denied'}
                    />
                    {isSubscribed && (
                      <Button variant="outline" size="sm" onClick={handleTestPush}>
                        <Smartphone className="w-4 h-4 mr-1" />
                        Test
                      </Button>
                    )}
                  </>
                ) : (
                  <Badge variant="secondary" className="text-xs">
                    Not supported
                  </Badge>
                )}
              </div>
            </div>
            
            {permission === 'denied' && (
              <div className="flex items-center gap-2 mt-3 p-3 bg-destructive/10 rounded-lg text-sm text-destructive">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>
                  Notifications are blocked. Please enable them in your browser settings.
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Email Section Header */}
      <div className="flex items-center gap-2">
        <Mail className="w-4 h-4 text-muted-foreground" />
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Email Notifications
        </h3>
      </div>

      {/* Notification Categories */}
      {Object.entries(groupedPreferences).map(([category, prefs], categoryIndex) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: categoryIndex * 0.1 }}
          className="bg-secondary rounded-lg p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <h3 className="font-medium">{categoryLabels[category]}</h3>
            <Badge variant="secondary" className="text-xs">
              {prefs.filter(p => p.emailEnabled).length}/{prefs.length} enabled
            </Badge>
          </div>
          
          <div className="space-y-4">
            {prefs.map((pref, index) => (
              <div key={pref.id}>
                {index > 0 && <Separator className="my-4" />}
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-background rounded-lg">
                    <pref.icon className="w-5 h-5 text-accent" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{pref.title}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      {pref.description}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Email</span>
                        <Switch
                          checked={pref.emailEnabled}
                          onCheckedChange={(checked) => 
                            updatePreference(pref.id, { emailEnabled: checked })
                          }
                        />
                      </div>
                      
                      {pref.emailEnabled && (
                        <Select
                          value={pref.frequency}
                          onValueChange={(value: NotificationPreference['frequency']) =>
                            updatePreference(pref.id, { frequency: value })
                          }
                        >
                          <SelectTrigger className="w-32 h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="instant">Instant</SelectItem>
                            <SelectItem value="daily">Daily Digest</SelectItem>
                            <SelectItem value="weekly">Weekly Digest</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Email Summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-accent/10 rounded-lg p-6"
      >
        <div className="flex items-start gap-3">
          <Settings className="w-5 h-5 text-accent mt-0.5" />
          <div>
            <h4 className="font-medium mb-1">Email Delivery Settings</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Emails will be sent to your registered email address. 
              Instant notifications are sent immediately, while digests 
              compile multiple updates into a single email.
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              <Badge variant="outline">
                {preferences.filter(p => p.emailEnabled && p.frequency === 'instant').length} instant
              </Badge>
              <Badge variant="outline">
                {preferences.filter(p => p.emailEnabled && p.frequency === 'daily').length} daily digest
              </Badge>
              <Badge variant="outline">
                {preferences.filter(p => p.emailEnabled && p.frequency === 'weekly').length} weekly digest
              </Badge>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Save Button */}
      {hasChanges && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky bottom-4 flex justify-end"
        >
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="shadow-lg"
          >
            {isSaving ? "Saving..." : "Save Preferences"}
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default AccountNotifications;
