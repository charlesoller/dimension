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
import LoginForm from "../LoginForm/LoginForm";
import EditUserForm from "../EditUserForm/EditUserForm";

export default function CurrentUserInfo() {
  const user = useSelector((state: any) => state.session.user) as IUser;

  return (
    <OpenModalButton
      modalComponent={
        <ModalContent
          title={ user ? "User Settings" : "Login"}
          subtitle={ user ? "Manage your account" : "Log into your account"}
        >
          { user ? <EditUserForm /> : <LoginForm />}
        </ModalContent>
      }
      className={styles.fullWidth}
    >
      <div className={styles.currentUserInfo}>
        {user ? (
          <>
            <img
              src={user?.profilePicture?.url || PROFILE_PIC_PLACEHOLDER}
              className={styles.image}
            />
            <div className={styles.names}>
              <p className={styles.username}>@{user?.username}</p>
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
