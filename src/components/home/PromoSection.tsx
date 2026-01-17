import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PromoSection = () => {
  return (
    <section className="section-padding bg-accent text-accent-foreground">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-xs tracking-[0.3em] uppercase mb-4 block opacity-80">
            Limited Time Offer
          </span>
          <h2 className="heading-display mb-6">
            Up to 30% Off
            <br />
            Winter Essentials
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Wrap up in style with our cozy collection of winter must-haves. 
            Premium quality at exceptional prices.
          </p>
          <Link to="/sale" className="btn-primary bg-primary-foreground text-primary hover:opacity-90">
            Shop the Sale
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PromoSection;
