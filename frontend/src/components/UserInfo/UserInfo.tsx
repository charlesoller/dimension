import styles from "./UserInfo.module.css"

// Util
const PLACEHOLDER = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQBDgMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAACAQADBQYE/8QAGxABAQEBAQEBAQAAAAAAAAAAAAERAjFBIVH/xAAaAQEBAQEBAQEAAAAAAAAAAAACAQADBQYE/8QAGBEBAQEBAQAAAAAAAAAAAAAAAAEREgL/2gAMAwEAAhEDEQA/APc5hxJCj9NftlWHykhSC6SrIcSFBOVZCjQoldJVnixIcB0lWQ4kWCZQ5Bhxhq/CiQog0ocDn04wUoUGEw0occ+fS1BdIUrnClQLDlKUNaVkPW0dbUZbRtS0bWKRbQta0bWKRLQq2jWKR8vCiQ5H76/JKshSJDgnKsKRIXKV0lKFPEhQTlaHEkKDY6SlFnqRRdJShwIcRKUWJF+IlOFAhxgKFBhINUpQisjpKsrnpSohauizJha2jrajFoWpqWs0jWja1o2o6SNaFrWhaxSPn46QZCj0XnSlCiQpArpKsOJCiHKsWJDg2OkpRUhRDlaF8RYFjpKUKeJCiEyxCjDShQCiJTipGiCcrCsqIsqyozJha2jK1rNhalo2tqNi2to1LWXFtC1tG1CS0dahahyPH5ODIUei8qUoUiQohylFjRYNhyrCiQojpKsKJCng2HKsVCgnKsKIqWOkqr8FUalFGEiFCgNExDaJqxEVRZGWto2trNhJampayrqWjqajYto2taNY5EtCraFqHI82FEhx6VeJKsKJIUE5VhRIUSwpSkKJFHHSVVniQohyrFnqFBsOUoyKhysqKOOkrKioqykCyomE0qazIWposjFa2jrIuLqaw6iyKlraNrK2j1WtGoSaNv61o2/rFI/HD5GFy9J4EpQpEhRLDlWHIMhQSlWFEixMOVVaKNhytDgxYhykzRksdJVjNGE5WVGGw5VZGQl1dFmZbW1EqKVTU1LUYtHU1NRltHUtTUORbRtS0bWpY1o61oWoUcoUSFHqWPm5ShRIUglKsMYUTClaFEXEOVVnrRcQpVxWijYcrRmYXSVlRkw5VZmHClZmRMOVmaomHKrINqEVoWtqVFXUtTUQpGS1rQtQoto2paNqLFtC1rRtZWhxJFj1Xy8pQ4MODhylFiQohStCiLEwpVKIo4crKzIUrMzJYcrMzDhyszMhys1RhsOVt/rbE68FDlVK2omFK1TWophz0tHVG1C1rRS1NTF1qKhamL01CraNrY3TryUGHHpvmNKFBjpGKVYsSFEwpVhYkIcKVorMhysyslhSoyoJyszMmHKyM2xLDla0bWqCcra2pqVMKVaiayYcralqJ1ULWS1NTUxZWo2raNTC1NG1bQrYvSWo1C1sXX6oUZnpPmjhxmFShRmYoUWMwlFVmQ4zMzFGRmA4yMyHGGqzHBrMw0oNaswnERGY0qMwkNFmQolGsyKFo1mVUoVWZX//2Q=="
// Types
import { IUser } from "../../utils/types"

interface UserInfoComponent {
    user: IUser;
}

export default function UserInfo({ user }: UserInfoComponent){
    return (
        <div className={styles.userInfo}>
            <img src={PLACEHOLDER} className={styles.profilePicture} />
            <div className={styles.user}>
                <h6 className={styles.userName}>{user.name}</h6>
                <p className={styles.userAt}>@{user.username}</p>
            </div>
        </div>
    )
}