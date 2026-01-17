import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, TrendingUp } from "lucide-react";
import { products, Product } from "@/data/products";

interface SearchDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchDropdown = ({ isOpen, onClose }: SearchDropdownProps) => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (!isOpen) {
      setQuery("");
    }
  }, [isOpen]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Name filter
      const matchesName = product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.subcategory.toLowerCase().includes(query.toLowerCase());

      // Category filter
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;

      // Price filter
      let matchesPrice = true;
      if (priceRange !== "all") {
        const [min, max] = priceRange.split("-").map(Number);
        if (max) {
          matchesPrice = product.price >= min && product.price <= max;
        } else {
          matchesPrice = product.price >= min;
        }
      }

      return matchesName && matchesCategory && matchesPrice;
    });
  }, [query, selectedCategory, priceRange]);

  const suggestions = query.length > 0 ? filteredProducts.slice(0, 6) : [];

  const popularSearches = ["Wool Sweater", "Linen Blazer", "Cotton Tee", "Baby Onesie"];

  const handleProductClick = (productId: string) => {
    onClose();
    navigate(`/product/${productId}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/shop/all?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="border-t border-border overflow-hidden bg-background"
        >
          <div className="container-wide px-4 md:px-8 py-6">
            {/* Search Input */}
            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full bg-secondary px-12 py-4 text-base border-none focus:outline-none focus:ring-2 focus:ring-accent"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>

            {/* Filters */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Category:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-secondary px-3 py-2 text-sm border-none focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  <option value="all">All</option>
                  <option value="women">Women</option>
                  <option value="men">Men</option>
                  <option value="baby">Baby</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Price:</span>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="bg-secondary px-3 py-2 text-sm border-none focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  <option value="all">All Prices</option>
                  <option value="0-100">Under ৳100</option>
                  <option value="100-200">৳100 - ৳200</option>
                  <option value="200-300">৳200 - ৳300</option>
                  <option value="300-">৳300+</option>
                </select>
              </div>
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 ? (
              <div className="max-w-2xl mx-auto">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
                  {suggestions.length} result{suggestions.length !== 1 ? "s" : ""} found
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {suggestions.map((product) => (
                    <SearchResultItem
                      key={product.id}
                      product={product}
                      onClick={() => handleProductClick(product.id)}
                      query={query}
                    />
                  ))}
                </div>
                {filteredProducts.length > 6 && (
                  <button
                    onClick={() => {
                      onClose();
                      navigate(`/shop/all?search=${encodeURIComponent(query)}`);
                    }}
                    className="w-full mt-4 py-3 text-sm text-accent hover:underline"
                  >
                    View all {filteredProducts.length} results →
                  </button>
                )}
              </div>
            ) : query.length > 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No products found for "{query}"</p>
                <p className="text-sm text-muted-foreground/70 mt-1">Try adjusting your filters</p>
              </div>
            ) : (
              /* Popular Searches */
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Popular Searches
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-4 py-2 bg-secondary text-sm hover:bg-muted transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface SearchResultItemProps {
  product: Product;
  onClick: () => void;
  query: string;
}

const SearchResultItem = ({ product, onClick, query }: SearchResultItemProps) => {
  // Highlight matching text
  const highlightMatch = (text: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="bg-accent/20 text-accent font-medium">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4 p-3 bg-secondary hover:bg-muted transition-colors text-left w-full"
    >
      <div className="w-16 h-20 bg-muted flex-shrink-0 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{highlightMatch(product.name)}</p>
        <p className="text-xs text-muted-foreground capitalize">{product.category} • {product.subcategory}</p>
        <p className="text-sm font-medium mt-1">৳{product.price}</p>
      </div>
    </button>
  );
};

export default SearchDropdown;
