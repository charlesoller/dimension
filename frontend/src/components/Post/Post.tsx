
import styles from "./Post.module.css"
// Components
import Viewport from "../Viewport/Viewport"
import UserInfo from "../UserInfo/UserInfo"
import { GoComment, GoHeart, GoHeartFill, GoGear } from "react-icons/go";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
// Util
import { useMemo, useRef } from "react";
import { useIntersection } from "../../utils/hooks/useIntersection";
import { useDispatch, useSelector } from "react-redux";
import { timeAgo } from "../../utils/utils";
// Types
import { IPost } from "../../utils/types";
import EditPostForm from "../EditPostForm/EditPostForm";
import { likePostThunk } from "../../store/posts";
import CommentSection from "../CommentSection/CommentSection";
import PostInfo from "../PostInfo/PostInfo";
import LikeButton from "../LikeButton/LikeButton";

interface PostComponent {
    post: IPost;
}

export default function Post({ post }: PostComponent){
    const dispatch = useDispatch();
    const currentUser = useSelector((state: any) => state.session.user);
    const visibleRef = useRef(null);
    const isVisible = useIntersection(visibleRef, "1000px");

    const handleLike = () => {
        dispatch(likePostThunk(post.id) as any);
    }

    const hasUserLiked = useMemo(() => post
        .likes?.map(like => like.authorId)
        .includes(currentUser?.id)
    , [post.likes]);

    return (
        <article className={styles.post} ref={visibleRef}>
            <div className={styles.viewportContainer}>
                <div className={styles.viewport}>
                    {isVisible && <Viewport src={post.url} />}
                </div>
                <div className={styles.interactions}>
                    <LikeButton 
                        resource={post}
                    />
                    {/* <button className={styles.likeButton}>
                        🤣
                        <p>0</p>
                    </button> */}
                </div>
            </div>
            <PostInfo 
                post={post}
            />
        </article>
    )
}