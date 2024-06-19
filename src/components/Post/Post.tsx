import styles from "./Post.module.css"
import Viewport from "../Viewport/Viewport"
import UserInfo from "../UserInfo/UserInfo"
import { GoComment, GoHeart } from "react-icons/go";

export default function Post(){
    return (
        <article className={styles.post}>
            <UserInfo />
            <div className={styles.viewport}>
                <Viewport />
            </div>
            <div className={styles.lower}>
                <div className={styles.buttons}>
                    <GoHeart />
                    <GoComment />
                </div>
                <p className={styles.text}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>
        </article>
    )
}