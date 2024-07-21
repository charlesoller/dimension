import { startTransition, useEffect, useState } from "react";
import { IPost } from "../../utils/types"
import PostThumbnail from "../PostThumbnail/PostThumbnail";
import styles from "./PostGrid.module.css"

interface PostGridProps {
  posts: IPost[];
}

export default function PostGrid({ posts }: PostGridProps){
  const [visiblePosts, setVisiblePosts] = useState([]);
  
  useEffect(() => {
      startTransition(() => {
          setVisiblePosts(_ => {
              return [...posts].reverse();
          })
      });
  }, [posts]);

  const postElements = visiblePosts.map(post => <PostThumbnail key={post.id} post={post} />)

  return (
    <section className={styles.grid}>
      {postElements}
    </section>
  )
}