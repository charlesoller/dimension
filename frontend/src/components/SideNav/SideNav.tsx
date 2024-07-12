import styles from "./SideNav.module.css"
// Components
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { GiMoebiusTriangle } from "react-icons/gi";
import CreatePostForm from "../CreatePostForm/CreatePostForm";
import Login from "../Login/Login";
import CurrentUserInfo from "../CurrentUserInfo/CurrentUserInfo";

// Util
import { useSelector, useDispatch } from "react-redux";
import { logoutThunk } from "../../store/session";
import { Link } from "react-router-dom";
import { IUser } from "../../utils/types";
import Button from "../Button/Button";

export default function SideNav(){
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.session.user) as IUser;

  const handleLogout = (e) => {
    dispatch(logoutThunk() as any)
  }

  return (
    <aside className={styles.nav}>
      <Link className={styles.dimension} to={"/"}>
        <GiMoebiusTriangle className={styles.dimensionIcon} style={{ fontSize: "1.3rem" }}/>
        <span className={styles.dimensionText}>Dimension</span>
      </Link>
      <CurrentUserInfo />
      {/* <div className={styles.button}>
        {user ? `@${user.username} Logged In` : "Not Logged In"}
      </div> */}
      <Button variant="filled" fullWidth>
        Create
      </Button>

      {/* <OpenModalButton
        buttonText="Create"
        modalComponent={<CreatePostForm />}
        className={styles.button}
      />
      <OpenModalButton
        buttonText="Login"
        modalComponent={<Login />}
        className={styles.button}
      />
      <button className={styles.button} onClick={handleLogout}>
        Logout
      </button> */}
    </aside>
  )
}