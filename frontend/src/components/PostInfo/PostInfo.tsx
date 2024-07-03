import styles from "./PostInfo.module.css"

// Components
import UserInfo from "../UserInfo/UserInfo";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import EditPostForm from "../EditPostForm/EditPostForm";
import CommentSection from "../CommentSection/CommentSection";
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
      <div className={styles.upper}>
          <UserInfo user={post.author} />
          <div className={styles.dateAndSettings}>
              { post.authorId === currentUser?.id && 
                  <OpenModalButton
                      buttonText={<GoGear size={"1rem"}/>}
                      modalComponent={<EditPostForm post={post}/>}
                      className={styles.button}
                  />
              }
              <p className={styles.date}>{timeAgo(post.updatedAt)}{post.createdAt !== post.updatedAt && " (edited)"}</p>
          </div>
      </div>
      <p className={styles.text}>{post.description}</p>
      <CommentSection 
        postId={post.id}
        comments={post.comments}
      />
    </section>
  )
}