// @ts-nocheck

import styles from "./MainLayout.module.css"
// Components
import { Outlet } from "react-router-dom"
import Header from "../Header/Header"
import SideNav from "../SideNav/SideNav"
import { Modal } from "../../context/Modal"
// Util
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { restoreUserThunk } from "../../store/session"
// Types



export default function MainLayout() {
  fetch('https://dimension-1.onrender.com/api')

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(restoreUserThunk());
  }, [dispatch])


  return (
    <main className={styles.main}>
      <Modal />
      <div className={styles.content}>
        <SideNav />
        <Outlet />
      </div>
    </main>
  )
}