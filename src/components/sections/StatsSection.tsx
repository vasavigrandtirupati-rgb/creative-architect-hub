import { siteData } from "@/data/data";
import { motion } from "framer-motion";

const StatsSection = () => {
  return (
    <section className="bg-foreground text-card section-padding">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {siteData.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-4xl md:text-5xl font-display text-primary mb-2">
                {stat.value}
              </p>
              <p className="text-xs uppercase tracking-wider opacity-70">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
