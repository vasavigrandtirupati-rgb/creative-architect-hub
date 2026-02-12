import { useParams, Link } from "react-router-dom";
import { useSiteData } from "@/context/SiteDataContext";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Calendar, Clock, CheckCircle2, Circle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { projects } = useSiteData();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary">
        <div className="text-center">
          <h1 className="text-4xl font-display mb-4">Project Not Found</h1>
          <Link to="/" className="text-accent accent-underline font-medium">← Back to Home</Link>
        </div>
      </div>
    );
  }

  const statusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "in-progress": return "bg-primary/30 text-foreground";
      case "planning": return "bg-accent/20 text-accent";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const projectImages = project.image ? project.image.split(",").filter(Boolean) : [];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        {/* Hero Banner */}
        <section className="bg-primary section-padding pb-8">
          <div className="container mx-auto">
            <Link to="/#projects" className="inline-flex items-center gap-2 text-sm font-medium mb-8 hover:opacity-70 transition-opacity">
              <ArrowLeft size={16} /> Back to Projects
            </Link>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(project.status)}`}>
                  {project.status}
                </span>
                {project.isPublished && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">Published</span>
                )}
              </div>
              <h1 className="text-4xl md:text-6xl font-display mb-4">{project.title}</h1>
              <p className="text-lg opacity-80 max-w-2xl mb-6">{project.description}</p>

              <div className="flex flex-wrap gap-4">
                {project.liveLink && (
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                    className="bg-foreground text-card px-6 py-3 rounded-md font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity accent-shadow-sm">
                    <ExternalLink size={16} /> Live Demo
                  </a>
                )}
                {project.githubLink && (
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                    className="border-2 border-foreground px-6 py-3 rounded-md font-semibold flex items-center gap-2 hover:bg-foreground hover:text-card transition-colors">
                    <Github size={16} /> Source Code
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Project Images Gallery */}
        {projectImages.length > 0 && (
          <section className="bg-secondary section-padding py-12">
            <div className="container mx-auto">
              <h2 className="font-heading font-bold text-lg uppercase tracking-wider mb-6">Project Screenshots</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {projectImages.map((img, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="rounded-lg overflow-hidden accent-shadow bg-card">
                    <img src={img.trim()} alt={`${project.title} screenshot ${i + 1}`} className="w-full h-auto object-cover" />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Details Grid */}
        <section className="bg-card section-padding">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Tech Stack */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  className="bg-secondary rounded-lg p-6 accent-shadow">
                  <h3 className="font-heading font-bold text-sm uppercase tracking-wider mb-4">Tech Stack</h3>
                  <div className="flex flex-wrap gap-3">
                    {project.techStack.map(tech => (
                      <span key={tech} className="bg-card px-4 py-2 rounded-md font-medium text-sm accent-shadow-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Tasks */}
                {project.tasks.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="bg-secondary rounded-lg p-6 accent-shadow">
                    <h3 className="font-heading font-bold text-sm uppercase tracking-wider mb-4">
                      Project Tasks ({project.tasks.filter(t => t.isCompleted).length}/{project.tasks.length} completed)
                    </h3>
                    <div className="space-y-3">
                      {project.tasks.map((task, i) => (
                        <div key={i} className="flex items-center gap-3 bg-card p-3 rounded-md">
                          {task.isCompleted ? (
                            <CheckCircle2 size={18} className="text-green-600 shrink-0" />
                          ) : (
                            <Circle size={18} className="text-accent shrink-0" />
                          )}
                          <span className={`text-sm ${task.isCompleted ? "line-through opacity-60" : ""}`}>
                            {task.taskName}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  className="bg-secondary rounded-lg p-6 accent-shadow">
                  <h3 className="font-heading font-bold text-sm uppercase tracking-wider mb-4">Project Info</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar size={16} className="text-accent shrink-0" />
                      <div>
                        <p className="text-xs opacity-60 uppercase">Deadline</p>
                        <p className="text-sm font-medium">{project.deadline || "N/A"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock size={16} className="text-accent shrink-0" />
                      <div>
                        <p className="text-xs opacity-60 uppercase">Status</p>
                        <p className="text-sm font-medium capitalize">{project.status}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Quick Links */}
                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                  className="bg-secondary rounded-lg p-6 accent-shadow">
                  <h3 className="font-heading font-bold text-sm uppercase tracking-wider mb-4">Links</h3>
                  <div className="space-y-3">
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium accent-underline">
                        <ExternalLink size={14} /> Live Demo
                      </a>
                    )}
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium accent-underline">
                        <Github size={14} /> GitHub Repository
                      </a>
                    )}
                    {!project.liveLink && !project.githubLink && (
                      <p className="text-sm opacity-60">No external links available</p>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
