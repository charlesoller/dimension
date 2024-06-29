import { IUser } from "../../utils/types"
import UserInfo from "../UserInfo/UserInfo"
import styles from "./Comment.module.css"

// id: number;
// name: string;
// username: string;
// email: string;
// bio: string;
// updatedAt: Date | string;
// createdAt: Date | string;
// posts?: IPost[];
// postLikes?: PostLike[];

const FAKE_USER: IUser = {
  id: 999,
  name: "Fake User",
  username: "fakeuser",
  email: "fake@user.com",
  bio: "I'm a fake user",
  updatedAt: new Date(),
  createdAt: new Date()
}

export default function Comment(){
  return (
    <article className={styles.comment}>
      <UserInfo user={FAKE_USER}/>
      <p className={styles.body}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </article>
  )
}