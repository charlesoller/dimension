import styles from "./Post.module.css"
import Viewport from "../Viewport/Viewport"
import UserInfo from "../UserInfo/UserInfo"
import { GoComment, GoHeart } from "react-icons/go";
import { IPost } from "../../utils/types";
import { useEffect, useRef } from "react";
import { useIntersection } from "../../utils/hooks/useIntersection";

interface PostComponent {
    post: IPost;
}

export default function Post({ post }: PostComponent){
    const visibleRef = useRef(null);
    const isVisible = useIntersection(visibleRef, "1000px");

    return (
        <article className={styles.post} ref={visibleRef}>
            <div className={styles.upper}>
                <UserInfo user={post.author} />
                <p className={styles.date}>1d Ago</p>
            </div>
            <div className={styles.viewport}>
                {isVisible && <Viewport src={post.url} />}
            </div>
            <div className={styles.lower}>
                <div className={styles.buttons}>
                    <GoHeart />
                    <GoComment />
                </div>
                <p className={styles.text}>
                    { post.description }
                </p>
            </div>
        </article>
    )
}