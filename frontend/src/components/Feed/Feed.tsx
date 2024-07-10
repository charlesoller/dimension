import styles from "./Feed.module.css"
// Util
import { startTransition, useEffect, useState } from "react"
// const URL = "http://localhost:8000/api"
// Components
import Post from "../Post/Post"
// Types
import { IPost } from "../../utils/types"

interface FeedProps {
    posts: IPost;
}

export default function Feed({ posts }: FeedProps ){
    const [visiblePosts, setVisiblePosts] = useState([]);

    useEffect(() => {
        startTransition(() => {
            setVisiblePosts(_ => {
                return [...posts].reverse();
            })
        });
    }, [posts]);

    const postElements = visiblePosts.map((post: IPost) => <Post key={post.id} post={post} />);
    
    return (
        <section className={styles.feed}>
            { postElements }
        </section>
    )
}