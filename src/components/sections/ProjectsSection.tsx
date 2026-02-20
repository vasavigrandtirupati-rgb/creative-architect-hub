import { useSiteData } from "@/context/SiteDataContext";
import { motion } from "framer-motion";
import { ExternalLink, Github, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";

const ProjectsSection = () => {
  const { projects, loading } = useSiteData();
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

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-lg overflow-hidden accent-shadow animate-pulse">
                <div className="aspect-[4/3] bg-muted" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-full" />
                  <div className="h-3 bg-muted rounded w-2/3" />
                  <div className="flex gap-2 pt-2">
                    <div className="h-6 w-16 bg-muted rounded" />
                    <div className="h-6 w-16 bg-muted rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : publishedProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedProjects.map((project, i) => {
              const thumb = project.image?.split(",")[0]?.trim();
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="bg-card rounded-lg overflow-hidden accent-shadow card-hover h-full flex flex-col">
                    <Link to={`/project/${project.id}`} className="block">
                      {thumb ? (
                        <div className="aspect-[4/3] overflow-hidden">
                          <img
                            src={thumb}
                            alt={project.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ) : (
                        <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                          <ImageIcon size={32} className="opacity-20" />
                        </div>
                      )}
                    </Link>
                    <div className="p-6 flex flex-col flex-1">
                      <Link to={`/project/${project.id}`}>
                        <h3 className="font-heading font-bold text-base mb-2 hover:text-accent transition-colors">
                          {project.title}
                        </h3>
                      </Link>
                      <p className="text-sm opacity-70 mb-4 line-clamp-2 flex-1">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.techStack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="text-xs bg-secondary px-2.5 py-1 rounded-md font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="text-xs bg-accent/10 text-accent px-2.5 py-1 rounded-md font-medium">
                            +{project.techStack.length - 4}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 pt-3 border-t border-input">
                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium flex items-center gap-1.5 accent-underline"
                          >
                            <ExternalLink size={14} /> Demo
                          </a>
                        )}
                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium flex items-center gap-1.5 accent-underline"
                          >
                            <Github size={14} /> Repo
                          </a>
                        )}
                        <Link
                          to={`/project/${project.id}`}
                          className="text-sm font-medium accent-underline ml-auto"
                        >
                          Details →
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <p className="text-center opacity-60 py-12">No published projects yet.</p>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
