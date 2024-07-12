import styles from "./SideNav.module.css"
// Components
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { GiMoebiusTriangle } from "react-icons/gi";
import CreatePostForm from "../CreatePostForm/CreatePostForm";
import CurrentUserInfo from "../CurrentUserInfo/CurrentUserInfo";

// Util
import { useSelector, useDispatch } from "react-redux";
import { logoutThunk } from "../../store/session";
import { Link } from "react-router-dom";
import { IUser } from "../../utils/types";
import Button from "../Button/Button";
import ModalContent from "../ModalContent/ModalContent";

export default function SideNav() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.session.user) as IUser;

  const handleLogout = (e) => {
    dispatch(logoutThunk() as any);
  }

  return (
    <aside className={styles.nav}>
      <div className={styles.upper}>
        <Link className={styles.dimension} to={"/"}>
          <GiMoebiusTriangle className={styles.dimensionIcon} style={{ fontSize: "1.3rem" }} />
          <span className={styles.dimensionText}>Dimension</span>
        </Link>
        <CurrentUserInfo />
        {
          user ?
            <OpenModalButton
              modalComponent={
                <ModalContent
                  title="Upload A Model"
                  subtitle="Files must be in .glb or .gltf format"
                  width={500}
                >
                  <CreatePostForm />
                </ModalContent>
              }
              className={styles.wrapper}
            >
              <Button variant="filled" fullWidth>
                Create
              </Button>
            </OpenModalButton>
            : null
        }
      </div>
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
      <div className={styles.lower}>
        {user ? <Button
          onClick={handleLogout}
          fullWidth
        >
          Logout
        </Button> : null}
      </div>
    </aside>
  )
}