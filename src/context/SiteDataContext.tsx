import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { siteData, Project, WorkExperience, Review, Service } from "@/data/data";

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: string;
}

interface SiteDataState {
  projects: Project[];
  workExperience: WorkExperience[];
  reviews: Review[];
  services: Service[];
  resumeUrl: string;
  media: MediaItem[];
  loading: boolean;
}

interface SiteDataContextType extends SiteDataState {
  addProject: (project: Project) => Promise<void>;
  updateProject: (id: string, project: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  togglePublish: (id: string) => Promise<void>;
  addExperience: (exp: WorkExperience) => Promise<void>;
  updateExperience: (id: string, exp: Partial<WorkExperience>) => Promise<void>;
  deleteExperience: (id: string) => Promise<void>;
  addReview: (review: Review) => Promise<void>;
  updateReview: (id: string, review: Partial<Review>) => Promise<void>;
  deleteReview: (id: string) => Promise<void>;
  updateService: (id: string, service: Partial<Service>) => void;
  setResumeUrl: (url: string) => Promise<void>;
  addMedia: (item: MediaItem) => Promise<void>;
  deleteMedia: (id: string) => Promise<void>;
  updateMedia: (id: string, item: Partial<MediaItem>) => void;
  refreshData: () => Promise<void>;
}

const SiteDataContext = createContext<SiteDataContextType | null>(null);

export const useSiteData = () => {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error("useSiteData must be used within SiteDataProvider");
  return ctx;
};

// Map DB row to Project type
const mapProject = (row: any): Project => ({
  id: row.id,
  title: row.title,
  description: row.description || "",
  techStack: row.tech_stack || [],
  status: row.status || "idea",
  tasks: (row.tasks as any[]) || [],
  deadline: row.deadline || "",
  image: (row.image_urls || []).join(","),
  liveLink: row.live_link || "",
  githubLink: row.github_link || "",
  isPublished: row.is_published || false,
});

const mapExperience = (row: any): WorkExperience => ({
  id: row.id,
  company: row.company,
  role: row.role,
  duration: row.duration,
  contributions: row.contributions || [],
});

const mapReview = (row: any): Review => ({
  id: row.id,
  clientName: row.client_name,
  company: row.company || "",
  image: row.image_url || "",
  reviewText: row.review_text,
  rating: row.rating,
});

const mapMedia = (row: any): MediaItem => ({
  id: row.id,
  name: row.name,
  url: row.url,
  type: row.type,
  size: Number(row.size),
  uploadedAt: row.uploaded_at,
});

export const SiteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<SiteDataState>({
    projects: [],
    workExperience: [],
    reviews: [],
    services: [...siteData.services],
    resumeUrl: "#",
    media: [],
    loading: true,
  });

