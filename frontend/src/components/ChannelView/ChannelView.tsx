import styles from "./ChannelView.module.css"

// Util
import { startTransition, useEffect, useState } from "react";
import { loadChannelThunk } from "../../store/channels";
import { useParams } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { Channel, IPost } from "../../utils/types";
import Post from "../Post/Post";

type StringKeyedChannelObject = { [channelName: string]: Channel }

export default function ChannelView() {
  const dispatch = useDispatch();
  const { channelName } = useParams();
  const [visiblePosts, setVisiblePosts] = useState<IPost[]>([]);

  const activeChannel = Object.values(useSelector<StringKeyedChannelObject>(state => state.channels))
    .find((channel: Channel) => channel.name === channelName);
  console.log(activeChannel)

  // const channels = Object.values(useSelector<StringKeyedChannelObject>(state => state.channels));
  // console.log("channels: ", channels)
  // const { posts } = activeChannel;

  useEffect(() => {
    dispatch(loadChannelThunk(channelName) as any)
  }, [])

  // useEffect(() => {
  //   startTransition(() => {
  //     setVisiblePosts(_ => {
  //       return [...activeChannel?.posts].reverse();
  //     })
  //   });
  // }, [activeChannel?.posts]);



  const postElements = activeChannel?.posts.map((post: IPost) => <Post key={post.id} post={post} />);

  return (
    <section className={styles.feed}>
      {postElements}
    </section>
  )
}