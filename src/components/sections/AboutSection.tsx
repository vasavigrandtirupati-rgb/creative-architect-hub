import { siteData } from "@/data/data";
import { useSiteData } from "@/context/SiteDataContext";
import { motion } from "framer-motion";
import { MapPin, Clock, Download } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const AboutSection = () => {
  const { personalInfo, skills } = siteData;
  const { resumeUrl } = useSiteData();

  const skillCategories = [
    { title: "Frontend", items: skills.frontend },
    { title: "Backend", items: skills.backend },
    { title: "DevOps", items: skills.devops },
    { title: "Marketing", items: skills.marketing },
  ];

  const handleDownloadResume = () => {
    if (resumeUrl && resumeUrl !== "#") {
      const a = document.createElement("a");
      a.href = resumeUrl;
      a.download = "resume";
      a.click();
    }
  };

  return (
    <section id="about" className="bg-primary section-padding">
      <div className="container mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <motion.h2 variants={fadeUp} custom={0} className="text-4xl md:text-6xl font-display mb-2">
            ABOUT
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="text-4xl md:text-6xl font-display opacity-70">
            THE DEVELOPER
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 bg-card rounded-lg p-8 accent-shadow"
          >
            <h3 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
              📋 PROFESSIONAL SUMMARY
            </h3>
            {personalInfo.summary.split("\n\n").map((para, i) => (
              <p key={i} className="text-sm leading-relaxed opacity-80 mb-3">{para}</p>
            ))}
          </motion.div>

          <div className="flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card rounded-lg p-6 accent-shadow"
            >
              <div className="flex items-center gap-2 text-accent mb-1">
                <MapPin size={16} />
                <span className="text-xs uppercase tracking-wider font-semibold">Location</span>
              </div>
              <p className="font-heading font-bold text-sm">{personalInfo.location}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-card rounded-lg p-6 accent-shadow"
            >
              <div className="flex items-center gap-2 text-accent mb-1">
                <Clock size={16} />
                <span className="text-xs uppercase tracking-wider font-semibold">Experience</span>
              </div>
              <p className="font-heading font-bold text-sm">{personalInfo.experience}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              onClick={handleDownloadResume}
              className="bg-card rounded-lg p-6 accent-shadow cursor-pointer card-hover"
            >
              <div className="flex items-center gap-2">
                <Download size={16} />
                <span className="font-heading font-bold text-sm">DOWNLOAD FULL CV</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Skills */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.h3 variants={fadeUp} custom={0} className="font-heading text-xl font-bold mb-8 flex items-center gap-2">
            🛠 TECHNICAL EXPERTISE
          </motion.h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((cat, i) => (
              <motion.div
                key={cat.title}
                variants={fadeUp}
                custom={i + 1}
                className="bg-card rounded-lg p-6 accent-shadow card-hover"
              >
                <h4 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 border-b-2 border-accent pb-2">
                  {cat.title}
                </h4>
                <ul className="space-y-2">
                  {cat.items.map((skill) => (
                    <li key={skill} className="text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
