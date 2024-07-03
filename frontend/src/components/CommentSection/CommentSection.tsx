import styles from "./CommentSection.module.css"
import Comment from "../Comment/Comment"
import { IComment } from "../../utils/types";
import CommentInput from "../CommentInput/CommentInput";

interface CommentSectionComponent {
  postId: number;
  comments: IComment[];
}

export default function CommentSection({ postId, comments }: CommentSectionComponent) {
  const commentElements = comments.map((comment: IComment) => (
    <Comment key={comment.id} comment={comment} />
  ))

  return (
    <div className={styles.commentSection}>
      <div className={styles.comments}>
        { commentElements }
      </div>
      <CommentInput 
        postId={postId}
      />
    </div>
  )
}