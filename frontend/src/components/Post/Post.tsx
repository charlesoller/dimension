
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
        .includes(currentUser.id)
    , [post.likes]);

    return (
        <article className={styles.post} ref={visibleRef}>
            <div>
                <div className={styles.upper}>
                    <UserInfo user={post.author} />
                    <div className={styles.dateAndSettings}>
                        { post.authorId === currentUser?.id && 
                            <OpenModalButton
                                buttonText={<GoGear size={"1rem"}/>}
                                modalComponent={<EditPostForm post={post}/>}
                                className={styles.button}
                            />
                        }
                        <p className={styles.date}>{timeAgo(post.updatedAt)}{post.createdAt !== post.updatedAt && " (edited)"}</p>
                    </div>
                </div>
                <div className={styles.viewport}>
                    {isVisible && <Viewport src={post.url} />}
                </div>
                <div className={styles.lower}>
                    <div className={styles.buttons}>
                        <button>
                            <p>{post.likes?.length || "0"}</p>
                            { hasUserLiked ?
                                <GoHeartFill onClick={handleLike} />
                                :
                                <GoHeart onClick={handleLike}/>
                            }
                        </button>
                        <button>
                            <GoComment />
                        </button>
                    </div>
                    <p className={styles.text}>
                        { post.description }
                    </p>
                </div>
            </div>
            <CommentSection />
        </article>
    )
}