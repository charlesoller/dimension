import styles from "./CommentInput.module.css"

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentPostThunk } from "../../store/posts";
import { isOnlyWhitespace } from "../../utils/utils";

interface CommentInputComponent {
  postId: number;
}

export default function CommentInput({ postId }: CommentInputComponent){
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState<string>("");
  const currentUser = useSelector((state: any) => state.session.user);

  const handleNewComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newComment.length || isOnlyWhitespace(newComment)) return;

    dispatch(commentPostThunk(postId, newComment) as any)
    setNewComment("");
  }

  if (!currentUser) return null;
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