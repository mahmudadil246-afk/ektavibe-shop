import { useParams, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/product/ProductCard";
import { getProductsByCategory, products } from "@/data/products";

const Shop = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const categoryTitle = {
    men: "Men's Collection",
    women: "Women's Collection",
    baby: "Baby Collection",
    all: "All Products",
  }[category || "all"] || "Shop";

  const categoryDesc = {
    men: "Refined essentials and contemporary pieces for the modern gentleman",
    women: "Elegant designs crafted for the discerning woman",
    baby: "Gentle, comfortable clothing for your little ones",
    all: "Explore our complete collection for the whole family",
  }[category || "all"];

  const filteredProducts = category && category !== "all" 
    ? getProductsByCategory(category) 
    : products;

  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-secondary">
        <div className="container-wide text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="heading-display mb-4"
          >
            {categoryTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-body max-w-xl mx-auto"
          >
            {categoryDesc}
          </motion.p>
        </div>
      </section>

      {/* Products */}
      <section className="section-padding">
        <div className="container-wide">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 text-sm font-medium"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <span className="text-sm text-muted-foreground">
              {filteredProducts.length} products
            </span>
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 text-sm font-medium"
              >
                <span>Sort by</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-background shadow-elevated border border-border z-10">
                  {["Featured", "Price: Low to High", "Price: High to Low", "Newest"].map((option) => (
                    <button
                      key={option}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors"
                      onClick={() => setSortOpen(false)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Filter Panel */}
          {filterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-8 p-6 bg-secondary rounded overflow-hidden"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <h4 className="text-sm font-medium mb-3">Category</h4>
                  <div className="space-y-2">
                    {["Tops", "Bottoms", "Outerwear", "Accessories"].map((item) => (
                      <label key={item} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="checkbox" className="accent-accent" />
                        <span>{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-3">Size</h4>
                  <div className="flex flex-wrap gap-2">
                    {["XS", "S", "M", "L", "XL"].map((size) => (
                      <button
                        key={size}
                        className="w-10 h-10 border border-border text-sm hover:border-accent hover:text-accent transition-colors"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-3">Color</h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: "Cream", color: "#F5F5DC" },
                      { name: "Charcoal", color: "#36454F" },
                      { name: "Terracotta", color: "#E2725B" },
                      { name: "Sage", color: "#9CAF88" },
                    ].map((c) => (
                      <button
                        key={c.name}
                        className="w-8 h-8 rounded-full border-2 border-transparent hover:border-accent"
                        style={{ backgroundColor: c.color }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-3">Price</h4>
                  <div className="space-y-2">
                    {["Under ৳100", "৳100 - ৳200", "৳200 - ৳300", "Over ৳300"].map((range) => (
                      <label key={range} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="checkbox" className="accent-accent" />
                        <span>{range}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
