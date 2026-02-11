import { siteData } from "@/data/data";
import { motion } from "framer-motion";
import { ArrowDown, Code2, Layers, Terminal, Braces } from "lucide-react";

const floatingItems = [
  { icon: <Terminal size={20} />, delay: 0, x: "75%", y: "15%" },
  { icon: <Code2 size={22} />, delay: 0.5, x: "85%", y: "45%" },
  { icon: <Braces size={18} />, delay: 1, x: "70%", y: "70%" },
  { icon: <Layers size={20} />, delay: 1.5, x: "90%", y: "25%" },
];

const HeroSection = () => {
  const { name, title, tagline } = siteData.personalInfo;

  return (
    <section className="relative min-h-screen flex items-center bg-primary overflow-hidden">
      {/* Floating 3D-style elements */}
      {floatingItems.map((item, i) => (
        <motion.div
          key={i}
          className="absolute hidden md:flex items-center justify-center w-12 h-12 bg-card rounded-lg accent-shadow-sm text-foreground"
          style={{ left: item.x, top: item.y }}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3, delay: item.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          {item.icon}
        </motion.div>
      ))}

      <div className="container mx-auto section-padding pt-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <span className="inline-block bg-foreground text-card text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
            Available for Freelance
          </span>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold leading-[0.95] mb-6">
            {name.split(" ").map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </h1>

          <p className="text-lg md:text-xl font-medium mb-2">{title}</p>
          <p className="text-base md:text-lg opacity-80 mb-10 max-w-lg">{tagline}</p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-foreground text-card px-8 py-3 rounded-md font-semibold hover:opacity-90 transition-opacity accent-shadow-sm"
            >
              HIRE ME
            </button>
            <button
              onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
              className="border-2 border-foreground px-8 py-3 rounded-md font-semibold hover:bg-foreground hover:text-card transition-colors"
            >
              VIEW PROJECTS
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown size={24} className="opacity-60" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
