
import styles from "./MainLayout.module.css"
// Components
import { Outlet } from "react-router-dom"
import Header from "../Header/Header"
import SideNav from "../SideNav/SideNav"
import { Modal } from "../../context/Modal"
// Util
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { restoreUserThunk } from "../../store/session"
import { loadUserThunk } from "../../store/users"
// Types



export default function MainLayout() {
  // fetch('https://dimension-1.onrender.com/api')
  const dispatch = useDispatch();

  const currentUser = useSelector((state: any) => state.session.user);
  dispatch(loadUserThunk(currentUser?.username) as any);

  useEffect(() => {
    dispatch(restoreUserThunk() as any);
  }, [dispatch])


  return (
    <main className={styles.main}>
      <Modal />
      <div className={styles.content}>
        <div className={styles.nav}>
          <SideNav />
        </div>
        <div className={styles.outlet}>
          <Outlet />
        </div>
      </div>
    </main>
  )
}