import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";

const CartDrawer = () => {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/20 z-50"
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background z-50 flex flex-col shadow-elevated"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-serif text-xl font-medium">Your Cart</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:text-accent transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground mb-4">Your cart is empty</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="btn-outline"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.size}-${item.color}`}
                      className="flex gap-4"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-24 object-cover bg-secondary"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">{item.product.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.size} / {item.color}
                        </p>
                        <p className="font-medium mt-1">৳{item.product.price}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)
                            }
                            className="p-1 border border-border hover:bg-secondary transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)
                            }
                            className="p-1 border border-border hover:bg-secondary transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                        className="text-muted-foreground hover:text-accent transition-colors self-start"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-serif text-xl font-medium">৳{totalPrice.toLocaleString()}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Shipping and taxes calculated at checkout
                </p>
                <Link
                  to="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="btn-primary w-full text-center block"
                >
                  Checkout
                </Link>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="btn-outline w-full"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
