import { IComment, IUser } from "../../utils/types"
import { useDispatch } from "react-redux"
import UserInfo from "../UserInfo/UserInfo"
import styles from "./Comment.module.css"
import { deleteCommentThunk, editCommentThunk } from "../../store/posts"
import { timeAgo } from "../../utils/utils"
import { useState } from "react"
import { GoGear } from "react-icons/go"

// const FAKE_USER: IUser = {
//   id: 999,
//   name: "Fake User",
//   username: "fakeuser",
//   email: "fake@user.com",
//   bio: "I'm a fake user",
//   updatedAt: new Date(),
//   createdAt: new Date()
// }

interface CommentComponent {
  comment: IComment;
}

export default function Comment({ comment }: CommentComponent){
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>(comment.content)

  const handleDelete = () => {
    dispatch(deleteCommentThunk(comment.id, comment.postId) as any);
  }

  const handleEdit = () => {
    if (isEditing) {
      dispatch(editCommentThunk(comment.id, comment.postId, commentText) as any);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  }

  return (
    <article className={styles.comment}>
      <div className={styles.upperInfo}>
        <UserInfo user={comment.author} noImage noName />
        <p className={styles.date}>{timeAgo(comment.updatedAt)}{comment.createdAt !== comment.updatedAt && " (edited)"}</p>
      </div>
      <div className={styles.middle}>
        {
          isEditing ?
          <input 
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          : 
          <p className={styles.body}>
            {comment.content}
          </p>
        }
        <button>
          <GoGear onClick={handleEdit} />
        </button>
      </div>
      <button className={styles.button} onClick={handleDelete}>Delete</button>
    </article>
  )
}