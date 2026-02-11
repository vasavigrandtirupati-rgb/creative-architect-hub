import { siteData } from "@/data/data";
import { motion } from "framer-motion";
import { Award } from "lucide-react";

const AchievementsSection = () => {
  return (
    <section id="achievements" className="bg-secondary section-padding">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-heading font-bold mb-16"
        >
          ACHIEVEMENTS
          <span className="block w-16 h-1 bg-accent mt-3" />
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteData.achievements.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-lg p-6 accent-shadow card-hover"
            >
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mb-4">
                <Award size={18} />
              </div>
              <span className="text-xs font-semibold text-accent">{item.year}</span>
              <h3 className="font-heading font-bold text-sm mt-1 mb-2">{item.title}</h3>
              <p className="text-xs opacity-70">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
