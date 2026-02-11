import { useState } from "react";
import { Link } from "react-router-dom";
import { siteData, Project, WorkExperience, Review } from "@/data/data";
import {
  LayoutDashboard,
  FolderOpen,
  Briefcase,
  MessageSquare,
  Settings,
  Image,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  ChevronLeft,
  X,
  Check,
} from "lucide-react";

type Tab = "dashboard" | "projects" | "experience" | "reviews" | "services" | "media";

const Admin = () => {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [projects, setProjects] = useState<Project[]>([...siteData.projects]);
  const [experience, setExperience] = useState<WorkExperience[]>([...siteData.workExperience]);
  const [reviews, setReviews] = useState<Review[]>([...siteData.reviews]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const sidebarItems: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { id: "projects", label: "Projects", icon: <FolderOpen size={18} /> },
    { id: "experience", label: "Experience", icon: <Briefcase size={18} /> },
    { id: "reviews", label: "Reviews", icon: <MessageSquare size={18} /> },
    { id: "services", label: "Services", icon: <Settings size={18} /> },
    { id: "media", label: "Media", icon: <Image size={18} /> },
  ];

  const publishedCount = projects.filter((p) => p.isPublished).length;
  const draftCount = projects.filter((p) => !p.isPublished).length;

  const togglePublish = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isPublished: !p.isPublished } : p))
    );
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "in-progress": return "bg-primary/30 text-foreground";
      case "planning": return "bg-accent/20 text-accent";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-secondary flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-input flex flex-col min-h-screen sticky top-0">
        <div className="p-6 border-b border-input">
          <Link to="/" className="font-heading text-lg font-bold flex items-center gap-2">
            <ChevronLeft size={16} />
            dev_Portfolio
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? "bg-primary text-foreground"
                  : "hover:bg-muted"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-input">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
              <span className="text-xs font-bold text-accent">A</span>
            </div>
            <div>
              <p className="text-xs font-semibold">Alex Morgan</p>
              <p className="text-[10px] opacity-60">Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-heading font-bold uppercase">{activeTab}</h1>
          <Link
            to="/"
            target="_blank"
            className="bg-primary text-foreground px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2"
          >
            <Eye size={14} /> View Site
          </Link>
        </div>

        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { label: "Total Projects", value: projects.length, icon: <FolderOpen size={20} /> },
                { label: "Published", value: publishedCount, icon: <Eye size={20} /> },
                { label: "Drafts", value: draftCount, icon: <EyeOff size={20} /> },
                { label: "Reviews", value: reviews.length, icon: <MessageSquare size={20} /> },
              ].map((stat) => (
                <div key={stat.label} className="bg-card rounded-lg p-6 accent-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      {stat.icon}
                    </div>
                  </div>
                  <p className="text-2xl font-heading font-bold">{stat.value}</p>
                  <p className="text-xs opacity-60 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Recent Projects Table */}
            <div className="bg-card rounded-lg accent-shadow">
              <div className="flex items-center justify-between p-6 border-b border-input">
                <h3 className="font-heading font-bold text-sm">RECENT PROJECTS</h3>
                <button
                  onClick={() => setActiveTab("projects")}
                  className="bg-primary text-foreground px-4 py-1.5 rounded-md text-xs font-semibold"
                >
                  Add New Project
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-input text-left">
                      <th className="px-6 py-3 text-xs uppercase tracking-wider opacity-60">Project Title</th>
                      <th className="px-6 py-3 text-xs uppercase tracking-wider opacity-60">Category</th>
                      <th className="px-6 py-3 text-xs uppercase tracking-wider opacity-60">Status</th>
                      <th className="px-6 py-3 text-xs uppercase tracking-wider opacity-60">Date</th>
                      <th className="px-6 py-3 text-xs uppercase tracking-wider opacity-60">Published</th>
                      <th className="px-6 py-3 text-xs uppercase tracking-wider opacity-60">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.slice(0, 5).map((project) => (
                      <tr key={project.id} className="border-b border-input hover:bg-muted/50">
                        <td className="px-6 py-4 font-medium">{project.title}</td>
                        <td className="px-6 py-4 opacity-70">{project.techStack[0]}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${statusColor(project.status)}`}>
                            {project.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 opacity-70">{project.deadline}</td>
                        <td className="px-6 py-4">
                          <button onClick={() => togglePublish(project.id)}>
                            {project.isPublished ? (
                              <Eye size={16} className="text-green-600" />
                            ) : (
                              <EyeOff size={16} className="text-accent" />
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4 flex gap-2">
                          <button className="p-1.5 hover:bg-muted rounded">
                            <Edit size={14} />
                          </button>
                          <button onClick={() => deleteProject(project.id)} className="p-1.5 hover:bg-destructive/10 rounded text-destructive">
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="bg-card rounded-lg accent-shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-bold">All Projects</h3>
              <button className="bg-primary text-foreground px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2">
                <Plus size={14} /> Add Project
              </button>
            </div>
            <div className="space-y-4">
              {projects.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-4 border border-input rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-heading font-bold text-sm">{p.title}</h4>
                    <p className="text-xs opacity-60 mt-1">{p.description}</p>
                    <div className="flex gap-2 mt-2">
                      {p.techStack.map((t) => (
                        <span key={t} className="text-[10px] bg-secondary px-2 py-0.5 rounded">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${statusColor(p.status)}`}>
                      {p.status}
                    </span>
                    <button onClick={() => togglePublish(p.id)} className="p-2 hover:bg-muted rounded" title="Toggle publish">
                      {p.isPublished ? <Eye size={16} className="text-green-600" /> : <EyeOff size={16} />}
                    </button>
                    <button onClick={() => deleteProject(p.id)} className="p-2 hover:bg-destructive/10 rounded text-destructive">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience Tab */}
        {activeTab === "experience" && (
          <div className="bg-card rounded-lg accent-shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-bold">Work Experience</h3>
              <button className="bg-primary text-foreground px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2">
                <Plus size={14} /> Add Experience
              </button>
            </div>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="p-4 border border-input rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-heading font-bold text-sm">{exp.role}</h4>
                      <p className="text-xs opacity-60">{exp.company} • {exp.duration}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-1.5 hover:bg-muted rounded"><Edit size={14} /></button>
                      <button
                        onClick={() => setExperience((prev) => prev.filter((e) => e.id !== exp.id))}
                        className="p-1.5 hover:bg-destructive/10 rounded text-destructive"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <div className="bg-card rounded-lg accent-shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-bold">Client Reviews</h3>
              <button className="bg-primary text-foreground px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2">
                <Plus size={14} /> Add Review
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-4 border border-input rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-heading font-bold text-sm">{rev.clientName}</h4>
                      <p className="text-xs opacity-60">{rev.company}</p>
                    </div>
                    <button
                      onClick={() => setReviews((prev) => prev.filter((r) => r.id !== rev.id))}
                      className="p-1.5 hover:bg-destructive/10 rounded text-destructive"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <p className="text-xs opacity-70 italic">"{rev.reviewText}"</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === "services" && (
          <div className="bg-card rounded-lg accent-shadow p-6">
            <h3 className="font-heading font-bold mb-6">Manage Services</h3>
            <div className="space-y-4">
              {siteData.services.map((service) => (
                <div key={service.id} className="flex items-center justify-between p-4 border border-input rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      {service.icon}
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm">{service.title}</h4>
                      <p className="text-xs opacity-60">{service.description}</p>
                    </div>
                  </div>
                  <button className="p-1.5 hover:bg-muted rounded"><Edit size={14} /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Media Tab */}
        {activeTab === "media" && (
          <div className="bg-card rounded-lg accent-shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-bold">Media Library</h3>
              <button className="bg-primary text-foreground px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2">
                <Plus size={14} /> Upload
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center border border-input">
                  <Image size={24} className="opacity-30" />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
