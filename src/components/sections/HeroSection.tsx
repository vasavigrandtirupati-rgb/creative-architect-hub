import { siteData } from "@/data/data";
import { motion } from "framer-motion";
import { ArrowDown, Code2, Layers, Terminal, Braces } from "lucide-react";

const floatingItems = [
  { icon: <Terminal size={20} />, delay: 0, x: "10%", y: "15%" },
  { icon: <Code2 size={22} />, delay: 0.5, x: "5%", y: "45%" },
  { icon: <Braces size={18} />, delay: 1, x: "12%", y: "70%" },
  { icon: <Layers size={20} />, delay: 1.5, x: "8%", y: "85%" },
];

const HeroSection = () => {
  const { name, title, tagline } = siteData.personalInfo;

  return (
    <section className="relative min-h-screen flex items-center bg-primary overflow-hidden">
      {/* Floating elements */}
      {floatingItems.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-accent opacity-30 hidden lg:block"
          style={{ left: item.x, top: item.y }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: item.delay }}
        >
          {item.icon}
        </motion.div>
      ))}

      <div className="container mx-auto section-padding pt-32">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1 max-w-xl"
          >
            <span className="inline-block bg-foreground text-card text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
              Available for Freelance
            </span>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display leading-[0.95] mb-6">
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

          {/* Right: Decorative code blocks */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 w-full max-w-md lg:max-w-lg hidden lg:block"
          >
            <div className="relative">
              {/* Main code card */}
              <div className="bg-foreground text-card rounded-xl p-6 accent-shadow font-mono text-sm leading-relaxed">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs ml-2 opacity-50">developer.tsx</span>
                </div>
                <pre className="text-xs md:text-sm">
                  <code>
{`const developer = {
  name: "${name}",
  role: "${title}",
  skills: ["React", "Node.js",
           "TypeScript", "Cloud"],
  passion: "Building elegant
            solutions",
};`}
                  </code>
                </pre>
              </div>

              {/* Floating accent card */}
              <motion.div
                className="absolute -bottom-6 -right-6 bg-card rounded-lg p-4 accent-shadow-sm"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <p className="text-xs font-heading font-bold">10+ Years</p>
                <p className="text-[10px] opacity-60">Professional Experience</p>
              </motion.div>

              {/* Floating stats */}
              <motion.div
                className="absolute -top-4 -left-4 bg-accent text-accent-foreground rounded-lg px-3 py-2"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
              >
                <p className="text-xs font-bold">50+ Projects</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
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
