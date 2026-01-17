import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import categoryMen from "@/assets/category-men.jpg";
import categoryWomen from "@/assets/category-women.jpg";
import categoryBaby from "@/assets/category-baby.jpg";

const categories = [
  {
    name: "Women",
    description: "Contemporary elegance",
    image: categoryWomen,
    path: "/shop/women",
  },
  {
    name: "Men",
    description: "Modern classics",
    image: categoryMen,
    path: "/shop/men",
  },
  {
    name: "Baby",
    description: "Gentle comfort",
    image: categoryBaby,
    path: "/shop/baby",
  },
];

const CategorySection = () => {
  return (
    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="heading-section mb-4">Shop by Category</h2>
          <p className="text-body max-w-xl mx-auto">
            Explore our thoughtfully curated collections for the whole family
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Link
                to={category.path}
                className="group block relative overflow-hidden aspect-[3/4]"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 className="font-serif text-2xl md:text-3xl text-primary-foreground mb-1">
                    {category.name}
                  </h3>
                  <p className="text-primary-foreground/80 text-sm mb-4">{category.description}</p>
                  <span className="inline-block text-primary-foreground text-xs tracking-wider uppercase border-b border-primary-foreground/50 pb-1 group-hover:border-accent group-hover:text-accent transition-colors">
                    Explore Collection
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
