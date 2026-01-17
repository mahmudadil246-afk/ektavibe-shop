import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/data/products";

const FeaturedProducts = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="section-padding">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
        >
          <div>
            <h2 className="heading-section mb-2">Trending Now</h2>
            <p className="text-body">Discover our most loved pieces this season</p>
          </div>
          <Link
            to="/shop/all"
            className="text-sm font-medium tracking-wider uppercase link-underline self-start md:self-auto"
          >
            View All Products
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
