import styles from "./ChannelView.module.css"

// Util
import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { Channel, IPost } from "../../utils/types";
import Post from "../Post/Post";

type StringKeyedChannelObject = { [channelName: string]: Channel }

export default function ChannelView() {
  const { channelName } = useParams();

  const activeChannel = Object.values(useSelector<StringKeyedChannelObject>(state => state.channels))
    .find((channel: Channel) => channel.name === channelName);

  const postElements = activeChannel?.posts.map((post: IPost) => <Post key={post.id} post={post} />);

  return (
    <section className={styles.feed}>
      {postElements}
    </section>
  )
}