import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-main.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="ektA Fashion Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
      </div>
      
      <div className="container-wide relative z-10 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-xl"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-accent text-sm tracking-[0.3em] uppercase mb-4 block"
          >
            New Collection 2026
          </motion.span>
          <h1 className="heading-display mb-6">
            Timeless Elegance for Every Season
          </h1>
          <p className="text-body text-lg mb-8">
            Discover our curated collection of sustainable fashion for women, men, and little ones. Quality craftsmanship meets modern design.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/shop/women" className="btn-primary">
              Shop Women
            </Link>
            <Link to="/shop/men" className="btn-outline">
              Shop Men
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
