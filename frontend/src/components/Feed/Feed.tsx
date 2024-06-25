import styles from "./Feed.module.css"
// Util
import { startTransition, useEffect, useState } from "react"
const URL = "http://localhost:8000/api"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
// Components
import Post from "../Post/Post"
// Types
import { loadAllPostsThunk } from "../../store/posts"
import { IPost } from "../../utils/types"

export default function Feed(){
    const dispatch = useDispatch();
    // shallowEqual is needed below to avoid infinite rerenders, since visiblePosts is derived from posts, we don't want
    // posts to change if visiblePosts does
    const posts = useSelector<IPost[]>(state => Object.values(state.posts), shallowEqual);
    const [visiblePosts, setVisiblePosts] = useState([]);

    useEffect(() => {
        dispatch(loadAllPostsThunk())
    }, [])

    useEffect(() => {
        startTransition(() => {
            setVisiblePosts(prevPosts => {
                if (prevPosts.length === posts.length) return prevPosts;
                return posts;
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