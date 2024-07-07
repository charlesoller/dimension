import styles from "./PostInfo.module.css"

// Components
import UserInfo from "../UserInfo/UserInfo";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import EditPostForm from "../EditPostForm/EditPostForm";
import CommentSection from "../CommentSection/CommentSection";
import CommentInput from "../CommentInput/CommentInput";
import { GoGear } from "react-icons/go";
// Util
import { useSelector } from "react-redux";
import { timeAgo } from "../../utils/utils";
// Types
import { IPost, IUser } from "../../utils/types"


interface PostInfoComponent {
  post: IPost;
}

export default function PostInfo({ post }: PostInfoComponent){
  const currentUser = useSelector((state: any) => state.session.user);
  return (
    <section className={styles.main}>
      <div className={styles.userDetails}>
        <div className={styles.upper}>
          <div className={styles.userInfo}>
            <UserInfo user={post.author} />
          </div>
            <div className={styles.dateAndSettings}>
                <p className={styles.date}>{timeAgo(post.updatedAt)}{post.createdAt !== post.updatedAt && " (edited)"}</p>
                { post.authorId === currentUser?.id && 
                    <OpenModalButton
                        buttonText={<GoGear size={"1rem"}/>}
                        modalComponent={<EditPostForm post={post}/>}
                        className={styles.button}
                    />
                }
            </div>
        </div>
        <h6 className={styles.subheader}>Description</h6>
        <p className={styles.text}>{post.description}</p>
      </div>
      <div className={styles.comments}>
        <h6 className={styles.subheader}>{post.comments.length ? "Comments" : "Be the first to comment"}</h6>
        <CommentSection 
          postId={post.id}
          comments={post.comments}
        />
      </div>
      <CommentInput 
        postId={post.id}
      />
    </section>
  )
}