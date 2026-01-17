import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import heroImage from "@/assets/hero-main.jpg";

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="About ektA"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/50" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center text-primary-foreground"
        >
          <h1 className="heading-display mb-4">Our Story</h1>
          <p className="text-xl opacity-90">Fashion with purpose</p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-wide max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-lg mx-auto"
          >
            <h2 className="heading-section text-center mb-8">Welcome to ektA</h2>
            <p className="text-body text-lg leading-relaxed mb-8">
              Founded in 2020, ektA was born from a simple belief: that fashion should be timeless, 
              sustainable, and accessible to everyone. Our name, derived from the Bengali word for 
              "unity," reflects our commitment to bringing together quality craftsmanship, ethical 
              practices, and contemporary design.
            </p>
            <p className="text-body text-lg leading-relaxed mb-8">
              We believe that the best garments are those that tell a story – of skilled artisans, 
              of sustainable materials, of thoughtful design. Each piece in our collection is 
              carefully curated to stand the test of time, both in style and durability.
            </p>
          </motion.div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              {
                title: "Sustainable Fashion",
                description: "We source eco-friendly materials and work with ethical manufacturers to minimize our environmental footprint.",
              },
              {
                title: "Quality Craftsmanship",
                description: "Every garment is crafted with attention to detail, ensuring comfort and longevity in every piece.",
              },
              {
                title: "Inclusive Design",
                description: "Fashion for the whole family. From women to men to little ones, we design for everyone.",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <h3 className="font-serif text-xl mb-4">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-secondary">
        <div className="container-wide text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-section mb-6">Join Our Journey</h2>
            <p className="text-body max-w-xl mx-auto mb-8">
              Discover the ektA difference. Browse our collections and find pieces that resonate 
              with your personal style.
            </p>
            <a href="/shop/all" className="btn-primary">
              Explore Collections
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
