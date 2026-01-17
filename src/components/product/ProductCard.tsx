import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="card-product group"
    >
      <Link to={`/product/${product.id}`}>
        <div className="card-product-image relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <button
            className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:text-accent"
            onClick={(e) => {
              e.preventDefault();
              // Wishlist functionality
            }}
          >
            <Heart className="w-4 h-4" />
          </button>
          {product.isNew && (
            <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs px-2 py-1 tracking-wider uppercase">
              New
            </span>
          )}
          {product.isSale && (
            <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs px-2 py-1 tracking-wider uppercase">
              Sale
            </span>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="w-full bg-primary text-primary-foreground py-2.5 text-xs font-medium tracking-wider uppercase hover:bg-accent transition-colors">
              Quick View
            </button>
          </div>
        </div>
      </Link>
      <div className="mt-4 space-y-1">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.subcategory}</p>
        <h3 className="font-medium text-sm">
          <Link to={`/product/${product.id}`} className="hover:text-accent transition-colors">
            {product.name}
          </Link>
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-medium">৳{product.price}</span>
          {product.originalPrice && (
            <span className="text-muted-foreground line-through text-sm">৳{product.originalPrice}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
