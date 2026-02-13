import { siteData } from "@/data/data";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const ServicesSection = () => {
  const enabledServices = siteData.services.filter((s) => s.enabled);

  return (
    <section id="services" className="bg-secondary section-padding">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display"
          >
            SERVICES
            <span className="block w-16 h-1 bg-accent mt-3" />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm opacity-70 max-w-sm"
          >
            Comprehensive technical solutions tailored to scale your business infrastructure
          </motion.p>
        </div>

        <Swiper
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          loop={enabledServices.length >= 4}
          coverflowEffect={{
            rotate: 15,
            stretch: 0,
            depth: 150,
            modifier: 1,
            slideShadows: false,
          }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Autoplay, Pagination]}
          breakpoints={{
            0: { slidesPerView: 1.2 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="services-swiper !pb-12"
        >
          {enabledServices.map((service) => (
            <SwiperSlide key={service.id} className="!h-auto">
              <motion.div
                whileHover={{ y: -6 }}
                className="bg-card rounded-lg p-6 accent-shadow cursor-pointer transition-shadow h-full"
              >
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4 text-foreground">
                  {service.icon}
                </div>
                <h3 className="font-heading font-bold text-sm mb-2">{service.title}</h3>
                <p className="text-xs opacity-70 leading-relaxed">{service.description}</p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ServicesSection;
