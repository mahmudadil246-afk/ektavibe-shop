import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  User, 
  Package, 
  Heart, 
  MapPin, 
  RotateCcw, 
  Shield, 
  LogOut,
  Bell
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";
import AccountDashboard from "@/components/account/AccountDashboard";
import AccountProfile from "@/components/account/AccountProfile";
import AccountOrders from "@/components/account/AccountOrders";
import AccountWishlist from "@/components/account/AccountWishlist";
import AccountAddresses from "@/components/account/AccountAddresses";
import AccountReturns from "@/components/account/AccountReturns";
import AccountSecurity from "@/components/account/AccountSecurity";
import AccountNotifications from "@/components/account/AccountNotifications";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Account = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLogin, setIsLogin] = useState(true);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { items: wishlistItems } = useWishlist();
  const userName = "Rahim";

  // Check for tab preference from header navigation
  useEffect(() => {
    const savedTab = sessionStorage.getItem("account_tab");
    if (savedTab) {
      setActiveTab(savedTab);
      sessionStorage.removeItem("account_tab");
    }
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    toast.success(isLogin ? "Welcome back!" : "Account created successfully!");
  };

  const handleLogout = (allDevices = false) => {
    setIsLoggedIn(false);
    setShowLogoutDialog(false);
    toast.success(allDevices ? "Logged out from all devices" : "Signed out successfully");
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "Orders", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart, count: wishlistItems.length },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "returns", label: "Returns & Refunds", icon: RotateCcw },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
  ];

  if (!isLoggedIn) {
    return (
      <Layout>
        <section className="section-padding">
          <div className="container-wide max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h1 className="heading-section mb-2">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="text-muted-foreground">
                {isLogin
                  ? "Sign in to access your account"
                  : "Join ektA for exclusive benefits"}
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              onSubmit={handleAuth}
              className="space-y-6"
            >
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-secondary border-none px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent rounded-md"
                    placeholder="Your name"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  required
                  className="w-full bg-secondary border-none px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent rounded-md"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  required
                  className="w-full bg-secondary border-none px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent rounded-md"
                  placeholder="••••••••"
                />
              </div>
              {isLogin && (
                <div className="flex justify-end">
                  <button type="button" className="text-sm text-accent link-underline">
                    Forgot password?
                  </button>
                </div>
              )}
              <button type="submit" className="btn-primary w-full">
                {isLogin ? "Sign In" : "Create Account"}
              </button>
            </motion.form>

            <p className="text-center mt-8 text-sm text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-accent link-underline"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </section>
      </Layout>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AccountDashboard onTabChange={setActiveTab} userName={userName} />;
      case 'profile':
        return <AccountProfile userName={userName} onLogout={() => handleLogout()} />;
      case 'orders':
        return <AccountOrders />;
      case 'wishlist':
        return <AccountWishlist />;
      case 'addresses':
        return <AccountAddresses />;
      case 'returns':
        return <AccountReturns />;
      case 'notifications':
        return <AccountNotifications />;
      case 'security':
        return <AccountSecurity onLogout={() => handleLogout()} />;
      default:
        return <AccountDashboard onTabChange={setActiveTab} userName={userName} />;
    }
  };

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-wide max-w-6xl mx-auto">
          <h1 className="heading-section mb-8">My Account</h1>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <nav className="space-y-1 sticky top-24">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-sm text-left transition-colors rounded-lg ${
                      activeTab === tab.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-secondary"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <tab.icon className="w-4 h-4" />
                      <span className="hidden sm:inline lg:inline">{tab.label}</span>
                    </span>
                    {tab.count !== undefined && tab.count > 0 && (
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        activeTab === tab.id 
                          ? "bg-primary-foreground/20" 
                          : "bg-accent text-accent-foreground"
                      }`}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
                
                {/* Sign Out Button */}
                <button
                  onClick={() => setShowLogoutDialog(true)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left text-destructive hover:bg-destructive/10 transition-colors rounded-lg mt-4"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline lg:inline">Sign Out</span>
                </button>
              </nav>
            </div>

            {/* Content */}
            <div className="lg:col-span-4">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-secondary rounded-lg p-6"
              >
                {renderTabContent()}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sign Out</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to sign out of your account?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <button
              onClick={() => handleLogout(true)}
              className="btn-outline text-sm"
            >
              Logout All Devices
            </button>
            <AlertDialogAction onClick={() => handleLogout(false)}>
              Sign Out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default Account;
