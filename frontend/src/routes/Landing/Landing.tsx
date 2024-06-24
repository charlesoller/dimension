import styles from "./Landing.module.css"
// Util

// Components
import { Feed } from "../../components"
// Types

export default function Landing(){
  return (
    <main className={styles.body}>
      <Feed />
    </main>
  )
}