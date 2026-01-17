import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/data/products";

const NewArrivals = () => {
  const newProducts = products.filter((p) => p.isNew);

  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-secondary">
        <div className="container-wide text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-accent text-sm tracking-[0.3em] uppercase mb-4 block"
          >
            Just Landed
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="heading-display mb-4"
          >
            New Arrivals
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-body max-w-xl mx-auto"
          >
            Discover our latest collection of timeless pieces, freshly curated for the season
          </motion.p>
        </div>
      </section>

      {/* Products */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {newProducts.length > 0 ? (
              newProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))
            ) : (
              [...products].slice(0, 4).map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NewArrivals;
