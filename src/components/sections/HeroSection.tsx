import { siteData } from "@/data/data";
import { motion } from "framer-motion";
import { ArrowDown, Code2, Layers, Terminal, Braces } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const floatingItems = [
  { icon: <Terminal size={20} />, delay: 0, x: "10%", y: "15%" },
  { icon: <Code2 size={22} />, delay: 0.5, x: "5%", y: "45%" },
  { icon: <Braces size={18} />, delay: 1, x: "12%", y: "70%" },
  { icon: <Layers size={20} />, delay: 1.5, x: "8%", y: "85%" },
];

const heroImages = [
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&h=400&fit=crop",
];

const HeroSection = () => {
  const { name, title, tagline } = siteData.personalInfo;

  return (
    <section className="relative min-h-screen flex items-center bg-primary overflow-hidden">
      {/* Floating elements */}
      {floatingItems.map((item, i) => (
        <motion.div
          key={i}
          className="absolute hidden lg:flex items-center justify-center w-12 h-12 bg-card rounded-lg accent-shadow-sm text-foreground z-10"
          style={{ left: item.x, top: item.y }}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3, delay: item.delay, repeat: Infinity, ease: "easeInOut" }}
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

          {/* Right: 3D Swiper */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 w-full max-w-md lg:max-w-lg"
          >
            <Swiper
              effect="coverflow"
              grabCursor
              centeredSlides
              slidesPerView="auto"
              loop
              coverflowEffect={{
                rotate: 25,
                stretch: 0,
                depth: 200,
                modifier: 1,
                slideShadows: true,
              }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              modules={[EffectCoverflow, Autoplay, Pagination]}
              className="hero-swiper"
            >
              {heroImages.map((img, i) => (
                <SwiperSlide key={i} className="!w-[280px] md:!w-[320px]">
                  <div className="rounded-xl overflow-hidden accent-shadow">
                    <img src={img} alt={`Project showcase ${i + 1}`} className="w-full aspect-[3/2] object-cover" loading="lazy" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
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
