import styles from "./Feed.module.css"

import Post from "../Post/Post"

export default function Feed(){
    return (
        <section className={styles.feed}>
            {/* <h1>Feed here</h1> */}
            <Post />
        </section>
    )
}