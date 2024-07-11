import { ReactNode } from "react"
import styles from "./Button.module.css"
import classNames from "classnames";

export interface ButtonProps {
  children?: ReactNode;
  onClick?: () => void;
  variant?: "outlined" | "filled";
}

export default function Button({ children, onClick, variant = "outlined" }: ButtonProps) {
  return (
    <button
      className={classNames({
        [styles.button]: true,
        [styles.outlined]: variant === "outlined",
        [styles.filled]: variant === "filled"
      })}
      onClick={onClick}
    >
      {children}
    </button>
  )
}