import { IComment, IUser } from "../../utils/types"
import { useDispatch, useSelector } from "react-redux"
import UserInfo from "../UserInfo/UserInfo"
import styles from "./Comment.module.css"
import { deleteCommentThunk, editCommentThunk } from "../../store/posts"
import { isOnlyWhitespace, timeAgo } from "../../utils/utils"
import { useState } from "react"
import { GoGear, GoPencil, GoTrash } from "react-icons/go"
import LikeButton from "../LikeButton/LikeButton"

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

export default function Comment({ comment }: CommentComponent) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>(comment.content);
  const currentUser = useSelector((state: any) => state.session.user);

  const handleDelete = () => {
    dispatch(deleteCommentThunk(comment.id, comment.postId) as any);
  }

  const handleEdit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<SVGElement, MouseEvent>) => {
    e.preventDefault();
    if (!commentText.length || isOnlyWhitespace(commentText)) return;
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
        <UserInfo user={comment.author} />
        <div className={styles.dateAndButtons}>
          <p className={styles.date}>{timeAgo(comment.updatedAt)}{comment.createdAt !== comment.updatedAt && " (edited)"}</p>
          {
            currentUser && currentUser.id === comment.authorId ?
              <div className={styles.buttons}>
                <button className={styles.iconButton}>
                  <GoPencil onClick={(e) => handleEdit(e)} />
                </button>
                <button className={styles.iconButton}>
                  <GoTrash onClick={handleDelete} />
                </button>
              </div>
              :
              null
          }
        </div>
      </div>
      <div className={styles.middle}>
        {
          isEditing ?
            <form onSubmit={(e) => handleEdit(e)} className={styles.form}>
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className={styles.input}
              />
            </form>
            :
            <p className={styles.body}>
              {comment.content}
            </p>
        }
      </div>
      <div className={styles.buttons}>
        <LikeButton resource={comment} />
      </div>
    </article>
  )
}