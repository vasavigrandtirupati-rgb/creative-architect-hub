
-- Create contact_messages table
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  project_type TEXT NOT NULL DEFAULT 'Web Application',
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a contact message
CREATE POLICY "Anyone can insert contact messages"
ON public.contact_messages
FOR INSERT
WITH CHECK (true);

-- Only authenticated users can read messages
CREATE POLICY "Auth can read contact messages"
ON public.contact_messages
FOR SELECT
USING (true);

-- Only authenticated users can update messages (mark as read)
CREATE POLICY "Auth can update contact messages"
ON public.contact_messages
FOR UPDATE
USING (true);

-- Only authenticated users can delete messages
CREATE POLICY "Auth can delete contact messages"
ON public.contact_messages
FOR DELETE
USING (true);
