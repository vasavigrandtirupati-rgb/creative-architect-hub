import { useSiteData } from "@/context/SiteDataContext";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const ReviewsSection = () => {
  const { reviews } = useSiteData();
  const [current, setCurrent] = useState(0);

  if (reviews.length === 0) return null;

  const next = () => setCurrent((c) => (c + 1) % reviews.length);
  const prev = () => setCurrent((c) => (c - 1 + reviews.length) % reviews.length);

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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-card rounded-lg p-8 accent-shadow text-center">
            {/* Avatar */}
            {reviews[current].image ? (
              <img src={reviews[current].image} alt={reviews[current].clientName}
                className="w-16 h-16 rounded-full object-cover mx-auto mb-4" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <span className="font-heading font-bold text-xl text-accent">
                  {reviews[current].clientName.charAt(0)}
                </span>
              </div>
            )}

            {/* Stars */}
            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: reviews[current].rating }).map((_, i) => (
                <Star key={i} size={16} className="fill-primary text-primary" />
              ))}
            </div>

            <p className="text-sm leading-relaxed opacity-80 mb-6 italic">
              "{reviews[current].reviewText}"
            </p>

            <h4 className="font-heading font-bold text-sm">{reviews[current].clientName}</h4>
            <p className="text-xs opacity-60">{reviews[current].company}</p>
          </div>

          {/* Nav */}
          <div className="flex justify-center gap-4 mt-6">
            <button onClick={prev} className="w-10 h-10 bg-card rounded-full flex items-center justify-center accent-shadow-sm hover:scale-105 transition-transform">
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-foreground" : "bg-accent/40"}`}
                />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 bg-card rounded-full flex items-center justify-center accent-shadow-sm hover:scale-105 transition-transform">
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewsSection;
