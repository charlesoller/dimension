import { GoGear } from "react-icons/go"
import { Follow, IPost, IUser } from "../../utils/types"
import styles from "./ProfileDetails.module.css"
import { useDispatch, useSelector } from "react-redux"
import Button from "../Button/Button"
import { followUserThunk } from "../../store/users"
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import ModalContent from "../ModalContent/ModalContent"
import EditUserForm from "../EditUserForm/EditUserForm"
import { PROFILE_PIC_PLACEHOLDER } from "../../utils/constants"

interface ProfileDetailsProps {
  user: IUser
  posts: IPost[]
}

export default function ProfileDetails({ user, posts }: ProfileDetailsProps) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state.session.user);
  const isCurrentUser = user.id === currentUser?.id;

  const isUserFollowing = !isCurrentUser &&
    user?.followers?.map((follow: Follow) => follow.followingId)
      .includes(currentUser?.id);

  const handleFollow = () => {
    dispatch(followUserThunk(user.id) as any);
  }
  
  return (
    <section className={styles.main}>
      <div className={styles.picAndNames}>
        <img src={user.profilePicture?.url || PROFILE_PIC_PLACEHOLDER} className={styles.profilePicture} />
        <div>
          <div className={styles.header}>
            <h6 className={styles.username}>@{user.username}</h6>
            {currentUser ? isCurrentUser ? (
              <OpenModalButton
                buttonText={<GoGear className={styles.gear} />}
                modalComponent={
                  <ModalContent
                    title={"User Settings"}
                    subtitle={"Manage your account"}
                    width={600}
                  >
                    <EditUserForm />
                  </ModalContent>
                }
              />
            ) : (
              <Button onClick={handleFollow} variant={isUserFollowing ? "filled" : "outlined"}>
                {isUserFollowing ? "Following" : "Follow"}
              </Button>
            ) : null}
          </div>
          <div className={styles.postsAndFollow}>
            <p className={styles.userStat}>{posts.length} posts</p>
            <p className={styles.userStat}>{user.followers.length} followers</p>
            <p className={styles.userStat}>{user.following.length} following</p>
          </div>
          <div className={styles.userDescription}>
            <h3 className={styles.name}>{user.name}</h3>
            <p className={styles.bio}>{user.bio}</p>
          </div>
        </div>
      </div>
    </section>
  )
}