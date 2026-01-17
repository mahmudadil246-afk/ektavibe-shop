import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, Heart, Share2, ChevronRight, Truck, RefreshCw, Shield, Star } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/product/ProductCard";
import ProductGallery from "@/components/product/ProductGallery";
import ProductReviews from "@/components/product/ProductReviews";
import SizeGuideModal from "@/components/product/SizeGuideModal";
import { getProductById, products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const product = getProductById(id || "");
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  if (!product) {
    return (
      <Layout>
        <div className="section-padding text-center">
          <h1 className="heading-section mb-4">Product Not Found</h1>
          <Link to="/shop/all" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </Layout>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    if (!selectedColor) {
      toast.error("Please select a color");
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedSize, selectedColor);
    }
    toast.success(`${product.name} added to cart`);
  };

  const handleWishlistClick = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist");
    }
  };

  const scrollToReviews = () => {
    document.getElementById("reviews-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="container-wide px-4 md:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to={`/shop/${product.category}`} className="hover:text-accent transition-colors capitalize">
            {product.category}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      {/* Product */}
      <section className="container-wide px-4 md:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProductGallery 
              images={product.images} 
              productName={product.name} 
            />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:py-8"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                {product.subcategory}
              </span>
              {product.isNew && (
                <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 uppercase">
                  New
                </span>
              )}
              {product.isSale && (
                <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 uppercase">
                  Sale
                </span>
              )}
            </div>

            <h1 className="heading-section mb-2">{product.name}</h1>

            {/* Rating Summary */}
            <button 
              onClick={scrollToReviews}
              className="flex items-center gap-2 mb-4 group"
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-accent text-accent"
                        : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground group-hover:text-accent transition-colors">
                {product.rating.toFixed(1)} ({product.reviews.length} reviews)
              </span>
            </button>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-serif text-2xl">৳{product.price}</span>
              {product.originalPrice && (
                <span className="text-muted-foreground line-through">৳{product.originalPrice}</span>
              )}
            </div>

            <p className="text-body mb-8">{product.description}</p>

            {/* Color */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Color</span>
                <span className="text-sm text-muted-foreground">{selectedColor || "Select a color"}</span>
              </div>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border text-sm transition-colors ${
                      selectedColor === color
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-accent"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Size</span>
                <button 
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-sm text-accent link-underline"
                >
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[48px] h-12 px-4 border text-sm transition-colors ${
                      selectedSize === size
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-accent"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <span className="text-sm font-medium mb-3 block">Quantity</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-secondary transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-secondary transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <button onClick={handleAddToCart} className="btn-primary flex-1">
                Add to Cart
              </button>
              <button 
                onClick={handleWishlistClick}
                className={`p-3 border transition-colors ${
                  isWishlisted
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border hover:border-accent hover:text-accent"
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
              </button>
              <button className="p-3 border border-border hover:border-accent hover:text-accent transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Features */}
            <div className="space-y-4 pt-8 border-t border-border">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="w-5 h-5 text-accent" />
                <span>Free shipping on orders over ৳5000</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RefreshCw className="w-5 h-5 text-accent" />
                <span>30-day easy returns</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="w-5 h-5 text-accent" />
                <span>2-year quality guarantee</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reviews Section */}
      <div id="reviews-section">
        <ProductReviews 
          reviews={product.reviews} 
          rating={product.rating} 
          productName={product.name}
        />
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section-padding bg-secondary">
          <div className="container-wide">
            <h2 className="heading-section mb-8 text-center">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={product.category}
      />
    </Layout>
  );
};

export default ProductDetail;
