import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Trash2, Bell, ArrowRight } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const AccountWishlist = () => {
  const { items: wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart(product, product.sizes[0], product.colors[0]);
    toast.success(`${product.name} added to cart`);
  };

  const handleAddAllToCart = () => {
    wishlistItems.forEach(product => {
      addToCart(product, product.sizes[0], product.colors[0]);
    });
    toast.success("All items added to cart");
  };

  const handlePriceDropAlert = (productName: string) => {
    toast.success(`Price drop alert enabled for ${productName}`);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="text-center py-16">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <Heart className="w-16 h-16 mx-auto text-muted-foreground/20 mb-4" />
          <h3 className="font-serif text-xl mb-2">Your Wishlist is Empty</h3>
          <p className="text-muted-foreground mb-6">Save items you love to buy later</p>
          <Link to="/shop/women" className="btn-primary inline-flex items-center gap-2">
            Start Shopping <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-xl">My Wishlist</h2>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{wishlistItems.length} items</span>
          {wishlistItems.length > 0 && (
            <>
              <button
                onClick={handleAddAllToCart}
                className="text-sm text-accent hover:underline"
              >
                Add All to Cart
              </button>
              <button
                onClick={() => {
                  clearWishlist();
                  toast.success("Wishlist cleared");
                }}
                className="text-sm text-destructive hover:underline"
              >
                Clear All
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlistItems.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-background border border-border rounded-lg overflow-hidden group"
          >
            <Link
              to={`/product/${product.id}`}
              className="block aspect-[3/4] bg-muted relative overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {product.isNew && (
                <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">
                  New
                </Badge>
              )}
              {product.originalPrice && (
                <Badge className="absolute top-2 right-2 bg-destructive text-destructive-foreground">
                  Sale
                </Badge>
              )}
              
              {/* Stock Status */}
              <div className="absolute bottom-2 left-2">
                <Badge variant="secondary" className="bg-accent/90 text-accent-foreground">
                  In Stock
                </Badge>
              </div>
            </Link>

            <div className="p-4">
              <Link
                to={`/product/${product.id}`}
                className="font-medium text-sm hover:text-accent transition-colors line-clamp-1"
              >
                {product.name}
              </Link>
              <p className="text-xs text-muted-foreground capitalize mt-1">
                {product.category} • {product.subcategory}
              </p>
              
              <div className="flex items-center gap-2 mt-2">
                <span className="font-semibold">৳{product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ৳{product.originalPrice}
                  </span>
                )}
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity rounded"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Add to Cart
                </button>
                <button
                  onClick={() => handlePriceDropAlert(product.name)}
                  className="p-2.5 border border-border hover:bg-secondary transition-colors rounded"
                  title="Price drop alert"
                >
                  <Bell className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    removeFromWishlist(product.id);
                    toast.success("Removed from wishlist");
                  }}
                  className="p-2.5 text-destructive hover:bg-destructive/10 transition-colors rounded"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Similar Products Suggestion */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 p-6 bg-secondary rounded-lg text-center"
      >
        <h3 className="font-serif text-lg mb-2">Looking for more?</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Discover similar products based on your wishlist
        </p>
        <Link to="/shop/women" className="btn-outline inline-flex items-center gap-2">
          Browse Similar Items <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  );
};

export default AccountWishlist;
