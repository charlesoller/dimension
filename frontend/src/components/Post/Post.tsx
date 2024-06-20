import styles from "./Post.module.css"
import Viewport from "../Viewport/Viewport"
import UserInfo from "../UserInfo/UserInfo"
import { GoComment, GoHeart } from "react-icons/go";
import { IPost } from "../../utils/types";

interface PostComponent {
    post: IPost;
}

export default function Post({ post }: PostComponent){
    return (
        <article className={styles.post}>
            <div className={styles.upper}>
                <UserInfo user={post.author} />
                <p className={styles.date}>1d Ago</p>
            </div>
            <div className={styles.viewport}>
                <Viewport src={post.url} />
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