  const fetchAll = useCallback(async () => {
    try {
      const [pRes, eRes, rRes, mRes, sRes] = await Promise.all([
        supabase.from("projects").select("*").order("created_at", { ascending: false }),
        supabase.from("work_experience").select("*").order("sort_order", { ascending: true }),
        supabase.from("reviews").select("*").order("created_at", { ascending: false }),
        supabase.from("media").select("*").order("uploaded_at", { ascending: false }),
        supabase.from("site_settings").select("*").eq("id", "main").maybeSingle(),
      ]);

      setState(prev => ({
        ...prev,
        projects: (pRes.data || []).map(mapProject),
        workExperience: (eRes.data || []).map(mapExperience),
        reviews: (rRes.data || []).map(mapReview),
        media: (mRes.data || []).map(mapMedia),
        resumeUrl: sRes.data?.resume_url || "#",
        loading: false,
      }));
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // ─── Projects ───
  const addProject = useCallback(async (project: Project) => {
    const imageUrls = project.image ? project.image.split(",").filter(Boolean) : [];
    const { error } = await supabase.from("projects").insert({
      title: project.title,
      description: project.description,
      tech_stack: project.techStack,
      status: project.status,
      tasks: project.tasks as any,
      deadline: project.deadline,
      image_urls: imageUrls,
      live_link: project.liveLink,
      github_link: project.githubLink,
      is_published: project.isPublished,
    });
    if (error) throw error;
    await fetchAll();
  }, [fetchAll]);

  const updateProject = useCallback(async (id: string, updates: Partial<Project>) => {
    const dbUpdates: any = {};
    if (updates.title !== undefined) dbUpdates.title = updates.title;
    if (updates.description !== undefined) dbUpdates.description = updates.description;
    if (updates.techStack !== undefined) dbUpdates.tech_stack = updates.techStack;
    if (updates.status !== undefined) dbUpdates.status = updates.status;
    if (updates.tasks !== undefined) dbUpdates.tasks = updates.tasks;
    if (updates.deadline !== undefined) dbUpdates.deadline = updates.deadline;
    if (updates.image !== undefined) dbUpdates.image_urls = updates.image.split(",").filter(Boolean);
    if (updates.liveLink !== undefined) dbUpdates.live_link = updates.liveLink;
    if (updates.githubLink !== undefined) dbUpdates.github_link = updates.githubLink;
    if (updates.isPublished !== undefined) dbUpdates.is_published = updates.isPublished;
    const { error } = await supabase.from("projects").update(dbUpdates).eq("id", id);
    if (error) throw error;
    await fetchAll();
  }, [fetchAll]);

  const deleteProject = useCallback(async (id: string) => {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) throw error;
    await fetchAll();
  }, [fetchAll]);

  const togglePublish = useCallback(async (id: string) => {
    const project = state.projects.find(p => p.id === id);
    if (!project) return;
    await updateProject(id, { isPublished: !project.isPublished });
  }, [state.projects, updateProject]);

  // ─── Experience ───
  const addExperience = useCallback(async (exp: WorkExperience) => {
    const { error } = await supabase.from("work_experience").insert({
      company: exp.company,
      role: exp.role,
      duration: exp.duration,
      contributions: exp.contributions,
    });
    if (error) throw error;
    await fetchAll();
  }, [fetchAll]);

  const updateExperience = useCallback(async (id: string, updates: Partial<WorkExperience>) => {
    const dbUpdates: any = {};
    if (updates.company !== undefined) dbUpdates.company = updates.company;
    if (updates.role !== undefined) dbUpdates.role = updates.role;
    if (updates.duration !== undefined) dbUpdates.duration = updates.duration;
    if (updates.contributions !== undefined) dbUpdates.contributions = updates.contributions;
    const { error } = await supabase.from("work_experience").update(dbUpdates).eq("id", id);
    if (error) throw error;
    await fetchAll();
  }, [fetchAll]);

  const deleteExperience = useCallback(async (id: string) => {
    const { error } = await supabase.from("work_experience").delete().eq("id", id);
    if (error) throw error;
    await fetchAll();
  }, [fetchAll]);

  // ─── Reviews ───
  const addReview = useCallback(async (review: Review) => {
    const { error } = await supabase.from("reviews").insert({
      client_name: review.clientName,
      company: review.company,
      image_url: review.image,
      review_text: review.reviewText,
      rating: review.rating,
    });
    if (error) throw error;
    await fetchAll();
  }, [fetchAll]);

  const updateReview = useCallback(async (id: string, updates: Partial<Review>) => {
    const dbUpdates: any = {};
    if (updates.clientName !== undefined) dbUpdates.client_name = updates.clientName;
    if (updates.company !== undefined) dbUpdates.company = updates.company;
    if (updates.image !== undefined) dbUpdates.image_url = updates.image;
    if (updates.reviewText !== undefined) dbUpdates.review_text = updates.reviewText;
    if (updates.rating !== undefined) dbUpdates.rating = updates.rating;
    const { error } = await supabase.from("reviews").update(dbUpdates).eq("id", id);
    if (error) throw error;
    await fetchAll();
  }, [fetchAll]);

  const deleteReview = useCallback(async (id: string) => {
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) throw error;
    await fetchAll();
  }, [fetchAll]);

  // ─── Services (still local, icon is React element) ───
  const updateService = useCallback((id: string, updates: Partial<Service>) => {
    setState(prev => ({
      ...prev,
      services: prev.services.map(s => s.id === id ? { ...s, ...updates } : s),
    }));
  }, []);

  // ─── Resume ───
  const setResumeUrl = useCallback(async (url: string) => {
    const { error } = await supabase
      .from("site_settings")
      .update({ resume_url: url })
      .eq("id", "main");
    if (error) throw error;
    setState(prev => ({ ...prev, resumeUrl: url }));
  }, []);

  // ─── Media ───
  const addMedia = useCallback(async (item: MediaItem) => {
    const { error } = await supabase.from("media").insert({
      name: item.name,
      url: item.url,
      type: item.type,
      size: item.size,
    });
    if (error) throw error;
    await fetchAll();
  }, [fetchAll]);

  const deleteMedia = useCallback(async (id: string) => {
    const { error } = await supabase.from("media").delete().eq("id", id);
    if (error) throw error;
    await fetchAll();
  }, [fetchAll]);

  const updateMedia = useCallback((id: string, updates: Partial<MediaItem>) => {
    setState(prev => ({
      ...prev,
      media: prev.media.map(m => m.id === id ? { ...m, ...updates } : m),
    }));
  }, []);

  return (
    <SiteDataContext.Provider value={{
      ...state,
      addProject, updateProject, deleteProject, togglePublish,
      addExperience, updateExperience, deleteExperience,
      addReview, updateReview, deleteReview,
      updateService, setResumeUrl,
      addMedia, deleteMedia, updateMedia,
      refreshData: fetchAll,
    }}>
      {children}
    </SiteDataContext.Provider>
  );
};
