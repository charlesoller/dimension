import { useState } from "react"
import { useModal } from "../../context/Modal";
import styles from "./EditPostForm.module.css"
import { useDispatch } from "react-redux";
import { deletePostThunk, updatePostThunk } from "../../store/posts";

export default function EditPostForm({ post }){
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [description, setDescription] = useState<string>(post.description);

  const handleEdit = async (e) => {
    e.preventDefault();
    dispatch(updatePostThunk(post.id, description));
    closeModal()
  }

  const handleDelete = () => {
    dispatch(deletePostThunk(post.id));
    closeModal();
  }
  
  return (
    <div className={styles.modal}>
      <h5 className={styles.header}>Edit Post</h5>
      <form onSubmit={handleEdit}>
        <textarea
          className={styles.textInput}
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <div className={styles.buttonGroup}>
          <button type="button" className={styles.button} onClick={handleDelete}>Delete</button>      
          <button type="submit" className={styles.button}>Submit</button>
        </div>
      </form>
    </div>
  )
}