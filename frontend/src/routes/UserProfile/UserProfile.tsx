import { useEffect } from "react";
import { loadAllPostsThunk } from "../../store/posts";
import styles from "./UserProfile.module.css"
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IPost } from "../../utils/types";
import PostGrid from "../../components/PostGrid/PostGrid";
import ProfileDetails from "../../components/ProfileDetails/ProfileDetails";

export default function UserProfile(){
  const dispatch = useDispatch();
  const { user } = useParams();

  // shallowEqual is needed below to avoid infinite rerenders, since visiblePosts is derived from posts, we don't want
  // posts to change if visiblePosts does
  const posts = useSelector((state: any)=> Object.values(state.posts), shallowEqual);

  useEffect(() => {
      dispatch(loadAllPostsThunk() as any)
  }, [])

  const userPosts = posts.filter((post: IPost) => post.author?.username === user)

  return (
    <main className={styles.userProfile}>
      <ProfileDetails user={userPosts[0]?.author} />
      <PostGrid posts={userPosts} />
    </main>
  )
}