import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/data/products";

const Sale = () => {
  const saleProducts = products.filter((p) => p.isSale);

  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-accent text-accent-foreground">
        <div className="container-wide text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs tracking-[0.3em] uppercase mb-4 block opacity-80"
          >
            Limited Time
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="heading-display mb-4"
          >
            Winter Sale
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg max-w-xl mx-auto opacity-90"
          >
            Up to 30% off on selected items. Premium quality at exceptional prices.
          </motion.p>
        </div>
      </section>

      {/* Products */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {saleProducts.length > 0 ? (
              saleProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))
            ) : (
              products.slice(0, 4).map((product, index) => (
                <ProductCard 
                  key={product.id} 
                  product={{ ...product, isSale: true, originalPrice: Math.round(product.price * 1.3) }} 
                  index={index} 
                />
              ))
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Sale;
