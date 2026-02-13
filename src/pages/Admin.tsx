import { useState, useRef, memo } from "react";
import { Link } from "react-router-dom";
import { useSiteData, MediaItem } from "@/context/SiteDataContext";
import { Project, WorkExperience, Review } from "@/data/data";
import {
  LayoutDashboard, FolderOpen, Briefcase, MessageSquare, Settings, Image as ImageIcon,
  Plus, Edit, Trash2, Eye, EyeOff, ChevronLeft, X, Check, Upload, FileText, Star, Circle,
} from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";

type Tab = "dashboard" | "projects" | "experience" | "reviews" | "services" | "media";

// ─── Input component helper (outside Admin to prevent re-mount) ───
const InputField = memo(({ label, value, onChange, placeholder, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) => (
  <div>
    <label className="text-xs font-semibold uppercase tracking-wider opacity-60 block mb-1">{label}</label>
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      className="w-full bg-secondary border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
  </div>
));
InputField.displayName = "InputField";

const emptyProject: Project = {
  id: "", title: "", description: "", techStack: [], status: "idea",
  tasks: [], deadline: "", image: "", liveLink: "", githubLink: "", isPublished: false,
};

const emptyExperience: WorkExperience = {
  id: "", company: "", role: "", duration: "", contributions: [],
};

const emptyReview: Review = {
  id: "", clientName: "", company: "", image: "", reviewText: "", rating: 5,
};

// Helper to read file as data URL
const readFileAsDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const Admin = () => {
  const {
    projects, workExperience, reviews, services, resumeUrl, media,
    addProject, updateProject, deleteProject, togglePublish,
    addExperience, updateExperience, deleteExperience,
    addReview, updateReview, deleteReview,
    updateService, setResumeUrl,
    addMedia, deleteMedia, updateMedia,
  } = useSiteData();

  const [activeTab, setActiveTab] = useState<Tab>("dashboard");

  // Modals
  const [projectModal, setProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project>(emptyProject);
  const [expModal, setExpModal] = useState(false);
  const [editingExp, setEditingExp] = useState<WorkExperience>(emptyExperience);
  const [reviewModal, setReviewModal] = useState(false);
  const [editingReview, setEditingReview] = useState<Review>(emptyReview);
  const [resumeModal, setResumeModal] = useState(false);

  // Temp fields
  const [techInput, setTechInput] = useState("");
  const [taskInput, setTaskInput] = useState("");
  const [contribInput, setContribInput] = useState("");
  const [projectImages, setProjectImages] = useState<string[]>([]);
  const [reviewerImage, setReviewerImage] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  const publishedCount = projects.filter(p => p.isPublished).length;
  const draftCount = projects.filter(p => !p.isPublished).length;

  const sidebarItems: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { id: "projects", label: "Projects", icon: <FolderOpen size={18} /> },
    { id: "experience", label: "Experience", icon: <Briefcase size={18} /> },
    { id: "reviews", label: "Reviews", icon: <MessageSquare size={18} /> },
    { id: "services", label: "Services", icon: <Settings size={18} /> },
    { id: "media", label: "Media", icon: <ImageIcon size={18} /> },
  ];

  const statusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "in-progress": return "bg-primary/30 text-foreground";
      case "planning": return "bg-accent/20 text-accent";
      default: return "bg-muted text-muted-foreground";
    }
  };

  // ─── Project CRUD ───
  const openProjectModal = (project?: Project) => {
    if (project) {
      setEditingProject({ ...project });
      setProjectImages(project.image ? project.image.split(",").filter(Boolean) : []);
    } else {
      setEditingProject({ ...emptyProject, id: Date.now().toString() });
      setProjectImages([]);
    }
    setTechInput("");
    setTaskInput("");
    setProjectModal(true);
  };

  const handleProjectImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;
      const url = await readFileAsDataUrl(file);
      setProjectImages(prev => [...prev, url]);
    }
    e.target.value = "";
  };

  const saveProject = () => {
    const proj = { ...editingProject, image: projectImages.join(",") };
    if (projects.find(p => p.id === proj.id)) {
      updateProject(proj.id, proj);
    } else {
      addProject(proj);
    }
    setProjectModal(false);
  };

  // ─── Experience CRUD ───
  const openExpModal = (exp?: WorkExperience) => {
    if (exp) {
      setEditingExp({ ...exp });
    } else {
      setEditingExp({ ...emptyExperience, id: Date.now().toString() });
    }
    setContribInput("");
    setExpModal(true);
  };

  const saveExperience = () => {
    if (workExperience.find(e => e.id === editingExp.id)) {
      updateExperience(editingExp.id, editingExp);
    } else {
      addExperience(editingExp);
    }
    setExpModal(false);
  };

  // ─── Review CRUD ───
  const openReviewModal = (rev?: Review) => {
    if (rev) {
      setEditingReview({ ...rev });
      setReviewerImage(rev.image || "");
    } else {
      setEditingReview({ ...emptyReview, id: Date.now().toString() });
      setReviewerImage("");
    }
    setReviewModal(true);
  };

  const handleReviewerImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const url = await readFileAsDataUrl(file);
    setReviewerImage(url);
    e.target.value = "";
  };

  const saveReview = () => {
    const rev = { ...editingReview, image: reviewerImage };
    if (reviews.find(r => r.id === rev.id)) {
      updateReview(rev.id, rev);
    } else {
      addReview(rev);
    }
    setReviewModal(false);
  };

  // ─── Media ───
  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    for (const file of Array.from(files)) {
      const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) continue;
      const url = await readFileAsDataUrl(file);
      const item: MediaItem = {
        id: Date.now().toString() + Math.random().toString(36).slice(2),
        name: file.name,
        url,
        type: file.type,
        size: file.size,
        uploadedAt: new Date().toISOString(),
      };
      addMedia(item);
    }
    e.target.value = "";
  };

  // ─── Resume ───
  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await readFileAsDataUrl(file);
    setResumeUrl(url);
    e.target.value = "";
    setResumeModal(false);
  };

  // InputField moved outside component to prevent focus loss

  return (
    <div className="min-h-screen bg-secondary flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-input flex flex-col min-h-screen sticky top-0">
        <div className="p-6 border-b border-input">
          <Link to="/" className="font-heading text-lg font-bold flex items-center gap-2">
            <ChevronLeft size={16} /> dev_Portfolio
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === item.id ? "bg-primary text-foreground" : "hover:bg-muted"
              }`}>
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
        {/* Resume upload button */}
        <div className="p-4 border-t border-input space-y-3">
          <button onClick={() => setResumeModal(true)}
            className="w-full flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors">
            <FileText size={16} /> Manage Resume
          </button>
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
          <Link to="/" target="_blank"
            className="bg-primary text-foreground px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2">
            <Eye size={14} /> View Site
          </Link>
        </div>

        {/* ─── DASHBOARD ─── */}
        {activeTab === "dashboard" && (
          <div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { label: "Total Projects", value: projects.length, icon: <FolderOpen size={20} /> },
                { label: "Published", value: publishedCount, icon: <Eye size={20} /> },
                { label: "Drafts", value: draftCount, icon: <EyeOff size={20} /> },
                { label: "Reviews", value: reviews.length, icon: <MessageSquare size={20} /> },
              ].map(stat => (
                <div key={stat.label} className="bg-card rounded-lg p-6 accent-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">{stat.icon}</div>
                  </div>
                  <p className="text-2xl font-heading font-bold">{stat.value}</p>
                  <p className="text-xs opacity-60 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="bg-card rounded-lg accent-shadow">
              <div className="flex items-center justify-between p-6 border-b border-input">
                <h3 className="font-heading font-bold text-sm">RECENT PROJECTS</h3>
                <button onClick={() => { setActiveTab("projects"); openProjectModal(); }}
                  className="bg-primary text-foreground px-4 py-1.5 rounded-md text-xs font-semibold">Add New Project</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-input text-left">
                      <th className="px-6 py-3 text-xs uppercase tracking-wider opacity-60">Project</th>
                      <th className="px-6 py-3 text-xs uppercase tracking-wider opacity-60">Status</th>
                      <th className="px-6 py-3 text-xs uppercase tracking-wider opacity-60">Published</th>
                      <th className="px-6 py-3 text-xs uppercase tracking-wider opacity-60">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.slice(0, 5).map(project => (
                      <tr key={project.id} className="border-b border-input hover:bg-muted/50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {project.image?.split(",")[0] ? (
                              <img src={project.image.split(",")[0]} alt="" className="w-10 h-10 rounded object-cover" />
                            ) : (
                              <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                                <ImageIcon size={14} className="opacity-40" />
                              </div>
                            )}
                            <div>
                              <p className="font-medium">{project.title}</p>
                              <p className="text-xs opacity-60">{project.techStack.slice(0, 2).join(", ")}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${statusColor(project.status)}`}>{project.status}</span>
                        </td>
                        <td className="px-6 py-4">
                          <button onClick={() => togglePublish(project.id)}>
                            {project.isPublished ? <Eye size={16} className="text-green-600" /> : <EyeOff size={16} className="text-accent" />}
                          </button>
                        </td>
                        <td className="px-6 py-4 flex gap-2">
                          <button onClick={() => openProjectModal(project)} className="p-1.5 hover:bg-muted rounded"><Edit size={14} /></button>
                          <button onClick={() => deleteProject(project.id)} className="p-1.5 hover:bg-destructive/10 rounded text-destructive"><Trash2 size={14} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ─── PROJECTS ─── */}
        {activeTab === "projects" && (
          <div className="bg-card rounded-lg accent-shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-bold">All Projects</h3>
              <button onClick={() => openProjectModal()}
                className="bg-primary text-foreground px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2">
                <Plus size={14} /> Add Project
              </button>
            </div>
            <div className="space-y-4">
              {projects.map(p => (
                <div key={p.id} className="flex items-center justify-between p-4 border border-input rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4 flex-1">
                    {p.image?.split(",")[0] ? (
                      <img src={p.image.split(",")[0]} alt="" className="w-16 h-12 rounded object-cover" />
                    ) : (
                      <div className="w-16 h-12 rounded bg-muted flex items-center justify-center">
                        <ImageIcon size={16} className="opacity-40" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h4 className="font-heading font-bold text-sm">{p.title}</h4>
                      <p className="text-xs opacity-60 mt-1 line-clamp-1">{p.description}</p>
                      <div className="flex gap-2 mt-2">
                        {p.techStack.map(t => (
                          <span key={t} className="text-[10px] bg-secondary px-2 py-0.5 rounded">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${statusColor(p.status)}`}>{p.status}</span>
                    <button onClick={() => togglePublish(p.id)} className="p-2 hover:bg-muted rounded" title="Toggle publish">
                      {p.isPublished ? <Eye size={16} className="text-green-600" /> : <EyeOff size={16} />}
                    </button>
                    <button onClick={() => openProjectModal(p)} className="p-2 hover:bg-muted rounded"><Edit size={16} /></button>
                    <button onClick={() => deleteProject(p.id)} className="p-2 hover:bg-destructive/10 rounded text-destructive"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
              {projects.length === 0 && <p className="text-sm opacity-60 text-center py-8">No projects yet. Add your first project!</p>}
            </div>
          </div>
        )}

        {/* ─── EXPERIENCE ─── */}
        {activeTab === "experience" && (
          <div className="bg-card rounded-lg accent-shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-bold">Work Experience</h3>
              <button onClick={() => openExpModal()}
                className="bg-primary text-foreground px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2">
                <Plus size={14} /> Add Experience
              </button>
            </div>
            <div className="space-y-4">
              {workExperience.map(exp => (
                <div key={exp.id} className="p-4 border border-input rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-heading font-bold text-sm">{exp.role}</h4>
                      <p className="text-xs opacity-60">{exp.company} • {exp.duration}</p>
                      <ul className="mt-2 space-y-1">
                        {exp.contributions.map((c, i) => (
                          <li key={i} className="text-xs opacity-70 flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full bg-accent mt-1.5 shrink-0" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => openExpModal(exp)} className="p-1.5 hover:bg-muted rounded"><Edit size={14} /></button>
                      <button onClick={() => deleteExperience(exp.id)} className="p-1.5 hover:bg-destructive/10 rounded text-destructive"><Trash2 size={14} /></button>
                    </div>
                  </div>
                </div>
              ))}
              {workExperience.length === 0 && <p className="text-sm opacity-60 text-center py-8">No experience entries yet.</p>}
            </div>
          </div>
        )}

        {/* ─── REVIEWS ─── */}
        {activeTab === "reviews" && (
          <div className="bg-card rounded-lg accent-shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-bold">Client Reviews</h3>
              <button onClick={() => openReviewModal()}
                className="bg-primary text-foreground px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2">
                <Plus size={14} /> Add Review
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {reviews.map(rev => (
                <div key={rev.id} className="p-4 border border-input rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {rev.image ? (
                        <img src={rev.image} alt={rev.clientName} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                          <span className="text-xs font-bold text-accent">{rev.clientName.charAt(0)}</span>
                        </div>
                      )}
                      <div>
                        <h4 className="font-heading font-bold text-sm">{rev.clientName}</h4>
                        <p className="text-xs opacity-60">{rev.company}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => openReviewModal(rev)} className="p-1.5 hover:bg-muted rounded"><Edit size={14} /></button>
                      <button onClick={() => deleteReview(rev.id)} className="p-1.5 hover:bg-destructive/10 rounded text-destructive"><Trash2 size={14} /></button>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: rev.rating }).map((_, i) => <Star key={i} size={12} className="fill-primary text-primary" />)}
                  </div>
                  <p className="text-xs opacity-70 italic">"{rev.reviewText}"</p>
                </div>
              ))}
              {reviews.length === 0 && <p className="text-sm opacity-60 text-center py-8 col-span-2">No reviews yet.</p>}
            </div>
          </div>
        )}

        {/* ─── SERVICES ─── */}
        {activeTab === "services" && (
          <div className="bg-card rounded-lg accent-shadow p-6">
            <h3 className="font-heading font-bold mb-6">Manage Services</h3>
            <div className="space-y-4">
              {services.map(service => (
                <div key={service.id} className="flex items-center justify-between p-4 border border-input rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">{service.icon}</div>
                    <div>
                      <h4 className="font-heading font-bold text-sm">{service.title}</h4>
                      <p className="text-xs opacity-60">{service.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => updateService(service.id, { enabled: !service.enabled })}
                      className={`px-3 py-1 rounded text-xs font-medium ${service.enabled ? "bg-green-100 text-green-800" : "bg-muted text-muted-foreground"}`}>
                      {service.enabled ? "Active" : "Disabled"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── MEDIA ─── */}
        {activeTab === "media" && (
          <div className="bg-card rounded-lg accent-shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-bold">Media Library</h3>
              <button onClick={() => mediaInputRef.current?.click()}
                className="bg-primary text-foreground px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2">
                <Upload size={14} /> Upload Files
              </button>
              <input ref={mediaInputRef} type="file" multiple accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
                onChange={handleMediaUpload} className="hidden" />
            </div>
            {media.length === 0 ? (
              <div className="border-2 border-dashed border-input rounded-lg p-12 text-center cursor-pointer hover:border-accent transition-colors"
                onClick={() => mediaInputRef.current?.click()}>
                <ImageIcon size={40} className="mx-auto opacity-30 mb-4" />
                <p className="text-sm opacity-60">Click to upload images (PNG, JPG, JPEG, GIF, WebP)</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {media.map(item => (
                  <div key={item.id} className="relative group rounded-lg overflow-hidden border border-input">
                    <img src={item.url} alt={item.name} className="aspect-square object-cover w-full" />
                    <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button onClick={() => deleteMedia(item.id)}
                        className="p-2 bg-card rounded-full hover:bg-destructive/10 text-destructive">
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="p-2 bg-card">
                      <p className="text-[10px] font-medium truncate">{item.name}</p>
                      <p className="text-[10px] opacity-50">{(item.size / 1024).toFixed(1)} KB</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* ═══════════ PROJECT MODAL ═══════════ */}
      <Dialog open={projectModal} onOpenChange={setProjectModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading">{editingProject.id && projects.find(p => p.id === editingProject.id) ? "Edit" : "Add"} Project</DialogTitle>
            <DialogDescription>Fill in the project details below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <InputField label="Title" value={editingProject.title} onChange={v => setEditingProject(p => ({ ...p, title: v }))} placeholder="Project title" />
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider opacity-60 block mb-1">Description</label>
              <textarea value={editingProject.description} onChange={e => setEditingProject(p => ({ ...p, description: e.target.value }))}
                className="w-full bg-secondary border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent min-h-[80px]"
                placeholder="Project description" />
            </div>

            {/* Tech Stack */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider opacity-60 block mb-1">Tech Stack</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {editingProject.techStack.map(t => (
                  <span key={t} className="text-xs bg-secondary px-2 py-1 rounded flex items-center gap-1">
                    {t}
                    <button onClick={() => setEditingProject(p => ({ ...p, techStack: p.techStack.filter(x => x !== t) }))}><X size={10} /></button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input value={techInput} onChange={e => setTechInput(e.target.value)} placeholder="Add tech..."
                  onKeyDown={e => { if (e.key === "Enter" && techInput.trim()) { setEditingProject(p => ({ ...p, techStack: [...p.techStack, techInput.trim()] })); setTechInput(""); } }}
                  className="flex-1 bg-secondary border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
                <button onClick={() => { if (techInput.trim()) { setEditingProject(p => ({ ...p, techStack: [...p.techStack, techInput.trim()] })); setTechInput(""); } }}
                  className="bg-primary text-foreground px-3 py-2 rounded-md text-sm font-semibold"><Plus size={14} /></button>
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider opacity-60 block mb-1">Status</label>
              <select value={editingProject.status}
                onChange={e => setEditingProject(p => ({ ...p, status: e.target.value as Project["status"] }))}
                className="w-full bg-secondary border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent">
                <option value="idea">Idea</option>
                <option value="planning">Planning</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <InputField label="Deadline" value={editingProject.deadline} onChange={v => setEditingProject(p => ({ ...p, deadline: v }))} type="date" />
            <InputField label="Live Link" value={editingProject.liveLink} onChange={v => setEditingProject(p => ({ ...p, liveLink: v }))} placeholder="https://..." />
            <InputField label="GitHub Link" value={editingProject.githubLink} onChange={v => setEditingProject(p => ({ ...p, githubLink: v }))} placeholder="https://github.com/..." />

            {/* Tasks */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider opacity-60 block mb-1">Tasks</label>
              <div className="space-y-2 mb-2">
                {editingProject.tasks.map((task, i) => (
                  <div key={i} className="flex items-center gap-2 bg-secondary p-2 rounded">
                    <button onClick={() => setEditingProject(p => ({
                      ...p, tasks: p.tasks.map((t, j) => j === i ? { ...t, isCompleted: !t.isCompleted } : t)
                    }))}>
                      {task.isCompleted ? <Check size={14} className="text-green-600" /> : <Circle size={14} className="opacity-40" />}
                    </button>
                    <span className={`text-sm flex-1 ${task.isCompleted ? "line-through opacity-60" : ""}`}>{task.taskName}</span>
                    <button onClick={() => setEditingProject(p => ({ ...p, tasks: p.tasks.filter((_, j) => j !== i) }))}><X size={12} /></button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input value={taskInput} onChange={e => setTaskInput(e.target.value)} placeholder="Add task..."
                  onKeyDown={e => { if (e.key === "Enter" && taskInput.trim()) { setEditingProject(p => ({ ...p, tasks: [...p.tasks, { taskName: taskInput.trim(), isCompleted: false }] })); setTaskInput(""); } }}
                  className="flex-1 bg-secondary border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
                <button onClick={() => { if (taskInput.trim()) { setEditingProject(p => ({ ...p, tasks: [...p.tasks, { taskName: taskInput.trim(), isCompleted: false }] })); setTaskInput(""); } }}
                  className="bg-primary text-foreground px-3 py-2 rounded-md text-sm font-semibold"><Plus size={14} /></button>
              </div>
            </div>

            {/* Project Images */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider opacity-60 block mb-1">Project Photos</label>
              <div className="grid grid-cols-3 gap-2 mb-2">
                {projectImages.map((img, i) => (
                  <div key={i} className="relative group">
                    <img src={img} alt="" className="aspect-video object-cover rounded" />
                    <button onClick={() => setProjectImages(prev => prev.filter((_, j) => j !== i))}
                      className="absolute top-1 right-1 p-1 bg-card rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-destructive">
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-input rounded-md py-3 text-sm opacity-60 hover:border-accent transition-colors flex items-center justify-center gap-2">
                <Upload size={14} /> Upload Photos
              </button>
              <input ref={fileInputRef} type="file" multiple accept="image/*" onChange={handleProjectImageUpload} className="hidden" />
            </div>

            {/* Publish toggle */}
            <div className="flex items-center gap-3">
              <button onClick={() => setEditingProject(p => ({ ...p, isPublished: !p.isPublished }))}
                className={`px-4 py-2 rounded-md text-sm font-semibold ${editingProject.isPublished ? "bg-green-100 text-green-800" : "bg-muted text-muted-foreground"}`}>
                {editingProject.isPublished ? "✓ Published" : "Draft"}
              </button>
            </div>
          </div>
          <DialogFooter>
            <button onClick={() => setProjectModal(false)} className="px-4 py-2 rounded-md text-sm font-medium hover:bg-muted">Cancel</button>
            <button onClick={saveProject} className="bg-primary text-foreground px-6 py-2 rounded-md text-sm font-semibold">Save Project</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ═══════════ EXPERIENCE MODAL ═══════════ */}
      <Dialog open={expModal} onOpenChange={setExpModal}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading">{workExperience.find(e => e.id === editingExp.id) ? "Edit" : "Add"} Experience</DialogTitle>
            <DialogDescription>Fill in the experience details below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <InputField label="Company" value={editingExp.company} onChange={v => setEditingExp(e => ({ ...e, company: v }))} placeholder="Company name" />
            <InputField label="Role" value={editingExp.role} onChange={v => setEditingExp(e => ({ ...e, role: v }))} placeholder="Job title" />
            <InputField label="Duration" value={editingExp.duration} onChange={v => setEditingExp(e => ({ ...e, duration: v }))} placeholder="2020 – 2023" />

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider opacity-60 block mb-1">Key Contributions</label>
              <div className="space-y-2 mb-2">
                {editingExp.contributions.map((c, i) => (
                  <div key={i} className="flex items-center gap-2 bg-secondary p-2 rounded text-sm">
                    <span className="flex-1">{c}</span>
                    <button onClick={() => setEditingExp(e => ({ ...e, contributions: e.contributions.filter((_, j) => j !== i) }))}><X size={12} /></button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input value={contribInput} onChange={e => setContribInput(e.target.value)} placeholder="Add contribution..."
                  onKeyDown={e => { if (e.key === "Enter" && contribInput.trim()) { setEditingExp(p => ({ ...p, contributions: [...p.contributions, contribInput.trim()] })); setContribInput(""); } }}
                  className="flex-1 bg-secondary border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
                <button onClick={() => { if (contribInput.trim()) { setEditingExp(p => ({ ...p, contributions: [...p.contributions, contribInput.trim()] })); setContribInput(""); } }}
                  className="bg-primary text-foreground px-3 py-2 rounded-md text-sm font-semibold"><Plus size={14} /></button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <button onClick={() => setExpModal(false)} className="px-4 py-2 rounded-md text-sm font-medium hover:bg-muted">Cancel</button>
            <button onClick={saveExperience} className="bg-primary text-foreground px-6 py-2 rounded-md text-sm font-semibold">Save</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ═══════════ REVIEW MODAL ═══════════ */}
      <Dialog open={reviewModal} onOpenChange={setReviewModal}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading">{reviews.find(r => r.id === editingReview.id) ? "Edit" : "Add"} Review</DialogTitle>
            <DialogDescription>Fill in the review details below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {/* Reviewer photo */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider opacity-60 block mb-1">Reviewer Photo</label>
              <div className="flex items-center gap-4">
                {reviewerImage ? (
                  <div className="relative">
                    <img src={reviewerImage} alt="" className="w-16 h-16 rounded-full object-cover" />
                    <button onClick={() => setReviewerImage("")}
                      className="absolute -top-1 -right-1 p-0.5 bg-destructive rounded-full text-destructive-foreground"><X size={10} /></button>
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                    <ImageIcon size={20} className="opacity-40" />
                  </div>
                )}
                <button onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = "image/*";
                  input.onchange = (e) => handleReviewerImageUpload(e as any);
                  input.click();
                }} className="text-sm font-medium accent-underline">Upload Photo</button>
              </div>
            </div>

            <InputField label="Client Name" value={editingReview.clientName} onChange={v => setEditingReview(r => ({ ...r, clientName: v }))} placeholder="John Doe" />
            <InputField label="Company" value={editingReview.company} onChange={v => setEditingReview(r => ({ ...r, company: v }))} placeholder="Company name" />

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider opacity-60 block mb-1">Review</label>
              <textarea value={editingReview.reviewText} onChange={e => setEditingReview(r => ({ ...r, reviewText: e.target.value }))}
                className="w-full bg-secondary border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent min-h-[80px]"
                placeholder="What the client said..." />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider opacity-60 block mb-1">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(n => (
                  <button key={n} onClick={() => setEditingReview(r => ({ ...r, rating: n }))}>
                    <Star size={20} className={n <= editingReview.rating ? "fill-primary text-primary" : "text-muted-foreground"} />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <button onClick={() => setReviewModal(false)} className="px-4 py-2 rounded-md text-sm font-medium hover:bg-muted">Cancel</button>
            <button onClick={saveReview} className="bg-primary text-foreground px-6 py-2 rounded-md text-sm font-semibold">Save</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ═══════════ RESUME MODAL ═══════════ */}
      <Dialog open={resumeModal} onOpenChange={setResumeModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading">Manage Resume</DialogTitle>
            <DialogDescription>Upload or update your resume file.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {resumeUrl && resumeUrl !== "#" ? (
              <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                <FileText size={20} className="text-accent" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Resume uploaded</p>
                  <p className="text-xs opacity-60">Click to replace</p>
                </div>
                <button onClick={() => setResumeUrl("#")} className="p-1.5 hover:bg-destructive/10 rounded text-destructive"><Trash2 size={14} /></button>
              </div>
            ) : (
              <p className="text-sm opacity-60">No resume uploaded yet.</p>
            )}
            <button onClick={() => resumeInputRef.current?.click()}
              className="w-full border-2 border-dashed border-input rounded-md py-4 text-sm opacity-60 hover:border-accent transition-colors flex items-center justify-center gap-2">
              <Upload size={14} /> Upload Resume (PDF, DOC, etc.)
            </button>
            <input ref={resumeInputRef} type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} className="hidden" />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
