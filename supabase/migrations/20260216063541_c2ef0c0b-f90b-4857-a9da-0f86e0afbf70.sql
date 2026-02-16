
-- Projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'idea' CHECK (status IN ('idea', 'planning', 'in-progress', 'completed')),
  tasks JSONB NOT NULL DEFAULT '[]',
  deadline TEXT DEFAULT '',
  image_urls TEXT[] NOT NULL DEFAULT '{}',
  live_link TEXT DEFAULT '',
  github_link TEXT DEFAULT '',
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Work Experience table
CREATE TABLE public.work_experience (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  duration TEXT NOT NULL,
  contributions TEXT[] NOT NULL DEFAULT '{}',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Reviews table
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  company TEXT NOT NULL DEFAULT '',
  image_url TEXT DEFAULT '',
  review_text TEXT NOT NULL,
  rating INT NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Media table
CREATE TABLE public.media (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'image/png',
  size BIGINT NOT NULL DEFAULT 0,
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Site settings (resume URL etc)
CREATE TABLE public.site_settings (
  id TEXT PRIMARY KEY DEFAULT 'main',
  resume_url TEXT DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Insert default settings row
INSERT INTO public.site_settings (id) VALUES ('main');

-- Enable RLS on all tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Public read policies (portfolio is public)
CREATE POLICY "Public can read projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public can read experience" ON public.work_experience FOR SELECT USING (true);
CREATE POLICY "Public can read reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Public can read media" ON public.media FOR SELECT USING (true);
CREATE POLICY "Public can read settings" ON public.site_settings FOR SELECT USING (true);

-- Authenticated write policies (admin)
CREATE POLICY "Auth can insert projects" ON public.projects FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth can update projects" ON public.projects FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth can delete projects" ON public.projects FOR DELETE TO authenticated USING (true);

CREATE POLICY "Auth can insert experience" ON public.work_experience FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth can update experience" ON public.work_experience FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth can delete experience" ON public.work_experience FOR DELETE TO authenticated USING (true);

CREATE POLICY "Auth can insert reviews" ON public.reviews FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth can update reviews" ON public.reviews FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth can delete reviews" ON public.reviews FOR DELETE TO authenticated USING (true);

CREATE POLICY "Auth can insert media" ON public.media FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth can update media" ON public.media FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth can delete media" ON public.media FOR DELETE TO authenticated USING (true);

CREATE POLICY "Auth can update settings" ON public.site_settings FOR UPDATE TO authenticated USING (true);

-- Storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('project-images', 'project-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('review-images', 'review-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('media-files', 'media-files', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('resumes', 'resumes', true);

-- Storage policies: public read
CREATE POLICY "Public read project images" ON storage.objects FOR SELECT USING (bucket_id = 'project-images');
CREATE POLICY "Public read review images" ON storage.objects FOR SELECT USING (bucket_id = 'review-images');
CREATE POLICY "Public read media files" ON storage.objects FOR SELECT USING (bucket_id = 'media-files');
CREATE POLICY "Public read resumes" ON storage.objects FOR SELECT USING (bucket_id = 'resumes');

-- Storage policies: auth write
CREATE POLICY "Auth upload project images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'project-images');
CREATE POLICY "Auth upload review images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'review-images');
CREATE POLICY "Auth upload media files" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'media-files');
CREATE POLICY "Auth upload resumes" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'resumes');

CREATE POLICY "Auth update project images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'project-images');
CREATE POLICY "Auth update review images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'review-images');
CREATE POLICY "Auth update media files" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'media-files');
CREATE POLICY "Auth update resumes" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'resumes');

CREATE POLICY "Auth delete project images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'project-images');
CREATE POLICY "Auth delete review images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'review-images');
CREATE POLICY "Auth delete media files" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'media-files');
CREATE POLICY "Auth delete resumes" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'resumes');

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
