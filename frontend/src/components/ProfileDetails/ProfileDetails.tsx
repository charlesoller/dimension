import { GoGear } from "react-icons/go"
import { Follow, IPost, IUser } from "../../utils/types"
import styles from "./ProfileDetails.module.css"
import { useDispatch, useSelector } from "react-redux"
import Button from "../Button/Button"
import { followUserThunk } from "../../store/users"
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import ModalContent from "../ModalContent/ModalContent"
import EditUserForm from "../EditUserForm/EditUserForm"

interface ProfileDetailsProps {
  user: IUser
  posts: IPost[]
}
const PLACEHOLDER = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQBDgMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAACAQADBQYE/8QAGxABAQEBAQEBAQAAAAAAAAAAAAERAjFBIVH/xAAaAQEBAQEBAQEAAAAAAAAAAAACAQADBQYE/8QAGBEBAQEBAQAAAAAAAAAAAAAAAAEREgL/2gAMAwEAAhEDEQA/APc5hxJCj9NftlWHykhSC6SrIcSFBOVZCjQoldJVnixIcB0lWQ4kWCZQ5Bhxhq/CiQog0ocDn04wUoUGEw0occ+fS1BdIUrnClQLDlKUNaVkPW0dbUZbRtS0bWKRbQta0bWKRLQq2jWKR8vCiQ5H76/JKshSJDgnKsKRIXKV0lKFPEhQTlaHEkKDY6SlFnqRRdJShwIcRKUWJF+IlOFAhxgKFBhINUpQisjpKsrnpSohauizJha2jrajFoWpqWs0jWja1o2o6SNaFrWhaxSPn46QZCj0XnSlCiQpArpKsOJCiHKsWJDg2OkpRUhRDlaF8RYFjpKUKeJCiEyxCjDShQCiJTipGiCcrCsqIsqyozJha2jK1rNhalo2tqNi2to1LWXFtC1tG1CS0dahahyPH5ODIUei8qUoUiQohylFjRYNhyrCiQojpKsKJCng2HKsVCgnKsKIqWOkqr8FUalFGEiFCgNExDaJqxEVRZGWto2trNhJampayrqWjqajYto2taNY5EtCraFqHI82FEhx6VeJKsKJIUE5VhRIUSwpSkKJFHHSVVniQohyrFnqFBsOUoyKhysqKOOkrKioqykCyomE0qazIWposjFa2jrIuLqaw6iyKlraNrK2j1WtGoSaNv61o2/rFI/HD5GFy9J4EpQpEhRLDlWHIMhQSlWFEixMOVVaKNhytDgxYhykzRksdJVjNGE5WVGGw5VZGQl1dFmZbW1EqKVTU1LUYtHU1NRltHUtTUORbRtS0bWpY1o61oWoUcoUSFHqWPm5ShRIUglKsMYUTClaFEXEOVVnrRcQpVxWijYcrRmYXSVlRkw5VZmHClZmRMOVmaomHKrINqEVoWtqVFXUtTUQpGS1rQtQoto2paNqLFtC1rRtZWhxJFj1Xy8pQ4MODhylFiQohStCiLEwpVKIo4crKzIUrMzJYcrMzDhyszMhys1RhsOVt/rbE68FDlVK2omFK1TWophz0tHVG1C1rRS1NTF1qKhamL01CraNrY3TryUGHHpvmNKFBjpGKVYsSFEwpVhYkIcKVorMhysyslhSoyoJyszMmHKyM2xLDla0bWqCcra2pqVMKVaiayYcralqJ1ULWS1NTUxZWo2raNTC1NG1bQrYvSWo1C1sXX6oUZnpPmjhxmFShRmYoUWMwlFVmQ4zMzFGRmA4yMyHGGqzHBrMw0oNaswnERGY0qMwkNFmQolGsyKFo1mVUoVWZX//2Q=="

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
        <img src={PLACEHOLDER} className={styles.profilePicture} />
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