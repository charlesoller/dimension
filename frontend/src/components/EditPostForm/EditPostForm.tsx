// @ts-nocheck

import { useState } from "react"
import { useModal } from "../../context/Modal";
import styles from "./EditPostForm.module.css"
import { useDispatch } from "react-redux";
import { deletePostThunk, updatePostThunk } from "../../store/posts";
import ButtonGroup from "../ButtonGroup/ButtonGroup";

export default function EditPostForm({ post }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [description, setDescription] = useState<string>(post.description);
  const [loading, setLoading] = useState<boolean>(false);

  const handleEdit = async (e) => {
    setLoading(true);
    e.preventDefault();
    dispatch(updatePostThunk(post.id, description));
    setLoading(false);
    closeModal()
  }

  const handleDelete = () => {
    dispatch(deletePostThunk(post.id));
    closeModal();
  }

  return (
    <form onSubmit={handleEdit}>
      <textarea
        className={styles.textInput}
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <ButtonGroup
        primaryButtonText="Submit"
        primaryButtonOnClick={handleEdit}
        secondaryButtonText="Close"
        secondaryButtonOnClick={closeModal}
        tertiaryButtonText="Delete"
        tertiaryButtonOnClick={handleDelete}
        disabled={loading}
      >
        
      </ButtonGroup>
    </form>
  )
}