import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSiteData } from "@/context/SiteDataContext";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Calendar, Clock, CheckCircle2, Circle, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { projects } = useSiteData();
  const project = projects.find(p => p.id === id);
  const [activeImg, setActiveImg] = useState(0);

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
      case "planning": return "bg-accent/20 text-accent-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const projectImages = project.image
    ? project.image.split(",").map(s => s.trim()).filter(Boolean)
    : [];

  const prev = () => setActiveImg(i => (i - 1 + projectImages.length) % projectImages.length);
  const next = () => setActiveImg(i => (i + 1) % projectImages.length);

  return (
    <div className="min-h-screen bg-secondary">
      <Navbar />
      <main className="pt-20">

        {/* Hero Banner */}
        <section className="bg-primary section-padding pb-8">
          <div className="container mx-auto">
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 text-sm font-medium mb-8 hover:opacity-70 transition-opacity"
            >
              <ArrowLeft size={16} /> Back to Projects
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(project.status)}`}>
                  {project.status}
                </span>
                {project.isPublished && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                    Published
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-5xl font-display mb-3">{project.title}</h1>
              <p className="text-base opacity-75 max-w-2xl mb-6">{project.description}</p>

              <div className="flex flex-wrap gap-3">
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-foreground text-card px-5 py-2.5 rounded-md font-semibold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity accent-shadow-sm"
                  >
                    <ExternalLink size={15} /> Live Demo
                  </a>
                )}
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-foreground px-5 py-2.5 rounded-md font-semibold text-sm flex items-center gap-2 hover:bg-foreground hover:text-card transition-colors"
                  >
                    <Github size={15} /> Source Code
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="section-padding py-10 md:py-16">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-5 gap-8 xl:gap-12">

              {/* LEFT — Image Gallery */}
              {projectImages.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="lg:col-span-3 space-y-3"
                >
                  {/* Main Image */}
                  <div className="relative rounded-xl overflow-hidden bg-card accent-shadow group">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={activeImg}
                        src={projectImages[activeImg]}
                        alt={`${project.title} screenshot ${activeImg + 1}`}
                        className="w-full aspect-video object-cover"
                        initial={{ opacity: 0, scale: 1.03 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.3 }}
                      />
                    </AnimatePresence>

                    {/* Image counter */}
                    <div className="absolute top-3 right-3 bg-foreground/70 text-card text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
                      {activeImg + 1} / {projectImages.length}
                    </div>

                    {/* Prev / Next arrows (only if >1 image) */}
                    {projectImages.length > 1 && (
                      <>
                        <button
                          onClick={prev}
                          className="absolute left-3 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card text-foreground rounded-full p-1.5 transition-all opacity-0 group-hover:opacity-100 accent-shadow-sm"
                          aria-label="Previous image"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <button
                          onClick={next}
                          className="absolute right-3 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card text-foreground rounded-full p-1.5 transition-all opacity-0 group-hover:opacity-100 accent-shadow-sm"
                          aria-label="Next image"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Thumbnail Strip */}
                  {projectImages.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                      {projectImages.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImg(i)}
                          className={`shrink-0 w-20 h-14 md:w-24 md:h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                            i === activeImg
                              ? "border-foreground accent-shadow-sm scale-105"
                              : "border-transparent opacity-60 hover:opacity-90"
                          }`}
                        >
                          <img
                            src={img}
                            alt={`Thumbnail ${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-card rounded-xl p-5 accent-shadow"
                  >
                    <h3 className="font-heading font-bold text-xs uppercase tracking-wider mb-3 opacity-60">
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map(tech => (
                        <span
                          key={tech}
                          className="bg-secondary px-3 py-1.5 rounded-md font-medium text-sm accent-shadow-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* RIGHT — Details */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className={`space-y-5 ${projectImages.length > 0 ? "lg:col-span-2" : "lg:col-span-5"}`}
              >
                {/* Project Info Card */}
                <div className="bg-card rounded-xl p-5 accent-shadow">
                  <h3 className="font-heading font-bold text-xs uppercase tracking-wider mb-4 opacity-60">
                    Project Info
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
                        <Calendar size={14} className="text-foreground" />
                      </div>
                      <div>
                        <p className="text-xs opacity-50 uppercase tracking-wide">Deadline</p>
                        <p className="text-sm font-semibold">{project.deadline || "N/A"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
                        <Clock size={14} className="text-foreground" />
                      </div>
                      <div>
                        <p className="text-xs opacity-50 uppercase tracking-wide">Status</p>
                        <p className="text-sm font-semibold capitalize">{project.status}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Links */}
                {(project.liveLink || project.githubLink) && (
                  <div className="bg-card rounded-xl p-5 accent-shadow">
                    <h3 className="font-heading font-bold text-xs uppercase tracking-wider mb-4 opacity-60">
                      Links
                    </h3>
                    <div className="space-y-3">
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm font-medium accent-underline"
                        >
                          <ExternalLink size={14} className="text-accent" /> Live Demo
                        </a>
                      )}
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm font-medium accent-underline"
                        >
                          <Github size={14} className="text-accent" /> GitHub Repository
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Tasks */}
                {project.tasks.length > 0 && (
                  <div className="bg-card rounded-xl p-5 accent-shadow">
                    <h3 className="font-heading font-bold text-xs uppercase tracking-wider mb-4 opacity-60">
                      Tasks&nbsp;
                      <span className="normal-case font-normal opacity-80">
                        ({project.tasks.filter(t => t.isCompleted).length}/{project.tasks.length} done)
                      </span>
                    </h3>
                    <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                      {project.tasks.map((task, i) => (
                        <div key={i} className="flex items-center gap-3 bg-secondary p-2.5 rounded-lg">
                          {task.isCompleted ? (
                            <CheckCircle2 size={16} className="text-green-600 shrink-0" />
                          ) : (
                            <Circle size={16} className="text-accent shrink-0" />
                          )}
                          <span className={`text-sm ${task.isCompleted ? "line-through opacity-50" : ""}`}>
                            {task.taskName}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* No images fallback — show tech stack here instead */}
                {projectImages.length === 0 && (
                  <div className="bg-card rounded-xl p-5 accent-shadow">
                    <h3 className="font-heading font-bold text-xs uppercase tracking-wider mb-3 opacity-60">
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map(tech => (
                        <span
                          key={tech}
                          className="bg-secondary px-3 py-1.5 rounded-md font-medium text-sm accent-shadow-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
