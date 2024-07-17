import styles from "./Landing.module.css"
// Util

// Components
import { Feed } from "../../components"
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { IPost } from "../../utils/types";
import { useEffect } from "react";
import { loadAllPostsThunk } from "../../store/posts";
import { RingLoader } from "react-spinners";
// Types

export default function Landing() {
  const dispatch = useDispatch();
  // shallowEqual is needed below to avoid infinite rerenders, since visiblePosts is derived from posts, we don't want
  // posts to change if visiblePosts does
  const posts = useSelector((state: any) => Object.values(state.posts), shallowEqual);

  useEffect(() => {
    dispatch(loadAllPostsThunk() as any)
  }, [])

  return (
    <main className={styles.body}>
      {posts.length ? (
        <Feed posts={posts} />
      ) : (
        <div className={styles.loadingState}>
          <RingLoader color="#E4E4E7"/>
          <p>Please wait while the server spins up. This may take a moment.</p>
        </div>
      )}
    </main>
  )
}