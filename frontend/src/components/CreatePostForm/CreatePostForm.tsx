import styles from "./CreatePostForm.module.css";
import Dropzone from "../Dropzone/Dropzone";
import { useState } from "react";
import { createPost } from "../../utils/api";
import { useDispatch } from "react-redux";
import { createPostThunk } from "../../store/posts";
import { uploadFile } from "../../utils/clients/supabase";
import { useModal } from "../../context/Modal";

export default function CreatePostForm(){
  const { closeModal } = useModal()
  const dispatch = useDispatch();
  const [file, setFile] = useState<File>(null);
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileUpload = (uploadedFile: File) => {
    console.log(uploadedFile)
    setFile(uploadedFile);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { success, data } = await uploadFile(file);
    if (!success) {
      console.log({success, data})
      return { success, data };
    }
    
    dispatch(createPostThunk({ description, url: data }) as any);
    closeModal();
    setLoading(false);
  }

  return (
    <form className={styles.modal} onSubmit={handleSubmit}>
      <h3 className={styles.header}>Create Post</h3>
      <Dropzone 
        handleFileUpload={handleFileUpload}
      />
      { file && file.name }
      <textarea 
        className={styles.textInput}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={loading}
      />
      <button 
        type="submit" 
        className={styles.button}
        disabled={loading}
      >
        Create
      </button>
    </form>
  )
}