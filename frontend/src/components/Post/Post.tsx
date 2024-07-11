
import styles from "./Post.module.css"
// Components
import Viewport from "../Viewport/Viewport"
// Util
import { useRef } from "react";
import { useIntersection } from "../../utils/hooks/useIntersection";
// Types
import { IPost } from "../../utils/types";
import PostInfo from "../PostInfo/PostInfo";
import LikeButton from "../LikeButton/LikeButton";

interface PostComponent {
    post: IPost;
}

export default function Post({ post }: PostComponent){
    const visibleRef = useRef(null);
    const isVisible = useIntersection(visibleRef, "1000px");
    
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