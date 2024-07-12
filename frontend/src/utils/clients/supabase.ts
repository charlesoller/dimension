
import { createClient } from "@supabase/supabase-js";
const BUCKET_NAME = "dimension";

export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLIC_KEY);

export const uploadFile = async (file: File) => {
  console.log("FILE SUPABASE: ", file)
  const time = Math.abs(new Date().getTime());
  const fileName = `${file.name}_${time}`;
  const { data: uploadData, error: uploadError } = await supabase
    .storage
    .from(BUCKET_NAME)
    .upload(fileName, file, {
      upsert: true
    });
  console.log("UPLOADED: ", uploadData)
  if (uploadError) {
    console.error("Error in uploading: ", uploadError)
    return { success: false, data: uploadError.message };
  } else {
    const { data: getData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(uploadData.path);
    if (!getData) return { success: false, data: "Unable to retrive file's public URL."};

    return { success: true, data: getData.publicUrl };
  }
}