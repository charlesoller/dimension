import styles from "./Feed.module.css"
// Util
import { useEffect, useState } from "react"
const URL = "http://localhost:3000/api"
// Components
import Post from "../Post/Post"
// Types
import { IPost } from "../../utils/types"


export default function Feed(){
    const [ posts, setPosts ] = useState<IPost[]>([]);

    useEffect(() => {
        const loadPosts = async () => {
            const res = await fetch(`${URL}/posts`)
                .then(res => res.json());
            if (res.ok) setPosts(res.data);
        }

        loadPosts();
    }, [])
    const postElements = posts.map(post => <Post post={post} />)
    
    return (
        <section className={styles.feed}>
            { postElements }
        </section>
    )
}