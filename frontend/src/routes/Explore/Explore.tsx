import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styles from "./Explore.module.css"
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import PostGrid from "../../components/PostGrid/PostGrid";
import { GoHash } from "react-icons/go";
import { loadAllPostsThunk } from "../../store/posts";


export default function Explore() {
  const dispatch = useDispatch();
  const { channelName } = useParams();

  // shallowEqual is needed below to avoid infinite rerenders, since visiblePosts is derived from posts, we don't want
  // posts to change if visiblePosts does
  const posts = useSelector((state: any)=> Object.values(state.posts), shallowEqual);

  useEffect(() => {
    dispatch(loadAllPostsThunk() as any)
  }, [])

  const channelPosts = posts.filter(post => {
    const channels = post.channels.map(channel => channel.name);
    return channels.includes(channelName);
  })

  return (
    <main className={styles.body}>
      <h1 className={styles.channelName}><GoHash />{ channelName }</h1>
      <PostGrid posts={channelPosts} />
    </main>
  )
}