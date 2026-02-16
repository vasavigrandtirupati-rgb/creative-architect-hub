import { supabase } from "@/integrations/supabase/client";

export const uploadFile = async (
  bucket: string,
  file: File,
  folder?: string
): Promise<string> => {
  const ext = file.name.split(".").pop();
  const fileName = `${folder ? folder + "/" : ""}${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage.from(bucket).upload(fileName, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) throw error;

  const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
  return data.publicUrl;
};

export const deleteFile = async (bucket: string, url: string) => {
  try {
    const path = url.split(`/storage/v1/object/public/${bucket}/`)[1];
    if (path) {
      await supabase.storage.from(bucket).remove([path]);
    }
  } catch {
    // ignore deletion errors
  }
};
