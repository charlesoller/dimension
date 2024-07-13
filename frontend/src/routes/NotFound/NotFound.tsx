import { GiMoebiusTriangle } from "react-icons/gi"
import styles from "./NotFound.module.css"
import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <main className={styles.main}>
      <div className={styles.notFound}>
        <h1 className={styles.title}>Page Not Found</h1>
        <h3 className={styles.subtitle}>Click Below to Return to Feed</h3>
      </div>
      <Link className={styles.dimension} to={"/"}>
        <GiMoebiusTriangle className={styles.dimensionIcon} style={{ fontSize: "1.3rem" }} />
        <span className={styles.dimensionText}>Dimension</span>
      </Link>
    </main>
  )
}