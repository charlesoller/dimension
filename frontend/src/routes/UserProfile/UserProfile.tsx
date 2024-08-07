import { useEffect, useState } from "react";
import { loadAllPostsThunk } from "../../store/posts";
import styles from "./UserProfile.module.css"
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IPost, IUser } from "../../utils/types";
import PostGrid from "../../components/PostGrid/PostGrid";
import ProfileDetails from "../../components/ProfileDetails/ProfileDetails";
import { loadUserThunk } from "../../store/users";
import NotFound from "../NotFound/NotFound";
import { RingLoader } from "react-spinners";

export default function UserProfile() {
  const dispatch = useDispatch();
  const { user: userParam } = useParams();

  const user = useSelector((state: any) => Object.values(state.users))
    .find((user: IUser) => user?.username === userParam) as any;
  const posts = useSelector((state: any) => Object.values(state.posts))
    .filter((post: IPost) => post?.author?.username === userParam) as any;

  useEffect(() => {
    if (!posts.length) {
      dispatch(loadAllPostsThunk() as any);
    }
    dispatch(loadUserThunk(userParam) as any);
  }, [dispatch, userParam])

  if (!user || !posts) return <NotFound />;
  return (
    <main className={styles.userProfile}>
      <ProfileDetails user={user} posts={posts} />
      <PostGrid posts={posts} />
    </main>
  )
}