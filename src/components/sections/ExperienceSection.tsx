import { siteData } from "@/data/data";
import { motion } from "framer-motion";

const ExperienceSection = () => {
  return (
    <section id="experience" className="bg-primary section-padding">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-display mb-16"
        >
          WORK EXPERIENCE
          <span className="block w-16 h-1 bg-accent mt-3" />
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-accent/40" />

          <div className="space-y-12">
            {siteData.workExperience.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative pl-12 md:pl-20"
              >
                {/* Dot */}
                <div className="absolute left-2.5 md:left-6.5 top-1 w-3 h-3 rounded-full bg-accent border-2 border-foreground" />

                <div className="bg-card rounded-lg p-6 accent-shadow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <div>
                      <h3 className="font-heading font-bold">{exp.role}</h3>
                      <p className="text-sm opacity-70">{exp.company}</p>
                    </div>
                    <span className="text-xs font-semibold bg-primary px-3 py-1 rounded-full mt-2 md:mt-0 w-fit">
                      {exp.duration}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {exp.contributions.map((c, j) => (
                      <li key={j} className="text-sm opacity-80 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
