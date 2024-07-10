import styles from "./PostThumbnail.module.css"

import { useRef, useState } from "react"
import { useModal } from "../../context/Modal"
import { IPost } from "../../utils/types"
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import Post from "../Post/Post"
import PostInfo from "../PostInfo/PostInfo"
import UserInfo from "../UserInfo/UserInfo"
import Viewport from "../Viewport/Viewport"
import { GoArrowUpRight } from "react-icons/go"
import { Dispatch } from "redux"
import { loadAllPostsThunk, loadPost } from "../../store/posts"
import { useIntersection } from "../../utils/hooks/useIntersection"
import LikeButton from "../LikeButton/LikeButton"
import { nanoid } from "nanoid"

interface PostThumbnailProps {
  post: IPost;
  showUserInfo?: boolean;
}

export default function PostThumbnail({ post, showUserInfo = true }: PostThumbnailProps) {
  const [viewportKey, setViewportKey] = useState<string>(nanoid());
  const visibleRef = useRef(null);
  const isVisible = useIntersection(visibleRef, "0px");

  return (
    <article className={styles.thumbnail} ref={visibleRef}>
      {showUserInfo && (
        <div className={styles.userInfo}>
          <UserInfo user={post.author} />
          <OpenModalButton
            modalComponent={
              <Post post={post} />
            }
            buttonText={<GoArrowUpRight className={styles.iconButton} />}
            onModalClose={() => setViewportKey(nanoid())}
          />
        </div>
      )}
      <div className={styles.viewport}>
        {isVisible && <Viewport src={post.url} key={viewportKey} />}
      </div>
      <div>
        <LikeButton resource={post} />
      </div>
    </article>
  )
}