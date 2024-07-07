import styles from "./LikeButton.module.css"

import { useDispatch, useSelector } from "react-redux";
import { likePostThunk } from "../../store/posts";
import { GoHeartFill, GoHeart } from "react-icons/go"
import { useMemo } from "react";
import { IComment, IPost } from "../../utils/types";

interface LikeButtonComponent {
  resource: IPost | IComment
}

export default function LikeButton({ resource }: LikeButtonComponent){
  const dispatch = useDispatch()
  const currentUser = useSelector((state: any) => state.session.user);

  const hasUserLiked = useMemo(() => resource
    .likes?.map(like => like.authorId)
    .includes(currentUser?.id)
  , [resource.likes]);

  const handleLike = () => {
    dispatch(likePostThunk(resource.id) as any);
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