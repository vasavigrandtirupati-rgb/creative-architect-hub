import { useSiteData } from "@/context/SiteDataContext";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const ReviewsSection = () => {
  const { reviews, loading } = useSiteData();

  if (!loading && reviews.length === 0) return null;

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

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-lg p-8 accent-shadow text-center animate-pulse">
                <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4" />
                <div className="flex justify-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className="w-4 h-4 bg-muted rounded" />
                  ))}
                </div>
                <div className="space-y-2 mb-6">
                  <div className="h-3 bg-muted rounded w-full" />
                  <div className="h-3 bg-muted rounded w-5/6 mx-auto" />
                  <div className="h-3 bg-muted rounded w-4/6 mx-auto" />
                </div>
                <div className="h-4 bg-muted rounded w-24 mx-auto mb-1" />
                <div className="h-3 bg-muted rounded w-20 mx-auto" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((rev, i) => (
              <motion.div
                key={rev.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-lg p-8 accent-shadow text-center h-full flex flex-col items-center card-hover"
              >
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
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewsSection;
