import styles from "./Post.module.css"
// Components
import Viewport from "../Viewport/Viewport"
import UserInfo from "../UserInfo/UserInfo"
import { GoComment, GoHeart, GoGear } from "react-icons/go";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
// Util
import { useRef } from "react";
import { useIntersection } from "../../utils/hooks/useIntersection";
import { useSelector } from "react-redux";
import { timeAgo } from "../../utils/utils";
// Types
import { IPost } from "../../utils/types";
import EditPostForm from "../EditPostForm/EditPostForm";

interface PostComponent {
    post: IPost;
}

export default function Post({ post }: PostComponent){
    const currentUser = useSelector(state => state.session.user);
    const visibleRef = useRef(null);
    const isVisible = useIntersection(visibleRef, "1000px");

    return (
        <article className={styles.post} ref={visibleRef}>
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