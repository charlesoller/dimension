import styles from "./CreatePostForm.module.css";
import Dropzone from "../Dropzone/Dropzone";
import { useState } from "react";
import { createPost } from "../../utils/api";

export default function CreatePostForm(){
  const [file, setFile] = useState<File>(null);
  const [description, setDescription] = useState<string>("");

  const handleFileUpload = (uploadedFile: File[]) => {
    setFile(uploadedFile[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createPost({ file, description });
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