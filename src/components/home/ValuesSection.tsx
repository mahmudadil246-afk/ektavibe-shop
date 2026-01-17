import { motion } from "framer-motion";
import { Leaf, Shield, Truck, RefreshCw } from "lucide-react";

const values = [
  {
    icon: Leaf,
    title: "Sustainable",
    description: "Eco-friendly materials and ethical production practices",
  },
  {
    icon: Shield,
    title: "Quality",
    description: "Premium fabrics designed to last season after season",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Complimentary delivery on orders over ৳5000",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "30-day hassle-free returns on all items",
  },
];

const ValuesSection = () => {
  return (
    <section className="section-padding border-t border-border">
      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <value.icon className="w-8 h-8 mx-auto mb-4 text-accent" />
              <h3 className="font-medium text-sm mb-2">{value.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
