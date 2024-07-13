import { GiMoebiusTriangle } from "react-icons/gi"
import styles from "./NotFound.module.css"
import { Link } from "react-router-dom"

export default function NotFound() {
  <main className={styles.main}>
    <h1>Page Not Found - Click Below to Return to Feed</h1>
    <Link className={styles.dimension} to={"/"}>
      <GiMoebiusTriangle className={styles.dimensionIcon} style={{ fontSize: "1.3rem" }} />
      <span className={styles.dimensionText}>Dimension</span>
    </Link>
  </main>
}