import styles from "./CommentSection.module.css"
import Comment from "../Comment/Comment"
import { useState } from "react";
import { UseDispatch, useDispatch } from "react-redux";
import { IComment } from "../../utils/types";
import { commentPostThunk } from "../../store/posts";

interface CommentSectionComponent {
  postId: number;
  comments: IComment[];
}

export default function CommentSection({ postId, comments }: CommentSectionComponent) {
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState<string>("");

  const handleNewComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(commentPostThunk(postId, newComment) as any)
    setNewComment("");
  }

  const commentElements = comments.map((comment: IComment) => (
    <Comment key={comment.id} comment={comment} />
  ))

  return (
    <div className={styles.commentSection}>
      <div className={styles.comments}>
        { commentElements }
      </div>
      <form onSubmit={handleNewComment} className={styles.form}>
        <input 
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
      </form>
    </div>
  )
}