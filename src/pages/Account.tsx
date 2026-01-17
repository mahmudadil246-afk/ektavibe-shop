import { useState } from "react";
import { motion } from "framer-motion";
import { User, Package, Heart, MapPin, LogOut } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";

const Account = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    toast.success(isLogin ? "Welcome back!" : "Account created successfully!");
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "Orders", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "addresses", label: "Addresses", icon: MapPin },
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
                    className="w-full bg-secondary border-none px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                    placeholder="Your name"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  required
                  className="w-full bg-secondary border-none px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  required
                  className="w-full bg-secondary border-none px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
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

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-wide max-w-5xl mx-auto">
          <h1 className="heading-section mb-8">My Account</h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors ${
                      activeTab === tab.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-secondary"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    toast.success("Signed out successfully");
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left text-destructive hover:bg-secondary transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </nav>
            </div>

            {/* Content */}
            <div className="md:col-span-3">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-secondary p-6"
              >
                {activeTab === "profile" && (
                  <div className="space-y-6">
                    <h2 className="font-serif text-xl">Profile Information</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">First Name</label>
                        <input
                          type="text"
                          defaultValue="Rahim"
                          className="w-full bg-background border-none px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Last Name</label>
                        <input
                          type="text"
                          defaultValue="Khan"
                          className="w-full bg-background border-none px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue="rahim@example.com"
                        className="w-full bg-background border-none px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                      />
                    </div>
                    <button className="btn-primary">Save Changes</button>
                  </div>
                )}

                {activeTab === "orders" && (
                  <div className="text-center py-12">
                    <Package className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" />
                    <p className="text-muted-foreground">No orders yet</p>
                  </div>
                )}

                {activeTab === "wishlist" && (
                  <div className="text-center py-12">
                    <Heart className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" />
                    <p className="text-muted-foreground">Your wishlist is empty</p>
                  </div>
                )}

                {activeTab === "addresses" && (
                  <div className="text-center py-12">
                    <MapPin className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" />
                    <p className="text-muted-foreground mb-4">No saved addresses</p>
                    <button className="btn-outline">Add Address</button>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Account;
