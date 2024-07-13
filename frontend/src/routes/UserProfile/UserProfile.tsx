import { useEffect } from "react";
import { loadAllPostsThunk } from "../../store/posts";
import styles from "./UserProfile.module.css"
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IPost, IUser } from "../../utils/types";
import PostGrid from "../../components/PostGrid/PostGrid";
import ProfileDetails from "../../components/ProfileDetails/ProfileDetails";
import { loadUserThunk } from "../../store/users";

export default function UserProfile() {
  const dispatch = useDispatch();
  const { user: userParam } = useParams();

  const user = useSelector((state: any) => Object.values(state.users))
    .find((user: IUser) => user.username === userParam) as any;
  const posts = useSelector((state: any) => Object.values(state.posts))
    .filter((post: IPost) => post?.author?.username === userParam) as any;

  useEffect(() => {
    console.log("useEffect")
    dispatch(loadAllPostsThunk() as any);
    dispatch(loadUserThunk(userParam) as any);
  }, [dispatch, userParam])

  if (!user || !posts) return;
  return (
    <main className={styles.userProfile}>
      <ProfileDetails user={user} posts={posts} />
      <PostGrid posts={posts} />
    </main>
  )
}