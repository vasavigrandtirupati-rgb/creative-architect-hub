import { siteData } from "@/data/data";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const AchievementsSection = () => {
  return (
    <section id="achievements" className="bg-secondary section-padding">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-display mb-16"
        >
          ACHIEVEMENTS
          <span className="block w-16 h-1 bg-accent mt-3" />
        </motion.h2>

        <Swiper
          effect="coverflow"
          grabCursor
          centeredSlides
          loop={siteData.achievements.length >= 4}
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 120,
            modifier: 1,
            slideShadows: false,
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Autoplay, Pagination]}
          breakpoints={{
            0: { slidesPerView: 1.2 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="achievements-swiper !pb-12"
        >
          {siteData.achievements.map((item) => (
            <SwiperSlide key={item.id} className="!h-auto">
              <div className="bg-card rounded-lg p-6 accent-shadow card-hover h-full">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <Award size={18} />
                </div>
                <span className="text-xs font-semibold text-accent">{item.year}</span>
                <h3 className="font-heading font-bold text-sm mt-1 mb-2">{item.title}</h3>
                <p className="text-xs opacity-70">{item.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default AchievementsSection;
