import styles from "./CreatePostForm.module.css";
import Dropzone from "../Dropzone/Dropzone";
import { useState } from "react";
import { createPost } from "../../utils/api";
import { useDispatch } from "react-redux";
import { createPostThunk } from "../../store/posts";
import { uploadFile } from "../../utils/clients/supabase";

export default function CreatePostForm(){
  const dispatch = useDispatch();
  const [file, setFile] = useState<File>(null);
  const [description, setDescription] = useState<string>("");

  const handleFileUpload = (uploadedFile: File[]) => {
    setFile(uploadedFile[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { success, data } = await uploadFile(file);
    if (!success) {
      return { success, data };
    }
    
    dispatch(createPostThunk({ description, url: data }));
    // console.log("After uploading: ", data)
    // const res = await csrfFetch(`${URL}/posts`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     description,
    //     url: data
    //   })
    // })
    // console.log("RES: ", res)
    // return res;
    // await createPost({ file, description });
  }

  return (
    <form className={styles.modal} onSubmit={handleSubmit}>
      <h3 className={styles.header}>Create Post</h3>
      <Dropzone 
        handleFileUpload={handleFileUpload}
      />
      <textarea 
        className={styles.textInput}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" className={styles.button}>Create</button>
    </form>
  )
}