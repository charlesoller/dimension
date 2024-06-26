import styles from "./SideNav.module.css"
// Components
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { GiMoebiusTriangle } from "react-icons/gi";
import CreatePostForm from "../CreatePostForm/CreatePostForm";
import Login from "../Login/Login";
// Util
import { useSelector, useDispatch } from "react-redux";
import { logoutThunk } from "../../store/session";

export default function SideNav(){
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  const handleLogout = (e) => {
    dispatch(logoutThunk())
  }

  return (
    <aside className={styles.nav}>
      <h1 className={styles.dimension}><GiMoebiusTriangle style={{ fontSize: "1.3rem" }}/>Dimension</h1>
      <div className={styles.button}>
        {user ? `@${user.username} Logged In` : "Not Logged In"}
      </div>
      <OpenModalButton
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
      </button>
      {/* <div>
        <h1>Menu Item</h1>
      </div> */}
    </aside>
  )
}