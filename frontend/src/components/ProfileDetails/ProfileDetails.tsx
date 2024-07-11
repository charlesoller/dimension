import { GoGear } from "react-icons/go"
import { IUser } from "../../utils/types"
import styles from "./ProfileDetails.module.css"
import { useSelector } from "react-redux"
import Button from "../Button/Button"

interface ProfileDetailsProps {
  user: IUser
}
const PLACEHOLDER = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQBDgMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAACAQADBQYE/8QAGxABAQEBAQEBAQAAAAAAAAAAAAERAjFBIVH/xAAaAQEBAQEBAQEAAAAAAAAAAAACAQADBQYE/8QAGBEBAQEBAQAAAAAAAAAAAAAAAAEREgL/2gAMAwEAAhEDEQA/APc5hxJCj9NftlWHykhSC6SrIcSFBOVZCjQoldJVnixIcB0lWQ4kWCZQ5Bhxhq/CiQog0ocDn04wUoUGEw0occ+fS1BdIUrnClQLDlKUNaVkPW0dbUZbRtS0bWKRbQta0bWKRLQq2jWKR8vCiQ5H76/JKshSJDgnKsKRIXKV0lKFPEhQTlaHEkKDY6SlFnqRRdJShwIcRKUWJF+IlOFAhxgKFBhINUpQisjpKsrnpSohauizJha2jrajFoWpqWs0jWja1o2o6SNaFrWhaxSPn46QZCj0XnSlCiQpArpKsOJCiHKsWJDg2OkpRUhRDlaF8RYFjpKUKeJCiEyxCjDShQCiJTipGiCcrCsqIsqyozJha2jK1rNhalo2tqNi2to1LWXFtC1tG1CS0dahahyPH5ODIUei8qUoUiQohylFjRYNhyrCiQojpKsKJCng2HKsVCgnKsKIqWOkqr8FUalFGEiFCgNExDaJqxEVRZGWto2trNhJampayrqWjqajYto2taNY5EtCraFqHI82FEhx6VeJKsKJIUE5VhRIUSwpSkKJFHHSVVniQohyrFnqFBsOUoyKhysqKOOkrKioqykCyomE0qazIWposjFa2jrIuLqaw6iyKlraNrK2j1WtGoSaNv61o2/rFI/HD5GFy9J4EpQpEhRLDlWHIMhQSlWFEixMOVVaKNhytDgxYhykzRksdJVjNGE5WVGGw5VZGQl1dFmZbW1EqKVTU1LUYtHU1NRltHUtTUORbRtS0bWpY1o61oWoUcoUSFHqWPm5ShRIUglKsMYUTClaFEXEOVVnrRcQpVxWijYcrRmYXSVlRkw5VZmHClZmRMOVmaomHKrINqEVoWtqVFXUtTUQpGS1rQtQoto2paNqLFtC1rRtZWhxJFj1Xy8pQ4MODhylFiQohStCiLEwpVKIo4crKzIUrMzJYcrMzDhyszMhys1RhsOVt/rbE68FDlVK2omFK1TWophz0tHVG1C1rRS1NTF1qKhamL01CraNrY3TryUGHHpvmNKFBjpGKVYsSFEwpVhYkIcKVorMhysyslhSoyoJyszMmHKyM2xLDla0bWqCcra2pqVMKVaiayYcralqJ1ULWS1NTUxZWo2raNTC1NG1bQrYvSWo1C1sXX6oUZnpPmjhxmFShRmYoUWMwlFVmQ4zMzFGRmA4yMyHGGqzHBrMw0oNaswnERGY0qMwkNFmQolGsyKFo1mVUoVWZX//2Q=="

export default function ProfileDetails({ user }: ProfileDetailsProps) {
  if (!user) return;

  const currentUser = useSelector((state: any) => state.session.user);

  const isCurrentUser = user.id === currentUser.id;

  return (
    <section className={styles.main}>
      <div className={styles.picAndNames}>
        <img src={PLACEHOLDER} className={styles.profilePicture} />
        <div>
          <div className={styles.header}>
            <h6 className={styles.username}>@{user.username}</h6>
            { isCurrentUser ? (
              <button>
                <GoGear />
              </button>
            ) : (
              <Button>
                Follow
              </Button>
            )}
          </div>
          <div className={styles.postsAndFollow}>
            <p className={styles.userStat}>12 posts</p>
            <p className={styles.userStat}>22 followers</p>
            <p className={styles.userStat}>10 following</p>
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