import { useSiteData } from "@/context/SiteDataContext";
import { motion } from "framer-motion";
import { ExternalLink, Github, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

const ProjectsSection = () => {
  const { projects } = useSiteData();
  const publishedProjects = projects.filter((p) => p.isPublished);

  return (
    <section id="projects" className="bg-secondary section-padding">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display"
          >
            SELECTED WORKS
            <span className="block w-16 h-1 bg-accent mt-3" />
          </motion.h2>
        </div>

        {publishedProjects.length > 0 ? (
          <Swiper
            effect="coverflow"
            grabCursor
            centeredSlides
            loop={publishedProjects.length > 2}
            coverflowEffect={{
              rotate: 12,
              stretch: 0,
              depth: 180,
              modifier: 1,
              slideShadows: true,
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation
            modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
            breakpoints={{
              0: { slidesPerView: 1.1 },
              640: { slidesPerView: 1.5 },
              1024: { slidesPerView: 2.2 },
            }}
            className="projects-swiper !pb-12"
          >
            {publishedProjects.map((project) => {
              const thumb = project.image?.split(",")[0]?.trim();
              return (
                <SwiperSlide key={project.id} className="!h-auto">
                  <div className="bg-card rounded-lg overflow-hidden accent-shadow h-full">
                    <Link to={`/project/${project.id}`}>
                      {thumb ? (
                        <div className="aspect-video overflow-hidden">
                          <img src={thumb} alt={project.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                        </div>
                      ) : (
                        <div className="aspect-video bg-muted flex items-center justify-center">
                          <ImageIcon size={28} className="opacity-20" />
                        </div>
                      )}
                    </Link>
                    <div className="p-6">
                      <Link to={`/project/${project.id}`}>
                        <h3 className="font-heading font-bold mb-2 hover:text-accent transition-colors">{project.title}</h3>
                      </Link>
                      <p className="text-sm opacity-70 mb-4 line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.techStack.map((tech) => (
                          <span key={tech} className="text-xs bg-secondary px-2 py-1 rounded font-medium">{tech}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4">
                        {project.liveLink && (
                          <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-sm font-medium flex items-center gap-1 accent-underline">
                            <ExternalLink size={14} /> Demo
                          </a>
                        )}
                        {project.githubLink && (
                          <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-sm font-medium flex items-center gap-1 accent-underline">
                            <Github size={14} /> Repo
                          </a>
                        )}
                        <Link to={`/project/${project.id}`} className="text-sm font-medium accent-underline ml-auto">
                          View Details →
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <p className="text-center opacity-60 py-12">No published projects yet.</p>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
