import { uploadFile } from "./clients/supabase";
import { csrfFetch } from "./csrf";
import { PostData } from "./types";
const URL = "http://localhost:8000/api"

export const createPost = async (postData: PostData) => {
  const { file, description } = postData;

  const { success, data } = await uploadFile(file);
  if (!success) {
    return { success, data };
  }

  const res = await csrfFetch(`${URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      description,
      url: data
    })
  })
  
  return res;
}