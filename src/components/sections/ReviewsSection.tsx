import { useSiteData } from "@/context/SiteDataContext";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const ReviewsSection = () => {
  const { reviews } = useSiteData();

  if (reviews.length === 0) return null;

  return (
    <section id="reviews" className="bg-primary section-padding">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-display mb-16"
        >
          CLIENT REVIEWS
          <span className="block w-16 h-1 bg-accent mt-3" />
        </motion.h2>

        <Swiper
          effect="coverflow"
          grabCursor
          centeredSlides
          loop={reviews.length >= 3}
          coverflowEffect={{
            rotate: 10,
            stretch: 0,
            depth: 150,
            modifier: 1,
            slideShadows: false,
          }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Autoplay, Pagination]}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 1.5 },
            1024: { slidesPerView: 2.2 },
          }}
          className="reviews-swiper !pb-12"
        >
          {reviews.map((rev) => (
            <SwiperSlide key={rev.id} className="!h-auto">
              <div className="bg-card rounded-lg p-8 accent-shadow text-center h-full flex flex-col items-center">
                {rev.image ? (
                  <img src={rev.image} alt={rev.clientName} className="w-16 h-16 rounded-full object-cover mb-4" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                    <span className="font-heading font-bold text-xl text-accent">
                      {rev.clientName.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="flex justify-center gap-1 mb-4">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed opacity-80 mb-6 italic flex-1">
                  "{rev.reviewText}"
                </p>
                <h4 className="font-heading font-bold text-sm">{rev.clientName}</h4>
                <p className="text-xs opacity-60">{rev.company}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ReviewsSection;
