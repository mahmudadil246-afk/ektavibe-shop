import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, Menu, X, User, Heart, Bell } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import CartDrawer from "@/components/cart/CartDrawer";
import SearchDropdown from "@/components/search/SearchDropdown";
import NotificationDropdown from "@/components/header/NotificationDropdown";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { totalItems: wishlistCount } = useWishlist();
  const location = useLocation();
  const navLinks = [
    { name: "Women", path: "/shop/women" },
    { name: "Men", path: "/shop/men" },
    { name: "Baby", path: "/shop/baby" },
    { name: "New Arrivals", path: "/new-arrivals" },
    { name: "Sale", path: "/sale" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        {/* Announcement Bar */}
        <div className="bg-primary text-primary-foreground text-center py-2 text-xs tracking-wider">
          FREE SHIPPING ON ORDERS OVER ৳5000 | EASY RETURNS
        </div>

        <div className="container-wide">
          <div className="flex items-center justify-between h-16 md:h-20 px-4 md:px-8">
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 -ml-2"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <h1 className="font-serif text-2xl md:text-3xl font-medium tracking-tight">
                ekt<span className="text-accent">A</span>
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium tracking-wider uppercase transition-colors link-underline ${
                    isActive(link.path) ? "text-accent" : "text-foreground hover:text-accent"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-2 md:gap-4">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-2 transition-colors ${isSearchOpen ? "text-accent" : "hover:text-accent"}`}
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              
              {/* Notification Bell - Desktop */}
              <div className="hidden md:block">
                <NotificationDropdown
                  isOpen={isNotificationsOpen}
                  onClose={() => setIsNotificationsOpen(false)}
                  onToggle={() => setIsNotificationsOpen(!isNotificationsOpen)}
                />
              </div>

              <Link 
                to="/account" 
                className="p-2 hover:text-accent transition-colors relative hidden md:block"
                onClick={() => {
                  sessionStorage.setItem("account_tab", "wishlist");
                }}
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link to="/account" className="p-2 hover:text-accent transition-colors hidden md:block">
                <User className="w-5 h-5" />
              </Link>
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 hover:text-accent transition-colors relative"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search Dropdown */}
        <SearchDropdown isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/20 z-50"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-background z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-serif text-2xl font-medium">
                    ekt<span className="text-accent">A</span>
                  </h2>
                  <button onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block text-lg font-medium tracking-wide ${
                        isActive(link.path) ? "text-accent" : "text-foreground"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
                <div className="mt-8 pt-8 border-t border-border space-y-4">
                  <Link
                    to="/account"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      sessionStorage.setItem("account_tab", "notifications");
                    }}
                    className="flex items-center gap-3 text-foreground"
                  >
                    <Bell className="w-5 h-5" />
                    <span>Notifications</span>
                  </Link>
                  <Link
                    to="/account"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      sessionStorage.setItem("account_tab", "wishlist");
                    }}
                    className="flex items-center gap-3 text-foreground"
                  >
                    <Heart className="w-5 h-5" />
                    <span>Wishlist ({wishlistCount})</span>
                  </Link>
                  <Link
                    to="/account"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-foreground"
                  >
                    <User className="w-5 h-5" />
                    <span>Account</span>
                  </Link>
                  <Link
                    to="/about"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-foreground"
                  >
                    About Us
                  </Link>
                  <Link
                    to="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-foreground"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CartDrawer />
    </>
  );
};

export default Header;
