import styles from "./CurrentUserInfo.module.css"

// Components
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { GoKey } from "react-icons/go";
// Util
import { PROFILE_PIC_PLACEHOLDER } from "../../utils/constants";
import { useSelector } from "react-redux";
// Types
import { IUser } from "../../utils/types";
import ModalContent from "../ModalContent/ModalContent";

export default function CurrentUserInfo() {
  const user = useSelector((state: any) => state.session.user) as IUser;

  return (
    <OpenModalButton
      modalComponent={
        <ModalContent
          title="Edit User Settings"
          subtitle="Update Your Account Information"
          primaryButtonText="Login"
          secondaryButtonText="Signup"
          tertiaryButtonText="Close"
        >
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </ModalContent>
      }
    >
      <div className={styles.currentUserInfo}>
        {user ? (
          <>
            <img
              src={user?.profilePicture?.url || PROFILE_PIC_PLACEHOLDER}
              className={styles.image}
            />
            <div className={styles.names}>
              {/* <p className={styles.username}>@{user?.username}</p> */}
              <p className={styles.username}>@abcdefghijklmnopqrstuvwxyz</p>

              <p className={styles.name}>{user?.name}</p>
            </div>
          </>
        ) : (
          <div className={styles.login}>
            <p>Log In</p>
            <GoKey />
          </div>

        )}
      </div>
    </OpenModalButton>
  )
}
