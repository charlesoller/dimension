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
import LinkChip from "../LinkChip/LinkChip";
import { nanoid } from "nanoid";
import ModalContent from "../ModalContent/ModalContent";


interface PostInfoComponent {
  post: IPost;
}

function parseDescription(input: string): (string | JSX.Element)[] {
  const words = input.split(' ');
  let latestHashtag = '';
  let result: (string | JSX.Element)[] = [];

  for (const word of words) {
    const hashIndex = word.lastIndexOf('#');
    if (hashIndex !== -1) {
      latestHashtag = word.substring(hashIndex);
      // If the word is a complete hashtag, convert to link
      if (hashIndex === 0) {
        result.push(
          <LinkChip
            url={`/channels/${latestHashtag.substring(1)}`}
            text={latestHashtag}
            key={nanoid()}
          />
        );
        latestHashtag = '';
      }
    } else {
      // If there was a latest hashtag, create the link for it
      if (latestHashtag) {
        result.push(
          <LinkChip
            url={`/channels/${latestHashtag.substring(1)}`}
            text={latestHashtag}
            key={nanoid()}
          />
        );
        latestHashtag = '';
      }
      result.push(' ' + word + ' ');
    }
  }

  // If the latestHashtag is still set, add it to the result as a link
  if (latestHashtag) {
    result.push(
      <LinkChip
        url={`/channels/${latestHashtag.substring(1)}`}
        text={latestHashtag}
        key={nanoid()}
      />
    );
  }

  return result;
}


export default function PostInfo({ post }: PostInfoComponent) {
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
            {post.authorId === currentUser?.id &&
              <OpenModalButton
                buttonText={<GoGear size={"1rem"} className={styles.iconButton} />}
                modalComponent={
                  <ModalContent
                    title="Edit Post"
                    subtitle="Change the post's description"
                  >
                    <EditPostForm post={post} />
                  </ModalContent>
                }
                className={styles.button}
              />
            }
          </div>
        </div>
        <h6 className={styles.subheader}>Description</h6>
        <p className={styles.text}>{parseDescription(post.description)}</p>
      </div>
      <div className={styles.comments}>
        <h6 className={styles.subheader}>{post.comments?.length ? "Comments" : currentUser ? "Be the first to comment" : "Log in to leave a comment."}</h6>
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