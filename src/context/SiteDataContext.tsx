import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
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
}

interface SiteDataContextType extends SiteDataState {
  // Projects
  addProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  togglePublish: (id: string) => void;
  // Experience
  addExperience: (exp: WorkExperience) => void;
  updateExperience: (id: string, exp: Partial<WorkExperience>) => void;
  deleteExperience: (id: string) => void;
  // Reviews
  addReview: (review: Review) => void;
  updateReview: (id: string, review: Partial<Review>) => void;
  deleteReview: (id: string) => void;
  // Services
  updateService: (id: string, service: Partial<Service>) => void;
  // Resume
  setResumeUrl: (url: string) => void;
  // Media
  addMedia: (item: MediaItem) => void;
  deleteMedia: (id: string) => void;
  updateMedia: (id: string, item: Partial<MediaItem>) => void;
}

const STORAGE_KEY = "portfolio_site_data";

function loadFromStorage(): SiteDataState | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return null;
}

function saveToStorage(state: SiteDataState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

const SiteDataContext = createContext<SiteDataContextType | null>(null);

export const useSiteData = () => {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error("useSiteData must be used within SiteDataProvider");
  return ctx;
};

export const SiteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<SiteDataState>(() => {
    const stored = loadFromStorage();
    return stored || {
      projects: [...siteData.projects],
      workExperience: [...siteData.workExperience],
      reviews: [...siteData.reviews],
      services: [...siteData.services],
      resumeUrl: siteData.personalInfo.resumeLink,
      media: [],
    };
  });

  useEffect(() => {
    saveToStorage(state);
  }, [state]);

  const addProject = useCallback((project: Project) => {
    setState(prev => ({ ...prev, projects: [...prev.projects, project] }));
  }, []);

  const updateProject = useCallback((id: string, updates: Partial<Project>) => {
    setState(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, ...updates } : p),
    }));
  }, []);

  const deleteProject = useCallback((id: string) => {
    setState(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
  }, []);

  const togglePublish = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, isPublished: !p.isPublished } : p),
    }));
  }, []);

  const addExperience = useCallback((exp: WorkExperience) => {
    setState(prev => ({ ...prev, workExperience: [...prev.workExperience, exp] }));
  }, []);

  const updateExperience = useCallback((id: string, updates: Partial<WorkExperience>) => {
    setState(prev => ({
      ...prev,
      workExperience: prev.workExperience.map(e => e.id === id ? { ...e, ...updates } : e),
    }));
  }, []);

  const deleteExperience = useCallback((id: string) => {
    setState(prev => ({ ...prev, workExperience: prev.workExperience.filter(e => e.id !== id) }));
  }, []);

  const addReview = useCallback((review: Review) => {
    setState(prev => ({ ...prev, reviews: [...prev.reviews, review] }));
  }, []);

  const updateReview = useCallback((id: string, updates: Partial<Review>) => {
    setState(prev => ({
      ...prev,
      reviews: prev.reviews.map(r => r.id === id ? { ...r, ...updates } : r),
    }));
  }, []);

  const deleteReview = useCallback((id: string) => {
    setState(prev => ({ ...prev, reviews: prev.reviews.filter(r => r.id !== id) }));
  }, []);

  const updateService = useCallback((id: string, updates: Partial<Service>) => {
    setState(prev => ({
      ...prev,
      services: prev.services.map(s => s.id === id ? { ...s, ...updates } : s),
    }));
  }, []);

  const setResumeUrl = useCallback((url: string) => {
    setState(prev => ({ ...prev, resumeUrl: url }));
  }, []);

  const addMedia = useCallback((item: MediaItem) => {
    setState(prev => ({ ...prev, media: [...prev.media, item] }));
  }, []);

  const deleteMedia = useCallback((id: string) => {
    setState(prev => ({ ...prev, media: prev.media.filter(m => m.id !== id) }));
  }, []);

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
    }}>
      {children}
    </SiteDataContext.Provider>
  );
};
