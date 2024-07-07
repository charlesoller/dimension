import styles from "./CommentInput.module.css"

import { useState } from "react";
import { useDispatch } from "react-redux";
import { commentPostThunk } from "../../store/posts";

interface CommentInputComponent {
  postId: number;
}

export default function CommentInput({ postId }: CommentInputComponent){
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState<string>("");

  const handleNewComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(commentPostThunk(postId, newComment) as any)
    setNewComment("");
  }

  return (
    <form onSubmit={handleNewComment} className={styles.form}>
      <input 
        className={styles.input}
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Comment"
      />
    </form>
  )
}