import styles from "./LikeButton.module.css"

import { useDispatch, useSelector } from "react-redux";
import { likeCommentThunk, likePostThunk } from "../../store/posts";
import { GoHeartFill, GoHeart } from "react-icons/go"
import { useMemo } from "react";
import { CommentLike, IComment, IPost, PostLike } from "../../utils/types";

interface LikeButtonComponent {
  resource: IPost | IComment
}

const isPost = (resource: any): resource is IPost => {
  return (resource as IPost).url !== undefined;
}

export default function LikeButton({ resource }: LikeButtonComponent){
  const dispatch = useDispatch()
  const currentUser = useSelector((state: any) => state.session.user);

  const hasUserLiked = useMemo(() => resource
    .likes?.map((like: PostLike | CommentLike) => like.authorId)
    .includes(currentUser?.id)
  , [resource.likes]);

  const handleLike = () => {
    if (isPost(resource)) {
      dispatch(likePostThunk(resource.id) as any);
    } else {
      console.log("RESOURCE: ", resource.postId)
      dispatch(likeCommentThunk(resource.id, resource.postId) as any)
    }
  }

  return (
    <button className={styles.likeButton} onClick={handleLike}>
    { hasUserLiked ?
        <GoHeartFill />
        :
        <GoHeart />
    }
    <p>{resource.likes?.length || "0"}</p>
    </button> 
  )
}