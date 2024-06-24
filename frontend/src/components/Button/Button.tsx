import { ReactNode } from "react"
import styles from "./Button.module.css"

export interface ButtonInterface {
  children?: ReactNode;
  onClick?: () => void;
}

export default function Button({ children, onClick }: ButtonInterface){
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  )
}