import { siteData } from "@/data/data";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const ProjectsSection = () => {
  const publishedProjects = siteData.projects.filter((p) => p.isPublished);

  return (
    <section id="projects" className="bg-secondary section-padding">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-bold"
          >
            SELECTED WORKS
            <span className="block w-16 h-1 bg-accent mt-3" />
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-card rounded-lg overflow-hidden accent-shadow card-hover"
            >
              {/* Image placeholder */}
              <div className="aspect-video bg-muted flex items-center justify-center">
                <span className="text-sm opacity-40 font-heading">{project.title}</span>
              </div>
              <div className="p-6">
                <h3 className="font-heading font-bold mb-2">{project.title}</h3>
                <p className="text-sm opacity-70 mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="text-xs bg-secondary px-2 py-1 rounded font-medium">
                      {tech}
                    </span>
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
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
