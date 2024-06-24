import { Outlet } from "react-router-dom"
import Header from "../Header/Header"
import styles from "./MainLayout.module.css"
import SideNav from "../SideNav/SideNav"
import { Modal } from "../../context/Modal"

export default function MainLayout() {
  return (
    <main className={styles.main}>
      <Modal modal/>
      <div className={styles.content}>
        <SideNav />
        <Outlet />
      </div>
    </main>
  )
}