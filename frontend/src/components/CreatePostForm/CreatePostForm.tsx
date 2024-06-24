import styles from "./CreatePostForm.module.css";
import Dropzone from "../Dropzone/Dropzone";

export default function CreatePostForm(){
  return (
    <form className={styles.modal}>
      <h3 className={styles.header}>Create Post</h3>
      <Dropzone />
      <textarea 
        className={styles.textInput}
      />
      <button type="submit" className={styles.button}>Create</button>
    </form>
  )
}